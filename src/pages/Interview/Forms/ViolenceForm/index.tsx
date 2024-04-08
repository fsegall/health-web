import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import { violenceHealthFormHelper, FormHelperType } from './helper';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import { Label, StyledForm } from '../../../Indigenous_Interview/Forms/form-styles';
import { ViolenceValidation } from '../../validation/schemas/ViolenceValidation';
import ICreateViolenceDTO from '../../dtos/ICreateViolenceDTO';



interface ViolenceFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
  hasPreviousStepCompleted: boolean;
}

const ViolenceForm: React.FC<ViolenceFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false, hasPreviousStepCompleted = false }) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const ViolenceFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounter (index: number, name: string) {
    if (index % 3 === 0) {
      counter += 1;
      return counter + '. '
    } else {
      return ''
    }
  }

  const handleSubmit = useCallback(
    async (data: ICreateViolenceDTO) => {

      if (!hasPreviousStepCompleted) {
        addToast({
          type: 'error',
          title: 'Você ainda não enviou todos os formulários anteriores',
          description: '',
        });
        return
      }
      try {
        if(!loading) {
        setLoading(true)
        }
        ViolenceFormRef.current?.setErrors({});

        const validatedData = await ViolenceValidation.validate(data, {
          abortEarly: false,
        });

        if (!offline) {
          const person_id = localStorage.getItem('@Safety:person_id');

          const violence_data = {
            person_id,
            ...validatedData,
          };


          const response = await api.post('/violence', violence_data, {
            headers: { Authorization: `Bearer ${token}` },
          });


          localStorage.setItem('@Safety:violence_id', response.data.id);

          dispatch({ type: 'VIOLENCE', payload: { id: response.data.id } });

          addToast({
            type: 'success',
            title: 'Formulário de violência foi adicionada com sucesso',
            description: 'Você já pode avançar para o próximo formulário',
          });
        } else {

          const violence = {
            ...validatedData,
          };

          const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-offline-interview-id') || "");

          const offlineInterviews: { [key: string]: ICreateViolenceDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

          const addData = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], violence } } : false;

          if (addData) {
            localStorage.setItem(`@Safety:offline-interviews`, JSON.stringify(addData));

            dispatch({ type: 'VIOLENCE', payload: { id: uniqueId } });

            addToast({
              type: 'success',
              title: 'Módulo de violencia salvo com sucesso no modo offline!',
              description: 'Você já pode avançar para o próximo módulo no modo Offline!',
            });
          } else {
            throw new Error('Você precisa preecher os módulos anteriores');
          }
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          console.log(error);
          const errors = getValidationErrors(error);

          ViolenceFormRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: error.message,
            description: 'Todos os campos devem estar selecionados',
          });
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false)
      }
    },
    [addToast, token, dispatch, offline, loading, setLoading, hasPreviousStepCompleted],
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


  if (isEditForm) {
    ViolenceFormRef.current?.setData({
        //TODO: FAZER EDIT FORM
    })
  }
  return (
    <StyledForm
      ref={ViolenceFormRef}
      onSubmit={handleSubmit}
    >
      {violenceHealthFormHelper?.map(
        (s: FormHelperType[], sectionIndex: number) => (
          <section key={sectionIndex}>
            {s?.map((element: FormHelperType, elementIndex: number) => (
              <span key={elementIndex}>
                <Label>{`${incrementCounter(elementIndex, element.props.name)}${element.label}`}</Label>
                <element.type
                  {...element.props}
                  isDisabled={element?.dependencies && handleDisabled(element)}
                  onChange={(e: any) => handleDependencies(element, e?.value)}
                />
              </span>
            ))}
            {violenceHealthFormHelper?.length === sectionIndex + 1 &&
              !isEditForm && <Button type='submit'>Enviar</Button>}
          </section>
        ),
      )}
    </StyledForm>
  );
}

export default ViolenceForm;
