import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label
} from '../form-styles';
// import { useAuth } from '../../../../hooks/auth';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import { saudeDoencaFormHelper, FormHelperType } from './helper';
import { SaudeDoencaValidation } from '../../validation/schemas/saudeDoencaValidation';
import ICreateSaudeDoencaDTO from '../../dtos/ICreateSaudeDoencaDTO';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import ICreateIndigenousOfflineInterviewDTO from '../../dtos/ICreateIndigenousOfflineInterviewDTO';



interface SaudeDoencaFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
  hasPreviousStepCompleted: boolean;
}

const SaudeDoencaForm: React.FC<SaudeDoencaFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false, hasPreviousStepCompleted = false }) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const SaudeDoencaFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounter () {
    counter += 1;
  }

  const handleSubmit = useCallback(async (data: ICreateSaudeDoencaDTO) => {
    if (!hasPreviousStepCompleted) {
      addToast({
        type: 'error',
        title: 'Atenção!',
        description: 'É necessário preencher o(s) módulo(s) anteriores',
      });
      return
    }
    try {
      SaudeDoencaFormRef.current?.setErrors({});
      const values = {
        ...data,
        entrevista_indigena_id: initialValues?.entrevista_indigena_id,
      }
      const validatedData = await SaudeDoencaValidation.validate(values, {
        abortEarly: false,
      });

      const saudeDoenca = {
        ...data,
        entrevista_indigena_id: initialValues?.entrevista_indigena_id,
        ...validatedData,
      };

      if (!offline) {
        const response = await api.post('/indigeanous-interviews/health-desease', saudeDoenca, {
          headers: { Authorization: `Bearer ${token}` },
        })
        localStorage.setItem('@Safety:indigenous_saude_doenca', response.data.id);

        dispatch({ type: 'SAUDE_DOENCA', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Informações de saúde e doença adicionadas com sucesso',
          description: 'Você já pode prosseguir para o módulo alimentação e nutrição',
        });
      } else {
        const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-indigenous-offline-interview-id') || "");

        const offlineInterviews: { [key: string]: ICreateIndigenousOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');

        const addData = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], saudeDoenca } } : false;

        if (addData) {
          localStorage.setItem(`@Safety:indigenous-offline-interviews`, JSON.stringify(addData));

          dispatch({ type: 'SAUDE_DOENCA', payload: { id: uniqueId } })

          addToast({
            type: 'success',
            title: 'Informações de saúde e doença adicionadas com sucesso',
            description: 'Você já pode prosseguir para o módulo alimentação e nutrição',
          });
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

        SaudeDoencaFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, offline, dispatch, initialValues, token]);

  const [formDependencies, setFormDependencies] = useState<any>({})

  function handleDependencies(element: FormHelperType, value: any) {
    let currentForm: any = {
      ...formDependencies,
      [element.props.name]: value
    }
    setFormDependencies(currentForm)
  }

  function handleArrayDependencies(element: FormHelperType, value: any) {
    const arrayOfOptions = value?.map((v: any) => v?.value)
    let currentForm: any = {
      ...formDependencies,
      [element.props.name]: arrayOfOptions
    }
    setFormDependencies(currentForm)
  }

  function handleDisabled(element: FormHelperType): boolean {
    const dependencies: { [key: string]: string[] } | any = element?.dependencies
    const allDisabledValidations = Object.entries(dependencies)?.map((obj: any) => {
      let isDisabled = true
      const found = formDependencies[obj?.[0]]
      if (found) {
        if (obj?.[1]?.find((v: any) => (v === found || found?.includes(v)))) {
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
    SaudeDoencaFormRef.current?.setData({
        //TODO: FAZER EDIT FORM
    })
  }
  return (
    <StyledForm
      ref={SaudeDoencaFormRef}
      onSubmit={handleSubmit}
    >
        {saudeDoencaFormHelper?.map((s: FormHelperType[], sectionIndex: number) => (
            <section key={sectionIndex}>
                {s?.map((element: FormHelperType, elementIndex: number) => (
                    <span key={elementIndex}>
                        {incrementCounter()}
                        <Label>{`${counter}. ${element.label}`}</Label>
                        <element.type
                          {...element.props}
                          isDisabled={element?.dependencies && handleDisabled(element)}
                          onChange={(e: any) => {
                            if (element?.props?.isMulti !== true) {
                              element?.hasDependencies && handleDependencies(element, e?.value)
                            } else {
                              element?.hasDependencies && handleArrayDependencies(element, e)
                            }
                          }}
                        />
                    </span>
                ))}
                {saudeDoencaFormHelper?.length === sectionIndex+1 && (
                    !isEditForm && <Button type="submit">Enviar</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default SaudeDoencaForm;
