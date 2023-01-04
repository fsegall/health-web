import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label
} from '../form-styles';
import { useAuth } from '../../../../hooks/auth';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import ICreateInformacoesBasicasDTO from '../../dtos/ICreateInformacoesBasicasDTO';
import { InformacoesBasicasValidation } from '../../validation/schemas/InformacoesBasicasValidation';
import { FormHelperType, informacoesBasicasFormHelper } from './helper';
import api from '../../../../services/api';
import { uuid } from 'uuidv4';
import ICreateIndigenousOfflineInterviewDTO from '../../dtos/ICreateIndigenousOfflineInterviewDTO';



interface InformacoesBasicasFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const InformacoesBasicasForm: React.FC<InformacoesBasicasFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false }) => {

  const { user, token } = useAuth();

  const { addToast } = useToast();

  const InformacoesBasicasFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounter () {
    counter += 1;
  }

  const handleSubmit = useCallback(async (data: ICreateInformacoesBasicasDTO) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString();
    data = {
        ...data,
        entrevistador_id: user?.id,
        data_entrevista: today,
    }
    try {
      InformacoesBasicasFormRef.current?.setErrors({});
      const validatedData = await InformacoesBasicasValidation.validate(data, {
        abortEarly: false,
      });

      const indigenous_informacoes_basicas = {
        ...data,
        ...validatedData,
      };

      if (!offline) {
        const response = await api.post('/indigeanous-interviews', indigenous_informacoes_basicas, {
          headers: { Authorization: `Bearer ${token}` },
        })
        localStorage.setItem('@Safety:indigenous_informacoes_basicas', response.data.id);

        dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Informações Básicas adicionadas com sucesso',
          description: 'Você já pode prosseguir para o módulo demográfico',
        });
      } else {
        const uniqueId = uuid();

        localStorage.setItem(`@Safety:current-indigenous-offline-interview-id`, JSON.stringify(uniqueId));

        const offlineInterviews: { [key: string]: ICreateIndigenousOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');

        const addData = Object.keys(offlineInterviews).length ? { ...offlineInterviews, [uniqueId]: { indigenous_informacoes_basicas } } : { [uniqueId]: { indigenous_informacoes_basicas } };

        localStorage.setItem(`@Safety:indigenous-offline-interviews`, JSON.stringify(addData));

        dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: uniqueId } })

        addToast({
          type: 'success',
          title: 'Informações Básicas adicionadas com sucesso',
          description: 'Você já pode prosseguir para o módulo demográfico',
        });
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

        InformacoesBasicasFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, user, offline, dispatch, token]);


  if (isEditForm) {
    InformacoesBasicasFormRef.current?.setData({
        //TODO: FAZER EDIT FORM
    })
  }
  return (
    <StyledForm
      ref={InformacoesBasicasFormRef}
      onSubmit={handleSubmit}
    >
        {informacoesBasicasFormHelper?.map((s: FormHelperType[], sectionIndex: number) => (
            <section key={sectionIndex}>
                {s?.map((element: FormHelperType, elementIndex: number) => (
                    <span key={elementIndex}>
                      { incrementCounter() }
                        <Label>{`${counter}. ${element.label}`}</Label>
                        <element.type {...element.props} />
                    </span>
                ))}
                {informacoesBasicasFormHelper?.length === sectionIndex+1 && (
                    !isEditForm && <Button type="submit">Enviar</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default InformacoesBasicasForm;
