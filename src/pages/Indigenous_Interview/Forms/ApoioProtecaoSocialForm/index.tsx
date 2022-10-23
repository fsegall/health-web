import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label
} from '../form-styles';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import { apoioProtecaoSocialFormHelper, FormHelperType } from './helper';
import ICreateApoioProtecaoSocialDTO from '../../dtos/ICreateApoioProtecaoSocialDTO';
import { ApoioProtecaoSocialValidation } from '../../validation/schemas/apoioProtecaoSocialValidation';



interface ApoioProtecaoSocialFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const ApoioProtecaoSocialForm: React.FC<ApoioProtecaoSocialFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false }) => {

  const { addToast } = useToast();

  const ApoioProtecaoSocialFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ICreateApoioProtecaoSocialDTO) => {
    try {
      ApoioProtecaoSocialFormRef.current?.setErrors({});
      const validatedData = await ApoioProtecaoSocialValidation.validate(data, {
        abortEarly: false,
      });

      const apoioProtecaoSocial = {
        ...data,
        entrevista_indigena_id: initialValues?.entrevista_indigena_id,
        ...validatedData,
      };

      if (!offline) {
        console.log('apoioProtecaoSocial ', apoioProtecaoSocial)
        // const response = await api.post('/indigenous-informacoes-basicas', apoioProtecaoSocial, {
        //   headers: { Authorization: `Bearer ${token}` },
        // })
        // localStorage.setItem('@Safety:apoioProtecaoSocial_id', response.data.id);

        // dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Informações do apoio e proteção social adicionadas com sucesso',
          description: 'Você já pode preencher as informações do projeto',
        });
      } else {
        //TODO: FAZER VERSÃO OFFLINE
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        const errors = getValidationErrors(error);

        ApoioProtecaoSocialFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, offline]);

  
  const [formDependencies, setFormDependencies] = useState<any>({})

  function handleDependencies(element: FormHelperType, value: any) {
    let currentForm: any = {
      ...formDependencies,
      [element.props.name]: value
    }
    setFormDependencies(currentForm)
  }

  function handleDisabled(element: FormHelperType): boolean {
    const dependencies: { [key: string]: string[] } | any = element?.dependencies
    const allDisabledValidations = Object.entries(dependencies)?.map((obj: any) => {
      let isDisabled = true
      const found = formDependencies[obj?.[0]]
      if (found) {
        if (obj?.[1]?.find((v: any) => v === found)) {
          isDisabled = false
        }
      }
      return isDisabled
    })
    if (allDisabledValidations?.every(v => v === false)) {
      return false
    } else {
      return true
    }
  }

  if (isEditForm) {
    ApoioProtecaoSocialFormRef.current?.setData({
        //TODO: FAZER EDIT FORM
    })
  }

  return (
    <StyledForm
      ref={ApoioProtecaoSocialFormRef}
      onSubmit={handleSubmit}
    >
        {apoioProtecaoSocialFormHelper?.map((s: FormHelperType[], sectionIndex: number) => (
            <section key={sectionIndex}>
                {s?.map((element: FormHelperType, elementIndex: number) => (
                    <span key={elementIndex}>
                        <Label>{element.label}</Label>
                        <element.type
                          {...element.props}
                          isDisabled={element?.dependencies && handleDisabled(element)}
                          onChange={(e: any) => element?.hasDependencies && handleDependencies(element, e?.value)}
                        />
                    </span>
                ))}
                {apoioProtecaoSocialFormHelper?.length === sectionIndex+1 && (
                    !isEditForm && <Button type="submit">Enviar</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default ApoioProtecaoSocialForm;
