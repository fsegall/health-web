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
import { useHistory } from 'react-router-dom';
import { apoioProtecaoSocialFormHelper, FormHelperType } from './helper';
import ICreateApoioProtecaoSocialDTO from '../../dtos/ICreateApoioProtecaoSocialDTO';
import { ApoioProtecaoSocialValidation } from '../../validation/schemas/apoioProtecaoSocialValidation';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import ICreateIndigenousOfflineInterviewDTO from '../../dtos/ICreateIndigenousOfflineInterviewDTO';



interface ApoioProtecaoSocialFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
  hasPreviousStepCompleted: boolean
}

const ApoioProtecaoSocialForm: React.FC<ApoioProtecaoSocialFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false, hasPreviousStepCompleted = false }) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const history = useHistory();

  const ApoioProtecaoSocialFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounter () {
    counter += 1;
  }

  const handleSubmit = useCallback(async (data: ICreateApoioProtecaoSocialDTO) => {
    if (!hasPreviousStepCompleted) {
      addToast({
        type: 'error',
        title: 'Atenção!',
        description: 'É necessário preencher o(s) módulo(s) anteriores',
      });
      return
    }
    try {
      ApoioProtecaoSocialFormRef.current?.setErrors({});
      const values = {
        ...data,
        entrevista_indigena_id: initialValues?.entrevista_indigena_id,
      }
      const validatedData = await ApoioProtecaoSocialValidation.validate(values, {
        abortEarly: false,
      });

      const apoioProtecaoSocial = {
        ...values,
        ...validatedData,
        morador_recebe_programa_social: {
          bolsa_familia_auxilio_brasil: values.bolsa_familia_auxilio_brasil,
          bpc: values.bpc,
          beneficio_deficientes_idosos: values.beneficio_deficientes_idosos,
          auxilio_maternidade: values.auxilio_maternidade,
          auxilio_doenca: values.auxilio_doenca,
          auxilio_reclusao: values.auxilio_reclusao,
          aposentadoria: values.aposentadoria,
          pensao_morte: values.pensao_morte,
          pronaf: values.pronaf,
          programa_auxilio_estadual_municipal: values.programa_auxilio_estadual_municipal,
          cesta_alimentos: values.cesta_alimentos,
        },
      };

      if (!offline) {
        const response = await api.post('/indigeanous-interviews/support', apoioProtecaoSocial, {
          headers: { Authorization: `Bearer ${token}` },
        })
        localStorage.setItem('@Safety:indigenous_apoio_protecao_social', response.data.id);

        dispatch({ type: 'APOIO_PROTECAO_SOCIAL', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Informações do apoio e proteção social adicionadas com sucesso',
          description: 'Todos os passos da entrevista estão finalizados',
        });
        history.push('/dashboard');
      } else {
        const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-indigenous-offline-interview-id') || "");

        const offlineInterviews: { [key: string]: ICreateIndigenousOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');

        const addData = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], apoioProtecaoSocial } } : false;

        if (addData) {
          localStorage.setItem(`@Safety:indigenous-offline-interviews`, JSON.stringify(addData));

          dispatch({ type: 'APOIO_PROTECAO_SOCIAL', payload: { id: uniqueId } })

          addToast({
            type: 'success',
            title: 'Informações do apoio e proteção social adicionadas com sucesso',
            description: 'Todos os passos da entrevista estão finalizados',
          });
          history.push('/dashboard');
        } else {
          throw new Error('Você precisa adicionar adicionar o módulo anterior antes no modo offline');
        }
      }
    } catch (error) {
      //@ts-ignore
      const message = error?.data?.message
      if (message) {
        addToast({
          type: 'error',
          title: message,
          description: '',
        });
      }
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
  }, [addToast, offline, dispatch, initialValues, history, token, hasPreviousStepCompleted]);


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
                        {incrementCounter()}
                        <Label>{`${counter}. ${element.label}`}</Label>
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
