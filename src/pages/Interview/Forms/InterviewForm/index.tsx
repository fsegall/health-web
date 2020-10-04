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
import Button from '../../../../components/Button';
import ICreateInterviewDTO from '../../dtos/ICreateInterviewDTO';
import { InterviewValidation } from '../../validation/schemas/InterviewValidation';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useToast } from '../../../../hooks/toast';
import CheckBoxInput from '../../../../components/Checkbox';
import api from '../../../../services/api';
import { validateCheckbox } from '../HouseholdForm/utils';


const InterviewForm: React.FC = (props) => {

  const { addToast } = useToast();

  const { history } = useHistory();

  const { token } = useAuth();

  const [complete, setComplete] = useState(false);

  const InterviewFormRef = useRef<FormHandles>(null);


  const handleInterviewSubmit = useCallback(async (data: ICreateInterviewDTO) => {

    const parsedData = {
      ...data,
      is_complete: validateCheckbox(data.is_complete),
    }



    try {
      InterviewFormRef.current?.setErrors({});

      const validatedData = await InterviewValidation.validate(parsedData, {
        abortEarly: false,
      });

      const interviewer_id = await JSON.parse(localStorage.getItem('@Safety:user') || '')?.id;

      const household_id = await localStorage.getItem('@Safety:household_id');

      const person_id = await localStorage.getItem('@Safety:person_id');

      const address_id = await localStorage.getItem('@Safety:address_id');

      const interview = {
        interviewer_id,
        household_id,
        person_id,
        address_id,
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

      history.push('/dashboard');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        InterviewFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro ao adicionar entrevista',
          description: 'Ocorreu um erro ao adicionar a entrevista, tente novamente',
        });
      }
    }
  }, [addToast, token]);

  return (
    <StyledForm ref={InterviewFormRef} onSubmit={handleInterviewSubmit}>
      <section>
        <Label>Nome do Projeto</Label>
        <Input name="project_name" placeholder="Nome do Projeto" defaultValue="PENSSAN" />
        <Label>Número do Projeto</Label>
        <Input name="project_number" placeholder="Número do Projeto" type="number" />

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
        <Input name="comments" placeholder="Comentários sobre a entrevista" />
        <Button>Submit</Button>
      </section>

    </StyledForm>
  );

}

export default InterviewForm;
