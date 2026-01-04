import React, { useRef, useCallback, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label
} from '../form-styles';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { normalizeMultiSelectFields, preserveMultiSelectValues } from '../../../../utils/normalizeMultiSelectFields';
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
  resetForms(): void
}

const ApoioProtecaoSocialForm: React.FC<ApoioProtecaoSocialFormProps> = ({
  dispatch,
  offline,
  initialValues = {},
  isEditForm = false,
  hasPreviousStepCompleted = false,
  resetForms
}) => {

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
      
      // Preserva valores existentes de campos multi-select se estiverem vazios mas existem em initialValues
      if (isEditForm && initialValues) {
        Object.assign(values, preserveMultiSelectValues(values, initialValues, [
          'recebeu_cesta_alimentos',
        ]));
      }
      
      const validatedData = await ApoioProtecaoSocialValidation.validate(values, {
        abortEarly: false,
      });

      const indigenous_apoio_protecao_social = {
        ...values,
        ...validatedData,
          bolsa_familia_auxilio_brasil: values.bolsa_familia_auxilio_brasil,
          valor_bolsa_familia_auxilio_brasil: values.valor_bolsa_familia_auxilio_brasil || 0,
          bpc: values.bpc,
          valor_bpc: values.valor_bpc || 0,
          auxilio_maternidade: values.auxilio_maternidade,
          valor_auxilio_maternidade: values.valor_auxilio_maternidade || 0,
          auxilio_doenca: values.auxilio_doenca,
          valor_auxilio_doenca: values.valor_auxilio_doenca || 0,
          aposentadoria: values.aposentadoria,
          valor_aposentadoria: values.valor_aposentadoria || 0,
          pensao_morte: values.pensao_morte,
          valor_pensao_morte: values.valor_pensao_morte || 0,
          programa_auxilio_estadual_municipal: values.programa_auxilio_estadual_municipal,
          valor_programa_auxilio_estadual_municipal: values.valor_programa_auxilio_estadual_municipal || 0,
          cesta_alimentos: values.cesta_alimentos,
      };

      if (!offline) {
        const response = await api.post('/indigenous-interviews/v2/support', indigenous_apoio_protecao_social, {
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

        const addData = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], indigenous_apoio_protecao_social } } : false;

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
      resetForms()
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
  }, [addToast, offline, dispatch, initialValues, history, token, hasPreviousStepCompleted, resetForms, isEditForm]);


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

  useEffect(() => {
    if (isEditForm && initialValues && Object.keys(initialValues).length > 0 && ApoioProtecaoSocialFormRef.current) {
      const normalizedValues = normalizeMultiSelectFields(initialValues, [
        'recebeu_cesta_alimentos',
      ]);
      // Tenta múltiplas vezes com delays crescentes para garantir que os campos estejam registrados
      const attempts = [100, 300, 500, 1000];
      attempts.forEach((delay, index) => {
        setTimeout(() => {
          if (ApoioProtecaoSocialFormRef.current) {
            console.log(`[ApoioProtecaoSocialForm] Tentativa ${index + 1} de setData após ${delay}ms`);
            ApoioProtecaoSocialFormRef.current.setData(normalizedValues);
          }
        }, delay);
      });
    }
  }, [isEditForm, initialValues]);

  return (
    <StyledForm
      ref={ApoioProtecaoSocialFormRef}
      onSubmit={handleSubmit}
      key={isEditForm && initialValues ? `apoio-${JSON.stringify(initialValues)}` : 'apoio-new'}
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
                    <Button type="submit">{isEditForm ? 'Salvar' : 'Enviar'}</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default ApoioProtecaoSocialForm;
