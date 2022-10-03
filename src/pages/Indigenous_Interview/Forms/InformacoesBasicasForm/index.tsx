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



interface InformacoesBasicasFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const InformacoesBasicasForm: React.FC<InformacoesBasicasFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false }) => {

  const { user } = useAuth();

  const { addToast } = useToast();

  const InformacoesBasicasFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ICreateInformacoesBasicasDTO) => {
    // const interviewer_id = await JSON.parse(localStorage.getItem('@Safety:user') || '')?.id;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString();
    data = {
        ...data,
        entrevistador: user.id,
        data_da_entrevista: today,
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
        console.log('indigenous_informacoes_basicas ', indigenous_informacoes_basicas)
        // const response = await api.post('/indigenous-informacoes-basicas', indigenous_informacoes_basicas, {
        //   headers: { Authorization: `Bearer ${token}` },
        // })
        // localStorage.setItem('@Safety:indigenous_informacoes_basicas_id', response.data.id);

        // dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Informações Básicas adicionadas com sucesso',
          description: 'Você já pode prosseguir para o módulo demográfico',
        });
      } else {
        //TODO: FAZER VERSÃO OFFLINE
      }
    } catch (error) {
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
  }, [addToast, user, offline]);


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
                        <Label>{element.label}</Label>
                        <element.type {...element.props} />
                    </span>
                ))}
                {s?.length === sectionIndex-1 && (
                    !isEditForm && <Button type="submit">Enviar</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default InformacoesBasicasForm;
