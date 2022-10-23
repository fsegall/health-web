import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label
} from '../form-styles';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import { domicilioFormHelper, FormHelperType } from './helper';
import ICreateDomicilioDTO from '../../dtos/ICreateDomicilioDTO';
import { DomicilioValidation } from '../../validation/schemas/domicilioValidation';



interface DomiciliosFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const DomiciliosForm: React.FC<DomiciliosFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false }) => {

  // const { user, token } = useAuth();

  const { addToast } = useToast();

  const DomiciliosFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ICreateDomicilioDTO) => {
    try {
      DomiciliosFormRef.current?.setErrors({});
      const validatedData = await DomicilioValidation.validate(data, {
        abortEarly: false,
      });

      const domicilio = {
        ...data,
        entrevista_indigena_id: initialValues?.entrevista_indigena_id,
        ...validatedData,
      };

      if (!offline) {
        console.log('domicilio ', domicilio)
        // const response = await api.post('/indigenous-informacoes-basicas', domicilio, {
        //   headers: { Authorization: `Bearer ${token}` },
        // })
        // localStorage.setItem('@Safety:domicilio_id', response.data.id);

        // dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Informações do domicílio adicionadas com sucesso',
          description: 'Você já pode prosseguir para o módulo doença e saúde',
        });
      } else {
        //TODO: FAZER VERSÃO OFFLINE
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        const errors = getValidationErrors(error);

        DomiciliosFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, offline]);


  if (isEditForm) {
    DomiciliosFormRef.current?.setData({
        //TODO: FAZER EDIT FORM
    })
  }
  return (
    <StyledForm
      ref={DomiciliosFormRef}
      onSubmit={handleSubmit}
    >
        {domicilioFormHelper?.map((s: FormHelperType[], sectionIndex: number) => (
            <section key={sectionIndex}>
                {s?.map((element: FormHelperType, elementIndex: number) => (
                    <span key={elementIndex}>
                        <Label>{element.label}</Label>
                        <element.type {...element.props} />
                    </span>
                ))}
                {domicilioFormHelper?.length === sectionIndex+1 && (
                    !isEditForm && <Button type="submit">Enviar</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default DomiciliosForm;
