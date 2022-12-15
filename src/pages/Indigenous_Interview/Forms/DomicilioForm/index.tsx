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
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import ICreateIndigenousOfflineInterviewDTO from '../../dtos/ICreateIndigenousOfflineInterviewDTO';



interface DomiciliosFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
  hasPreviousStepCompleted: boolean;
}

const DomiciliosForm: React.FC<DomiciliosFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false, hasPreviousStepCompleted = false }) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const DomiciliosFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounter () {
    counter += 1;
  }

  const handleSubmit = useCallback(async (data: ICreateDomicilioDTO) => {
    if (!hasPreviousStepCompleted) {
      addToast({
        type: 'error',
        title: 'Atenção!',
        description: 'É necessário preencher o(s) módulo(s) anteriores',
      });
      return
    }
    try {
      DomiciliosFormRef.current?.setErrors({});

      const values = {
        ...data,
        entrevista_indigena_id: initialValues?.entrevista_indigena_id,
      }
      const validatedData = await DomicilioValidation.validate(values, {
        abortEarly: false,
      });

      const domicilio = {
        ...values,
        ...validatedData,
      };

      if (!offline) {
        const response = await api.post('/indigeanous-interviews/residence', domicilio, {
          headers: { Authorization: `Bearer ${token}` },
        })
        localStorage.setItem('@Safety:indigenous_domicilio', response.data.id);

        dispatch({ type: 'DOMICILIO', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Informações do domicílio adicionadas com sucesso',
          description: 'Você já pode prosseguir para o módulo doença e saúde',
        });
      } else {
        const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-indigenous-offline-interview-id') || "");

        const offlineInterviews: { [key: string]: ICreateIndigenousOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');

        const addData = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], domicilio } } : false;

        if (addData) {
          localStorage.setItem(`@Safety:indigenous-offline-interviews`, JSON.stringify(addData));

          dispatch({ type: 'DOMICILIO', payload: { id: uniqueId } })

          addToast({
            type: 'success',
            title: 'Informações do domicílio adicionadas com sucesso',
            description: 'Você já pode prosseguir para o módulo doença e saúde',
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

        DomiciliosFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, offline, dispatch, initialValues, token]);


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
                      {incrementCounter()}
                        <Label>{`${counter}. ${element.label}`}</Label>
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
