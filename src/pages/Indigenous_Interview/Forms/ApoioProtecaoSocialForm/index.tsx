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

import api from '../../../../services/api';
import { apoioProtecaoSocialFormHelper, FormHelperType } from './helper';
import ICreateSaudeDoencaDTO from '../../dtos/ICreateSaudeDoencaDTO';
import { SaudeDoencaValidation } from '../../validation/schemas/saudeDoencaValidation';



interface ApoioProtecaoSocialFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const ApoioProtecaoSocialForm: React.FC<ApoioProtecaoSocialFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false }) => {

  const { user, token } = useAuth();

  const { addToast } = useToast();

  const ApoioProtecaoSocialFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ICreateSaudeDoencaDTO) => {
    try {
      ApoioProtecaoSocialFormRef.current?.setErrors({});
      const validatedData = await SaudeDoencaValidation.validate(data, {
        abortEarly: false,
      });

      const apoioProtecaoSocial = {
        ...data,
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
  }, [addToast, user, token, dispatch, offline]);


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
                        <element.type {...element.props} />
                    </span>
                ))}
                {apoioProtecaoSocialFormHelper?.length == sectionIndex+1 && (
                    !isEditForm && <Button type="submit">Enviar</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default ApoioProtecaoSocialForm;
