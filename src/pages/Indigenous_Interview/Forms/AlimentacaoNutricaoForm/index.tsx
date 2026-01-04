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
}

const AlimentacaoNutricaoForm: React.FC<AlimentacaoNutricaoFormProps> = ({
  dispatch,
  offline,
  initialValues = {},
  isEditForm = false,
  hasPreviousStepCompleted = false,
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
        
        // Preserva valores existentes de campos multi-select se estiverem vazios mas existem em initialValues
        if (isEditForm && initialValues) {
          Object.assign(values, preserveMultiSelectValues(values, initialValues, [
            'motivo_morador_nao_faz_horta',
            'alimentos_da_horta',
            'coleta_castanhas_cocos_frutas',
            'funcao_cultivo_horta',
            'origem_semente_plantio',
            'lista_dificuldades_com_horta',
            'lista_animais_de_criacao_alimentacao_ou_venda',
            'alimentos_consumidos_dia_anterior',
          ]));
        }
        
        const validatedData = await AlimentacaoNutricaoValidation.validate(
          values,
          {
            abortEarly: false,
          },
        );

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
          const uniqueId = JSON.parse(
            localStorage.getItem(
              '@Safety:current-indigenous-offline-interview-id',
            ) || '',
          );

          const offlineInterviews: {
            [key: string]: ICreateIndigenousOfflineInterviewDTO;
          } = JSON.parse(
            localStorage.getItem('@Safety:indigenous-offline-interviews') ||
              '{}',
          );

          const addData = offlineInterviews.hasOwnProperty(uniqueId)
            ? {
                ...offlineInterviews,
                [uniqueId]: {
                  ...offlineInterviews[uniqueId],
                  indigenous_alimentacao_nutricao,
                },
              }
            : false;

          if (addData) {
            localStorage.setItem(
              `@Safety:indigenous-offline-interviews`,
              JSON.stringify(addData),
            );

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
          } else {
            throw new Error(
              'Você precisa adicionar adicionar o módulo anterior antes no modo offline',
            );
          }
        }
      } catch (error) {
        //@ts-ignore
        const message = error?.data?.message;
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
      setTimeout(() => {
        if (AlimentacaoNutricaoFormRef.current) {
          AlimentacaoNutricaoFormRef.current.setData(normalizedValues);
        }
      }, 100);
    }
  }, [isEditForm, initialValues]);

  return (
    <StyledForm ref={AlimentacaoNutricaoFormRef} onSubmit={handleSubmit}>
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
              !isEditForm && <Button type='submit'>Enviar</Button>}
          </section>
        ),
      )}
    </StyledForm>
  );
};

export default AlimentacaoNutricaoForm;
