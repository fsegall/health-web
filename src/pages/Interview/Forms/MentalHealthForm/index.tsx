import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import { mentalHealthFormHelper, FormHelperType } from './helper';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import { Label, StyledForm } from '../../../Indigenous_Interview/Forms/form-styles';
import { MentalHealthValidation } from '../../validation/schemas/MentalHealthValidation';
import ICreateMentalHealthDTO from '../../dtos/ICreateMentalHealthDTO';



interface MentalHealthFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
  hasPreviousStepCompleted: boolean;
}

const MentalHealthForm: React.FC<MentalHealthFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false, hasPreviousStepCompleted = false }) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const MentalHealthFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounter () {
    counter += 1;
  }

  const handleSubmit = useCallback(
    async (data: ICreateMentalHealthDTO) => {

      try {
        if(!loading) {
        setLoading(true)
        }
        MentalHealthFormRef.current?.setErrors({});

        const validatedData = await MentalHealthValidation.validate(data, {
          abortEarly: false,
        });

        if (!offline) {
          const person_id = localStorage.getItem('@Safety:person_id');

          const mental_health_data = {
            person_id,
            ...validatedData,
          };


          const response = await api.post('/mental_health', mental_health_data, {
            headers: { Authorization: `Bearer ${token}` },
          });


          localStorage.setItem('@Safety:mental_health_id', response.data.id);

          dispatch({ type: 'MENTAL_HEALTH', payload: { id: response.data.id } });

          addToast({
            type: 'success',
            title: 'Uma residência foi adicionada com sucesso',
            description: 'Você já pode adicionar um endereço',
          });
        } else {

          const mental_health_data = {
            ...validatedData,
          };

          const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-offline-interview-id') || "");

          const offlineInterviews: { [key: string]: ICreateMentalHealthDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

          const addData = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], mental_health_data } } : false;

          if (addData) {
            localStorage.setItem(`@Safety:offline-interviews`, JSON.stringify(addData));

            dispatch({ type: 'MENTAL_HEALTH', payload: { id: uniqueId } });

            addToast({
              type: 'success',
              title: 'Módulo de saúde mental e estresse salvo com sucesso no modo offline!',
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

          MentalHealthFormRef.current?.setErrors(errors);

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
    [addToast, token, dispatch, offline, loading, setLoading],
  );


  if (isEditForm) {
    MentalHealthFormRef.current?.setData({
        //TODO: FAZER EDIT FORM
    })
  }
  return (
    <StyledForm
      ref={MentalHealthFormRef}
      onSubmit={handleSubmit}
    >
        {mentalHealthFormHelper?.map((s: FormHelperType[], sectionIndex: number) => (
            <section key={sectionIndex}>
                {s?.map((element: FormHelperType, elementIndex: number) => (
                    <span key={elementIndex}>
                      {incrementCounter()}
                        <Label>{`${counter}. ${element.label}`}</Label>
                        <element.type {...element.props} />
                    </span>
                ))}
                {mentalHealthFormHelper?.length === sectionIndex+1 && (
                    !isEditForm && <Button type="submit">Submit</Button>
                )}
            </section>
        ))}
    </StyledForm>
  );
}

export default MentalHealthForm;
