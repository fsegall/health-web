import React, { useRef, useCallback, useState, useEffect } from 'react';
import { normalizeMultiSelectFields, preserveMultiSelectValues } from '../../../../utils/normalizeMultiSelectFields';
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
      
      // Preserva valores existentes de campos multi-select se estiverem vazios mas existem em initialValues
      if (isEditForm && initialValues) {
        Object.assign(values, preserveMultiSelectValues(values, initialValues, [
          'tipo_moradia',
          'utensilios_casa',
          'utensilios_de_trabalho',
          'veiculos',
          'forma_coleta_esgoto',
          'destino_lixo_da_residencia',
        ]));
      }
      
      const validatedData = await DomicilioValidation.validate(values, {
        abortEarly: false,
      });

      const indigenous_domicilio = {
        ...values,
        ...validatedData,
      };

      if (!offline) {
        const response = await api.post('/indigenous-interviews/v2/residence', indigenous_domicilio, {
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

        const addData = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], indigenous_domicilio } } : false;

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
  }, [addToast, offline, dispatch, initialValues, token, hasPreviousStepCompleted, isEditForm]);

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
    if (element.dependenciesWithOr === true) {
      if (allDisabledValidations?.filter(v => v === false)?.length > 0) {
        return false
      } else {
        return true
      }
    } else {
      if (allDisabledValidations?.every(v => v === false)) {
        return false
      } else {
        return true
      }
    }
  }

  useEffect(() => {
    if (isEditForm && initialValues && Object.keys(initialValues).length > 0 && DomiciliosFormRef.current) {
      const normalizedValues = normalizeMultiSelectFields(initialValues, [
        'tipo_moradia',
        'utensilios_casa',
        'utensilios_de_trabalho',
        'veiculos',
        'forma_coleta_esgoto',
        'destino_lixo_da_residencia',
      ]);
      // Tenta múltiplas vezes com delays crescentes para garantir que os campos estejam registrados
      const attempts = [100, 300, 500, 1000];
      attempts.forEach((delay, index) => {
        setTimeout(() => {
          if (DomiciliosFormRef.current) {
            console.log(`[DomicilioForm] Tentativa ${index + 1} de setData após ${delay}ms`);
            DomiciliosFormRef.current.setData(normalizedValues);
          }
        }, delay);
      });
    }
  }, [isEditForm, initialValues]);
  return (
    <StyledForm
      ref={DomiciliosFormRef}
      onSubmit={handleSubmit}
      key={isEditForm && initialValues ? `domicilio-${JSON.stringify(initialValues)}` : 'domicilio-new'}
    >
        {domicilioFormHelper?.map((s: FormHelperType[], sectionIndex: number) => (
            <section key={sectionIndex}>
                {s?.map((element: FormHelperType, elementIndex: number) => (
                    <span key={elementIndex}>
                      {incrementCounter()}
                        <Label>{`${counter}. ${element.label}`}</Label>
                        <element.type {...element.props}
                          isDisabled={element?.dependencies && handleDisabled(element)}
                          onChange={(e: any) => element?.hasDependencies && handleDependencies(element, e?.value)}
                        />
                    </span>
                ))}
                {domicilioFormHelper?.length === sectionIndex+1 && (
                    <Button type="submit">{isEditForm ? 'Salvar' : 'Enviar'}</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default DomiciliosForm;
