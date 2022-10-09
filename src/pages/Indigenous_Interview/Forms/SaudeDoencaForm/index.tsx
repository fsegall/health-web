import React, { useRef, useCallback } from 'react';
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



interface SaudeDoencaFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const SaudeDoencaForm: React.FC<SaudeDoencaFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false }) => {

  // const { user, token } = useAuth();

  const { addToast } = useToast();

  const SaudeDoencaFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ICreateSaudeDoencaDTO) => {
    try {
      SaudeDoencaFormRef.current?.setErrors({});
      const validatedData = await SaudeDoencaValidation.validate(data, {
        abortEarly: false,
      });

      const saudeDoenca = {
        ...data,
        ...validatedData,
      };

      if (!offline) {
        console.log('saudeDoenca ', saudeDoenca)
        // const response = await api.post('/indigenous-informacoes-basicas', saudeDoenca, {
        //   headers: { Authorization: `Bearer ${token}` },
        // })
        // localStorage.setItem('@Safety:saudeDoenca_id', response.data.id);

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

        SaudeDoencaFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, offline]);


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
                        <Label>{element.label}</Label>
                        <element.type {...element.props} />
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