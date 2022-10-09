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

import ICreateAlimentacaoNutricaoDTO from '../../dtos/ICreateAlimentacaoNutricaoDTO';
import { alimentacaoNutricaoFormHelper, FormHelperType } from './helper';
import { AlimentacaoNutricaoValidation } from '../../validation/schemas/alimentacaoNutricaoValidation';



interface AlimentacaoNutricaoFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const AlimentacaoNutricaoForm: React.FC<AlimentacaoNutricaoFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false }) => {

  // const { user, token } = useAuth();

  const { addToast } = useToast();

  const AlimentacaoNutricaoFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ICreateAlimentacaoNutricaoDTO) => {
    try {
      AlimentacaoNutricaoFormRef.current?.setErrors({});
      const validatedData = await AlimentacaoNutricaoValidation.validate(data, {
        abortEarly: false,
      });

      const alimentacaoNutricao = {
        ...data,
        ...validatedData,
      };

      if (!offline) {
        console.log('alimentacaoNutricao ', alimentacaoNutricao)
        // const response = await api.post('/indigenous-informacoes-basicas', alimentacaoNutricao, {
        //   headers: { Authorization: `Bearer ${token}` },
        // })
        // localStorage.setItem('@Safety:alimentacaoNutricao_id', response.data.id);

        // dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Informações de alimentação e nutrição adicionadas com sucesso',
          description: 'Você já pode prosseguir para o módulo apoio e proteção social',
        });
      } else {
        //TODO: FAZER VERSÃO OFFLINE
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        const errors = getValidationErrors(error);

        AlimentacaoNutricaoFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, offline]);


  if (isEditForm) {
    AlimentacaoNutricaoFormRef.current?.setData({
        //TODO: FAZER EDIT FORM
    })
  }
  return (
    <StyledForm
      ref={AlimentacaoNutricaoFormRef}
      onSubmit={handleSubmit}
    >
        {alimentacaoNutricaoFormHelper?.map((s: FormHelperType[], sectionIndex: number) => (
            <section key={sectionIndex}>
                {s?.map((element: FormHelperType, elementIndex: number) => (
                    <span key={elementIndex}>
                        <Label>{element.label}</Label>
                        <element.type {...element.props} />
                    </span>
                ))}
                {alimentacaoNutricaoFormHelper?.length === sectionIndex+1 && (
                    !isEditForm && <Button type="submit">Enviar</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default AlimentacaoNutricaoForm;
