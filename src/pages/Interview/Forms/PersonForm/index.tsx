import React, { useState, useRef, useCallback } from 'react';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Section,
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

import {
  genderOptions,
  raceOptions,
  maritalOptions,
  educationOptions,
  healthOptions,
  religionOptions,
  workOptions,
  LiteracyOptions,
} from '../../questions/SelectorOptions/options';

import api from '../../../../services/api';


const PersonForm: React.FC = (props) => {

  const { user, token } = useAuth();

  const PersonFormRef = useRef<FormHandles>(null);

  const handlePersonSubmit = useCallback(async (data: ICreatePersonDTO) => {
    try {
      const validatedData = await PersonValidation.validate(data, {
        abortEarly: false,
      });
      const person = {
        interviewer_id: user.id,
        ...validatedData,
      };
      console.log('person', person);

      console.log('token', token);
      const response = await api.post('/person', person, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('@Safety:person_id', response.data.id);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <StyledForm ref={PersonFormRef} onSubmit={handlePersonSubmit} >
      <Section>
        <Input icon={FiUser} placeholder="Nome Completo" name="name" />

        <Input name="date_of_birth" type="date" />

        <Label>Gênero </Label>

        < Select name="gender" options={genderOptions} />
        <Label>Raça ou cor </Label>
        < Select name="race_color" options={raceOptions} />
      </Section>

      < Section >
        <Label>Religião </Label>
        < Select name="religion" options={religionOptions} />

        <Label>Estado Civil </Label>
        < Select name="marital_status" options={maritalOptions} />
        <Label>
          <span>Sabe ler e escrever ? </span>
          < Select name="literacy" options={LiteracyOptions} />
        </Label>
      </Section>

      < Section >
        <Label>Escolaridade </Label>
        < Select name="education" options={educationOptions} />
        <Label>Situação de emprego </Label>
        < Select name="work_status" options={workOptions} />
        <Label>Situação de saúde </Label>
        < Select name="health_conditions" options={healthOptions} />
        <Button type="submit" > Submit </Button>
      </Section>
    </StyledForm>
  );

}

export default PersonForm;
