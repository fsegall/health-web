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
  genero,
  raca_cor,
  escolaridade,
  situacao_de_trabalho,
  ocupacao_profissional,
  local_de_trabalho,
  yesOrNoOptions,
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
        console.log(error);
        const errors = getValidationErrors(error);

        PersonFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, user, token, dispatch]);

  return (
    <StyledForm ref={PersonFormRef} onSubmit={handlePersonSubmit} >
      <section>
        <Label>P1 - Qual o seu nome completo?</Label>
        <Input icon={FiUser} placeholder="Nome Completo" name="nome" />
        <Label>P2 - Qual a sua idade?</Label>
        <Input name="idade" type="number" min="16" max="110" />

        <Label>P3 - Qual o seu sexo?</Label>
        < Select name="sexo" options={genero} />
      </section>

      < section >
        <Label>P4 - Como você define sua raça ou cor?</Label>
        < Select name="raca_cor" options={raca_cor} />
        <Label>P5 - Você sabe ler e escrever?</Label>
        < Select name="ler_escrever" options={yesOrNoOptions} />
      </section>

      < section >
        <Label>P6 - Até que série (grau) você frequentou na escola?</Label>
        < Select name="escolaridade" options={escolaridade} />
        <Label>P7 - Qual a situação de trabalho?</Label>
        < Select
          name="situacao_de_trabalho"
          options={situacao_de_trabalho}
        />

        <Label>P8 - Qual a sua ocupação profissional?</Label>
        < Select
          name="ocupacao"
          options={ocupacao_profissional}
        />

        <Label>P9 - Neste momento qual é o seu local de trabalho?</Label>
        < Select
          name="local_de_trabalho"
          options={local_de_trabalho}
        />
        <Label>P10 - Você já teve diagnóstico positivo para o novo coronavírus (ou Covid-19)?</Label>
        < Select name="diagnostico_covid" options={yesOrNoOptions} />
        <Button type="submit" > Submit </Button>
      </section>
    </StyledForm>
  );

}

export default PersonForm;
