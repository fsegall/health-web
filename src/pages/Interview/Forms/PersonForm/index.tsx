import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  CheckBoxContainer,
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
  workAfterPandemicOptions,

} from '../../questions/SelectorOptions/options';
import CheckBoxInput from '../../../../components/Checkbox';

import api from '../../../../services/api';


const PersonForm: React.FC = (props) => {

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


        <Label>Situação de emprego</Label>

        <CheckBoxContainer>

          <CheckBoxInput
            name="unemployed"
            options={[{ id: 'desempregado(a)', value: 'true', label: 'Atualmente está desempregado' }]}
          />

          <CheckBoxInput
            name="employed_normal_salary"
            options={[{ id: 'empregado(a)_salario_normal', value: 'true', label: 'Empregado(a) com jornada de trabalho normal' }]}
          />

          <CheckBoxInput
            name="employed_salary_reduced"
            options={[{ id: 'empregado(a)_salario_parcial', value: 'true', label: 'Empregado(a) com redução de carga horária, mas COM salário PARCIAL ' }]}
          />

          <CheckBoxInput
            name="employed_vacations"
            options={[{ id: 'empregado(a)_ferias', value: 'true', label: 'Empregado(a), mas afastado por estar de férias' }]}
          />

          <CheckBoxInput
            name="employed_on_leave_salary_reduced"
            options={[{
              id: 'empregado(a)_afastado_parcial', value: 'true',
              label:
                'Empregado em afastamento pelo contexto da COVID-19 - com salário PARCIAL'
            }]}
          />

          <CheckBoxInput
            name="employed_on_leave_normal_salary"
            options={[{
              id: 'empregado(a)_afastado_total', value: 'true',
              label:
                'Empregado em afastamento pelo contexto da COVID-19 - com salário TOTAL'
            }]}
          />

          <CheckBoxInput
            name="employed_on_leave_no_salary"
            options={[{
              id: 'empregado(a)_afastado_sem_salario', value: 'true',
              label:
                'Empregado em afastamento pelo contexto da COVID-19 – SEM salário'
            }]}
          />

          <CheckBoxInput
            name="retired"
            options={[{
              id: 'retired', value: 'true', label: 'Aposentado'
            }]}
          />

          <CheckBoxInput
            name="pension"
            options={[{
              id: 'pensionista', value: 'true',
              label: 'Pensionista (viuvez - problema de saúde, pensão alimentícia, etc.)'
            }]}
          />

          <CheckBoxInput
            name="self_employed_legally"
            options={[{
              id: 'autonomo-formal', value: 'true',
              label: 'Trabalho por conta própria – Autônomo (formal)'
            }]}
          />

          <CheckBoxInput
            name="odd_jobs"
            options={[{
              id: 'autonomo-informal', value: 'true',
              label: 'Trabalho por conta própria, bico, ambulante, informal.'
            }]}
          />

          <CheckBoxInput
            name="revenue"
            options={[{
              id: 'rendimentos', value: 'true',
              label: 'Recebe rendimento de outras fontes (aluguel e outras)'
            }]}
          />

          <CheckBoxInput
            name="employer"
            options={[{
              id: 'empregador', value: 'true', label: 'Empregador'
            }]}
          />

        </CheckBoxContainer>

        <Label>Em relação ao trabalho e a renda das pessoas da sua casa, a pandemia do coronavírus ou COVID-19 levou a:</Label>
        < Select name="work_status" options={workAfterPandemicOptions} />
        <Label>Nos últimos 3 meses, você ou algum morador da sua casa teve diagnóstico de Coronavírus(Covid-19)?</Label>
        < Select name="covid_diagnose" options={yesOrNoOptions} />
        <Button type="submit" > Submit </Button>
      </section>
    </StyledForm>
  );

}

export default PersonForm;
