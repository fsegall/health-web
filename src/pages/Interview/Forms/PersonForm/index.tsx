import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label
} from './styles';
import {
  FiUser,
} from 'react-icons/fi';
import { useAuth } from '../../../../hooks/auth';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ICreatePersonDTO from '../../dtos/ICreatePersonDTO';
import { PersonValidation } from '../../validation/schemas/PersonValidation';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  genderOptions,
  raceOptions,
  educationOptions,
  LiteracyOptions,
  yesOrNoOptions,
  workOptions,

} from '../../questions/SelectorOptions/options';


import api from '../../../../services/api';

interface PersonFormProps {
  dispatch: Function;
}

const PersonForm: React.FC<PersonFormProps> = ({ dispatch }) => {

  const { user, token } = useAuth();

  const { addToast } = useToast();

  const PersonFormRef = useRef<FormHandles>(null);

  const handlePersonSubmit = useCallback(async (data: ICreatePersonDTO) => {
    try {
      PersonFormRef.current?.setErrors({});
      const validatedData = await PersonValidation.validate(data, {
        abortEarly: false,
      });

      const person = {
        interviewer_id: user.id,
        ...validatedData,
      };



      const response = await api.post('/persons', person, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('@Safety:person_id', response.data.id);

      dispatch({ type: 'PERSON' })

      addToast({
        type: 'success',
        title: 'Uma pessoa foi adicionada com sucesso',
        description: 'Você já pode adicionar uma residência',
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        PersonFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro ao adicionar uma pessoa',
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, user, token]);

  return (
    <StyledForm ref={PersonFormRef} onSubmit={handlePersonSubmit} >
      <section>
        <Input icon={FiUser} placeholder="Nome Completo" name="name" />
        <Label>Data de Nascimento</Label>
        <Input name="date_of_birth" type="date" />

        <Label>Gênero </Label>
        < Select name="gender" options={genderOptions} />


      </section>

      < section >

        <Label>Raça ou cor </Label>
        < Select name="race_color" options={raceOptions} />
        <Label>
          <span>Sabe ler e escrever ? </span>
          < Select name="literacy" options={LiteracyOptions} />
        </Label>
      </section>

      < section >
        <Label>Escolaridade </Label>
        < Select name="education" options={educationOptions} />

        <Label>
          <span>Atualmente qual a sua situação com relação ao emprego/trabalho? </span>
          < Select name="work_status" options={workOptions} />
        </Label>

        <Label>Nos últimos 3 meses, você ou algum morador da sua casa teve diagnóstico de Coronavírus(Covid-19)?</Label>
        < Select name="covid_diagnose" options={yesOrNoOptions} />
        <Button type="submit" > Submit </Button>
      </section>
    </StyledForm>
  );

}

export default PersonForm;
