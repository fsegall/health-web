import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label,
  CheckBoxContainer,
  Divider
} from './styles';

import {
  interviewTypeOptions,
} from '../../questions/SelectorOptions/options';
import { useAuth } from '../../../../hooks/auth';
import { useHistory } from 'react-router-dom';
import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Button from '../../../../components/Button';
import ICreateInterviewDTO from '../../dtos/ICreateInterviewDTO';
import { InterviewValidation } from '../../validation/schemas/InterviewValidation';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useToast } from '../../../../hooks/toast';
import CheckBoxInput from '../../../../components/Checkbox';
import api from '../../../../services/api';
import { validateCheckbox } from '../HouseholdForm/utils';
import ICreateOfflineInterviewDTO from '../../dtos/ICreateOfflineInterviewDTO';

interface InterviewFormProps {
  dispatch: Function;
  offline: boolean;
  isEditForm?: boolean;
  initialValues?: any;
  hasPreviousStepCompleted: boolean;
}

const InterviewForm: React.FC<InterviewFormProps> = ({ dispatch, offline, isEditForm = false, initialValues = {}, hasPreviousStepCompleted = false }) => {

  const { addToast } = useToast();

  const history = useHistory();

  const { token } = useAuth();

  const [complete, setComplete] = useState(false);

  const InterviewFormRef = useRef<FormHandles>(null);

  const [, setLoading] = useState<boolean>(false)

  const handleInterviewSubmit = useCallback(async (data: ICreateInterviewDTO) => {

    const parsedData = {
      ...data,
      is_complete: validateCheckbox(data.is_complete),
    }

    try {
      if (!hasPreviousStepCompleted) {
        addToast({
          type: 'error',
          title: 'Você ainda não enviou todos os formulários anteriores',
          description: '',
        });
        return
      }
      setLoading(true)
      InterviewFormRef.current?.setErrors({});

      const validatedData = await InterviewValidation.validate(parsedData, {
        abortEarly: false,
      });

      if (!offline) {

        const interviewer_id = await JSON.parse(localStorage.getItem('@Safety:user') || '')?.id;

        const household_id = localStorage.getItem('@Safety:household_id');

        const person_id = localStorage.getItem('@Safety:person_id');

        const address_id = localStorage.getItem('@Safety:address_id');

        const discrimination_id = localStorage.getItem('@Safety:discrimination_id') ?? null;
        const violence_id = localStorage.getItem('@Safety:violence_id') ?? null;
        const mental_health_id = localStorage.getItem('@Safety:mental_health_id') ?? null;

        const interview = {
          interviewer_id,
          household_id,
          person_id,
          address_id,
          discrimination_id,
          violence_id,
          mental_health_id,
          ...validatedData,
        };

        await api.post('/interviews', interview, {
          headers: { Authorization: `Bearer ${token}` },
        });

        addToast({
          type: 'success',
          title: 'A entrevista foi adicionada com sucesso',
          description: 'O formulário de pesquisa foi preenchido.',
        });

        localStorage.removeItem('@Safety:person_id');
        localStorage.removeItem('@Safety:household_id');
        localStorage.removeItem('@Safety:address_id');
        localStorage.removeItem('@Safety:discrimination_id');
        localStorage.removeItem('@Safety:violence_id');
        localStorage.removeItem('@Safety:mental_health_id');
        localStorage.removeItem('@Safety:current-offline-interview-id');
        localStorage.removeItem('@Safety:hide_health_module');
        localStorage.removeItem('@Safety:discrimination_form_sent');

        dispatch({ type: "INTERVIEW" });

        history.push('/dashboard');
      } else {

        const interview = {
          ...validatedData,
        };

        const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-offline-interview-id') || "");

        const offlineInterviews: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

        const addInterview = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], interview } } : false;

        if (addInterview) {
          localStorage.setItem(`@Safety:offline-interviews`, JSON.stringify(addInterview));

          addToast({
            type: 'success',
            title: 'A entrevista foi adicionada com sucesso no modo offline!',
            description: 'O formulário de pesquisa foi preenchido no modo offline!.',
          });

          localStorage.removeItem('@Safety:discrimination_form_sent');
          localStorage.removeItem('@Safety:current-offline-interview-id');

          dispatch({ type: "INTERVIEW" });

          history.push('/dashboard');

        } else {
          throw new Error('Você também precisa adicionar um endereço antes de finalizar uma entrevista no modo offline');
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        InterviewFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro ao adicionar entrevista',
          description: 'Ocorreu um erro ao adicionar a entrevista, tente novamente',
        });
      } else {
        addToast({
          type: 'error',
          //@ts-ignore
          title: error?.data?.message,
          description: 'Ocorreu um erro ao adicionar a entrevista, tente novamente',
        });
      }
    } finally {
      setLoading(false)
    }
  }, [addToast, token, history, dispatch, offline, setLoading, hasPreviousStepCompleted]);

  if (isEditForm) {
    InterviewFormRef.current?.setData({
      project_name: initialValues?.project?.name,
      project_number: initialValues?.project?.project_number,
      interview_type: initialValues?.interview_type,
      is_complete: initialValues?.is_complete ? 'completa' : 'completa_com_erros',
      is_complete_with_errors: initialValues?.is_complete_with_errors ? 'completa_com_erros' : 'completa',
      comments: initialValues?.comments,
    })
  }

  return (
    <StyledForm ref={InterviewFormRef} onSubmit={handleInterviewSubmit}>
      <section>
        <Label>Nome do Projeto</Label>
        <Input name="project_name" />
        <Label>Número do Projeto</Label>
        <Input name="project_number" type="number" />

      </section>
      <section>
        <Label>A entrevista foi concluída:</Label>
        <CheckBoxContainer>

          <CheckBoxInput
            name="is_complete"
            options={[{ id: 'completa', value: 'true', label: 'Completa e sem erros' }]}
            onChange={() => setComplete(!complete)}
            checked={!complete}
          />
          <CheckBoxInput
            name="is_complete_with_errors"
            options={[{ id: 'completa_com_erros', value: 'true', label: 'Completa com erros' }]}
            onChange={() => setComplete(!complete)}
            checked={complete}
          />

        </CheckBoxContainer>

        <Label>Qual a modalidade de entrevista?</Label>
        <Select name="interview_type" options={interviewTypeOptions} />
        <Divider />
        <TextArea name="comments" placeholder="Comentários sobre a entrevista" rows={4} cols={200} />
        {!isEditForm && <Button>Submit</Button>}
      </section>

    </StyledForm>
  );

}

export default InterviewForm;
