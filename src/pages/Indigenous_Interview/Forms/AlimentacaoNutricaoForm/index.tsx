import React, { useRef, useCallback, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { StyledForm, Label } from '../form-styles';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { normalizeMultiSelectFields, preserveMultiSelectValues } from '../../../../utils/normalizeMultiSelectFields';

import ICreateAlimentacaoNutricaoDTO from '../../dtos/ICreateAlimentacaoNutricaoDTO';
import { alimentacaoNutricaoFormHelper, FormHelperType } from './helper';
import { AlimentacaoNutricaoValidation } from '../../validation/schemas/alimentacaoNutricaoValidation';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import ICreateIndigenousOfflineInterviewDTO from '../../dtos/ICreateIndigenousOfflineInterviewDTO';

interface AlimentacaoNutricaoFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any;
  isEditForm?: boolean;
  hasPreviousStepCompleted: boolean;
  offlineId?: string | null;
}

const AlimentacaoNutricaoForm: React.FC<AlimentacaoNutricaoFormProps> = ({
  dispatch,
  offline,
  initialValues = {},
  isEditForm = false,
  hasPreviousStepCompleted = false,
  offlineId = null,
}) => {
  const { token } = useAuth();

  const { addToast } = useToast();

  const AlimentacaoNutricaoFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounter() {
    counter += 1;
  }

  const handleSubmit = useCallback(
    async (data: ICreateAlimentacaoNutricaoDTO) => {
      console.log('[AlimentacaoNutricaoForm] handleSubmit chamado', { isEditForm, offline, hasPreviousStepCompleted });
      if (!hasPreviousStepCompleted) {
        addToast({
          type: 'error',
          title: 'Atenção!',
          description: 'É necessário preencher o(s) módulo(s) anteriores',
        });
        return;
      }
      try {
        AlimentacaoNutricaoFormRef.current?.setErrors({});
        const values = {
          ...data,
          entrevista_indigena_id: initialValues?.entrevista_indigena_id,
        };
        
        console.log('[AlimentacaoNutricaoForm] Valores antes de preserveMultiSelectValues', values);
        
        // Preserva valores existentes de campos multi-select se estiverem vazios mas existem em initialValues
        if (isEditForm && initialValues) {
          const preserved = preserveMultiSelectValues(values, initialValues, [
            'motivo_morador_nao_faz_horta',
            'alimentos_da_horta',
            'coleta_castanhas_cocos_frutas',
            'funcao_cultivo_horta',
            'origem_semente_plantio',
            'lista_dificuldades_com_horta',
            'lista_animais_de_criacao_alimentacao_ou_venda',
            'alimentos_consumidos_dia_anterior',
          ]);
          Object.assign(values, preserved);
          console.log('[AlimentacaoNutricaoForm] Valores após preserveMultiSelectValues', values);
        }
        
        console.log('[AlimentacaoNutricaoForm] Iniciando validação Yup');
        const validatedData = await AlimentacaoNutricaoValidation.validate(
          values,
          {
            abortEarly: false,
          },
        );
        console.log('[AlimentacaoNutricaoForm] Validação Yup passou', validatedData);

        const indigenous_alimentacao_nutricao = {
          ...values,
          ...validatedData,
        };

        if (!offline) {
          const response = await api.post(
            '/indigenous-interviews/v2/nutrition',
            indigenous_alimentacao_nutricao,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          localStorage.setItem(
            '@Safety:indigenous_alimentacao_nutricao',
            response.data.id,
          );

          dispatch({
            type: 'ALIMENTACAO_NUTRICAO',
            payload: { id: response.data.id },
          });

          addToast({
            type: 'success',
            title:
              'Informações de alimentação e nutrição adicionadas com sucesso',
            description:
              'Você já pode prosseguir para o módulo apoio e proteção social',
          });
        } else {
          console.log('[AlimentacaoNutricaoForm] Modo offline - buscando uniqueId');
          // Quando está editando (isEditForm), usa o offlineId (id da URL)
          // Quando está criando novo, busca do localStorage
          let uniqueId: string | null = null;
          if (isEditForm && offlineId) {
            uniqueId = offlineId;
            console.log('[AlimentacaoNutricaoForm] Editando - usando offlineId como uniqueId', uniqueId);
          } else {
            uniqueId = JSON.parse(
              localStorage.getItem(
                '@Safety:current-indigenous-offline-interview-id',
              ) || 'null',
            );
            console.log('[AlimentacaoNutricaoForm] Criando novo - uniqueId do localStorage', uniqueId);
          }
          
          if (!uniqueId) {
            console.error('[AlimentacaoNutricaoForm] uniqueId não encontrado');
            throw new Error('ID da entrevista não encontrado');
          }

          const offlineInterviews: {
            [key: string]: ICreateIndigenousOfflineInterviewDTO;
          } = JSON.parse(
            localStorage.getItem('@Safety:indigenous-offline-interviews') ||
              '{}',
          );
          console.log('[AlimentacaoNutricaoForm] offlineInterviews carregados', Object.keys(offlineInterviews));

          const addData = offlineInterviews.hasOwnProperty(uniqueId)
            ? {
                ...offlineInterviews,
                [uniqueId]: {
                  ...offlineInterviews[uniqueId],
                  indigenous_alimentacao_nutricao,
                },
              }
            : false;

          console.log('[AlimentacaoNutricaoForm] addData', addData ? 'válido' : 'false');

          if (addData) {
            localStorage.setItem(
              `@Safety:indigenous-offline-interviews`,
              JSON.stringify(addData),
            );
            console.log('[AlimentacaoNutricaoForm] Dados salvos no localStorage');

            dispatch({
              type: 'ALIMENTACAO_NUTRICAO',
              payload: { id: uniqueId },
            });

            addToast({
              type: 'success',
              title:
                'Informações de alimentação e nutrição adicionadas com sucesso',
              description:
                'Você já pode prosseguir para o módulo apoio e proteção social',
            });
            console.log('[AlimentacaoNutricaoForm] Toast de sucesso exibido');
          } else {
            console.error('[AlimentacaoNutricaoForm] addData é false - uniqueId não encontrado');
            throw new Error(
              'Você precisa adicionar adicionar o módulo anterior antes no modo offline',
            );
          }
        }
      } catch (error) {
        console.error('[AlimentacaoNutricaoForm] Erro no handleSubmit', error);
        //@ts-ignore
        const message = error?.data?.message;
        if (message) {
          console.error('[AlimentacaoNutricaoForm] Erro da API', message);
          addToast({
            type: 'error',
            title: message,
            description: '',
          });
        }
        if (error instanceof Yup.ValidationError) {
          console.error('[AlimentacaoNutricaoForm] Erro de validação Yup', error);
          const errors = getValidationErrors(error);

          AlimentacaoNutricaoFormRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: error.message,
            description: 'Todos os campos devem estar selecionados',
          });
        }
      }
    },
    [
      addToast,
      offline,
      dispatch,
      initialValues,
      token,
      hasPreviousStepCompleted,
      isEditForm,
      offlineId,
    ],
  );

  const [formDependencies, setFormDependencies] = useState<any>({});

  function handleDependencies(element: FormHelperType, value: any) {
    let currentForm: any = {
      ...formDependencies,
      [element.props.name]: value,
    };
    setFormDependencies(currentForm);
  }

  function handleDisabled(element: FormHelperType): boolean {
    const dependencies: { [key: string]: string[] } | any =
      element?.dependencies;
    const allDisabledValidations = Object.entries(dependencies)?.map(
      (obj: any) => {
        let isDisabled = true;
        const found = formDependencies[obj?.[0]];
        if (found) {
          if (obj?.[1]?.find((v: any) => v === found || found?.includes(v))) {
            isDisabled = false;
          }
        }
        return isDisabled;
      },
    );
    if (allDisabledValidations?.every((v) => v === false)) {
      return false;
    } else {
      return true;
    }
  }

  function handleArrayDependencies(element: FormHelperType, value: any) {
    const arrayOfOptions = value?.map((v: any) => v?.value);
    let currentForm: any = {
      ...formDependencies,
      [element.props.name]: arrayOfOptions,
    };
    setFormDependencies(currentForm);
  }

  useEffect(() => {
    if (isEditForm && initialValues && Object.keys(initialValues).length > 0 && AlimentacaoNutricaoFormRef.current) {
      const normalizedValues = normalizeMultiSelectFields(initialValues, [
        'motivo_morador_nao_faz_horta',
        'alimentos_da_horta',
        'coleta_castanhas_cocos_frutas',
        'funcao_cultivo_horta',
        'origem_semente_plantio',
        'lista_dificuldades_com_horta',
        'lista_animais_de_criacao_alimentacao_ou_venda',
        'alimentos_consumidos_dia_anterior',
      ]);
      // Tenta múltiplas vezes com delays crescentes para garantir que os campos estejam registrados
      const attempts = [100, 300, 500, 1000];
      attempts.forEach((delay, index) => {
        setTimeout(() => {
          if (AlimentacaoNutricaoFormRef.current) {
            console.log(`[AlimentacaoNutricaoForm] Tentativa ${index + 1} de setData após ${delay}ms`);
            AlimentacaoNutricaoFormRef.current.setData(normalizedValues);
          }
        }, delay);
      });
    }
  }, [isEditForm, initialValues]);

  return (
    <StyledForm 
      ref={AlimentacaoNutricaoFormRef} 
      onSubmit={handleSubmit}
      key={isEditForm && initialValues ? `alimentacao-${JSON.stringify(initialValues)}` : 'alimentacao-new'}
    >
      {alimentacaoNutricaoFormHelper?.map(
        (s: FormHelperType[], sectionIndex: number) => (
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
                      element?.hasDependencies &&
                        handleDependencies(element, e?.value);
                    } else {
                      element?.hasDependencies &&
                        handleArrayDependencies(element, e);
                    }
                  }}
                />
              </span>
            ))}
            {alimentacaoNutricaoFormHelper?.length === sectionIndex + 1 &&
              <Button type='submit'>{isEditForm ? 'Salvar' : 'Enviar'}</Button>}
          </section>
        ),
      )}
    </StyledForm>
  );
};

export default AlimentacaoNutricaoForm;
