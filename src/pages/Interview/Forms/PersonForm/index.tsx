import React, { useState, useRef, useCallback } from 'react';
import * as Yup from 'yup';
import {
  OptionTypeBase
} from 'react-select';
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
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  genderOptions,
  raceOptions,
  educationOptions,
  traditionalPeoplesOptions,
  workOptions,
  LiteracyOptions,
  yesOrNoOptions,
  workAfterPandemicOptions,
  referencePersonGenderOptions,
  mainPersonOptions
} from '../../questions/SelectorOptions/options';

import api from '../../../../services/api';


const PersonForm: React.FC = (props) => {

  const { user, token } = useAuth();

  const { addToast } = useToast();

  const PersonFormRef = useRef<FormHandles>(null);

  const [mainPerson, setMainPerson] = useState<OptionTypeBase | undefined | null>({});

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
      console.log('person', person);

      console.log('token', token);
      const response = await api.post('/person', person, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem('@Safety:person_id', response.data.id);

      console.log(response);
      addToast({
        type: 'success',
        title: 'Uma pessoa foi adicionada com sucesso',
        description: 'Você já pode adicionar um membro da família',
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
      <Section>
        <Input icon={FiUser} placeholder="Nome Completo" name="name" />

        <Input name="date_of_birth" type="date" />

        <Label>Gênero </Label>
        < Select name="gender" options={genderOptions} />


      </Section>

      < Section >
        <Label>Você é a pessoa de referência da sua casa (chefe da casa)?</Label>
        < Select
          name="gender"
          options={yesOrNoOptions}
          onChange={selectedOption => setMainPerson(selectedOption)}
        />

        <Label>Qual o sexo da pessoa de referência?</Label>
        < Select
          name="reference-person-gender"
          options={referencePersonGenderOptions}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>Raça ou cor </Label>
        < Select name="race_color" options={raceOptions} />
        <Label>Religião </Label>
        < Select name="religion" options={raceOptions} />
        <Label>
          <span>Sabe ler e escrever ? </span>
          < Select name="literacy" options={LiteracyOptions} />
        </Label>
      </Section>

      < Section >
        <Label>Escolaridade </Label>
        < Select name="education" options={educationOptions} />
        <Label>Situação de emprego</Label>
        < Select name="work_status" options={workOptions} />
        <Label>Em relação ao trabalho e a renda das pessoas da sua casa, a pandemia do coronavírus ou COVID-19 levou a:</Label>
        < Select name="work_status" options={workAfterPandemicOptions} />
        <Label>Nos últimos 3 meses, você ou algum morador da sua casa teve diagnóstico de Coronavírus(Covid-19)?</Label>
        < Select name="covid_diagnose" options={yesOrNoOptions} />
        <Button type="submit" > Submit </Button>
      </Section>
    </StyledForm>
  );

}

export default PersonForm;
