import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import { discriminationFormHelper, FormHelperType } from './helper';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import { Label, StyledForm } from '../../../Indigenous_Interview/Forms/form-styles';
import { DiscrimiationValidation } from '../../validation/schemas/DiscriminationValidation';
import ICreateDiscriminationDTO from '../../dtos/ICreateDiscriminationDTO';
import { uuid } from 'uuidv4';



interface DiscriminationFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
  hasPreviousStepCompleted: boolean;
}

const DiscriminationForm: React.FC<DiscriminationFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false, hasPreviousStepCompleted = false }) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const DiscriminationFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounter () {
    counter += 1;
  }

  const handleSubmit = useCallback(
    async (data: ICreateDiscriminationDTO) => {
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
        DiscriminationFormRef.current?.setErrors({});

        const validatedData = await DiscrimiationValidation.validate(data, {
          abortEarly: false,
        });

        if (!offline) {
          const person_id = localStorage.getItem('@Safety:person_id');

          const discriminationData = {
            person_id,
            ...validatedData,
          };


          const response = await api.post('/discrimination', discriminationData, {
            headers: { Authorization: `Bearer ${token}` },
          });


          localStorage.setItem('@Safety:discrimination_id', response.data.id);

          dispatch({ type: 'DISCRIMINATION', payload: { id: response.data.id } });

          addToast({
            type: 'success',
            title: 'Uma residência foi adicionada com sucesso',
            description: 'Você já pode adicionar um endereço',
          });
        } else {

          const discriminationData = {
            ...validatedData,
          };

          const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-offline-interview-id') || "");

          const offlineInterviews: { [key: string]: ICreateDiscriminationDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

          const addDiscrimination = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], discriminationData } } : false;

          if (addDiscrimination) {
            localStorage.setItem(`@Safety:offline-interviews`, JSON.stringify(addDiscrimination));

            dispatch({ type: 'DISCRIMINATION', payload: { id: uniqueId } });

            addToast({
              type: 'success',
              title: 'Módulo de discriminação salvo com sucesso no modo offline!',
              description: 'Você já pode adicionar um endereço no modo Offline!',
            });
          } else {
            throw new Error('Você precisa preecher os módulos anteriores');
          }
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          console.log(error);
          const errors = getValidationErrors(error);

          DiscriminationFormRef.current?.setErrors(errors);

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


  if (isEditForm) {
    DiscriminationFormRef.current?.setData({
        //TODO: FAZER EDIT FORM
    })
  }
  return (
    <StyledForm
      ref={DiscriminationFormRef}
      onSubmit={handleSubmit}
    >
        {discriminationFormHelper?.map((s: FormHelperType[], sectionIndex: number) => (
            <section key={sectionIndex}>
                {s?.map((element: FormHelperType, elementIndex: number) => (
                    <span key={elementIndex}>
                      {incrementCounter()}
                        <Label>{`${counter}. ${element.label}`}</Label>
                        <element.type {...element.props} />
                    </span>
                ))}
                {discriminationFormHelper?.length === sectionIndex+1 && (
                    !isEditForm && <Button type="submit">Submit</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default DiscriminationForm;
