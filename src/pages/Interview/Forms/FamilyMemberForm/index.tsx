import React, { useState, useRef, useCallback } from 'react';
import Select from '../../../../components/Select';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  StyledFamilyForm,
  Counters,
  CounterButton,
  Label
} from './styles';
import {
  FiUsers,
} from 'react-icons/fi';
import { useAuth } from '../../../../hooks/auth';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ICreateFamilyMemberDTO from '../../dtos/ICreateFamilyMemberDTO';
import { FamilyMemberValidation } from '../../validation/schemas/FamilyMemberValidation';
import {
  genderOptions,
} from '../../questions/SelectorOptions/options';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';


const FamilyMemberForm: React.FC = (props) => {

  const { addToast } = useToast();

  const [counter, setCounter] = useState(1);

  const [submitted, setSubmitted] = useState(false);

  let listitems: number[] = [];

  for (let i = 1; i <= counter; i++) {
    listitems.push(i);
  }

  const { token } = useAuth();

  const FamilyMemberFormRef = useRef<FormHandles>(null);

  async function submitCurrentForm(): Promise<void> {

    await FamilyMemberFormRef.current?.submitForm();

    if (!await FamilyMemberFormRef.current?.getErrors()) {
      setSubmitted(true)
      console.log(submitted)
    }
  }

  async function handleIcrement(): Promise<void> {

    if (counter === 12) return;

    const formData = FamilyMemberFormRef.current?.getData() as { age: string; gender: string; };
    if (formData?.age === '' || formData?.gender === '') {
      console.log('submit some data')
      addToast({
        type: 'error',
        title: 'Você precisa preencher os campos idade e gênero',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
      });
      return;
    }

    if (submitted) {
      setCounter(counter + 1);
      return;
    }

    await submitCurrentForm();

    if (Object.keys(FamilyMemberFormRef.current?.getErrors() || {}).length === 0) {
      setCounter(counter + 1);
    }
  }

  const handleFamilySubmit = useCallback(
    async (data: ICreateFamilyMemberDTO): Promise<void> => {
      try {
        FamilyMemberFormRef.current?.setErrors({});
        const validatedData = await FamilyMemberValidation.validate(data, {
          abortEarly: false,
        });

        const person_id = localStorage.getItem('@Safety:person_id');

        const familyMember = {
          person_id,
          ...validatedData,
        };

        console.log('familyMember', familyMember);

        const response = await api.post('/familymember', familyMember, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);

        setSubmitted(true);

        addToast({
          type: 'success',
          title: 'Membro da família adicionado com sucesso',
          description: 'Você já pode adicionar outra membro da família',
        });

      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          FamilyMemberFormRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Erro ao adicionar um membro da família',
            description: 'Ocorreu um erro ao adicionar um membro da família, tente novamente',
          });
        }
      }
    },
    [submitted, setSubmitted, addToast, token],
  );

  return (
    <>
      <Counters>
        <CounterButton onClick={handleIcrement}>+</CounterButton>
      </Counters>
      <StyledFamilyForm ref={FamilyMemberFormRef} onSubmit={handleFamilySubmit}>
        {listitems.map((item) => {
          return (
            <section key={`item${item}`}>
              <Label>
                <strong>{`Pessoa ${item}:`}</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="age"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="gender" options={genderOptions} />
              {item === listitems.length && <Button>Submit</Button>}

            </section>
          );
        })}
      </StyledFamilyForm>
    </>
  );

}

export default FamilyMemberForm;
