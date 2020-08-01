import React, { useState, useRef, useCallback } from 'react';
import Select from '../../../../components/Select';
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

import api from '../../../../services/api';


const FamilyMemberForm: React.FC = (props) => {

  const [family, setFamily] = useState(3);

  const [counter, setCounter] = useState(1);

  let listitems: number[] = [];

  for (let i = 1; i <= counter; i++) {
    listitems.push(i);
  }

  const { user, token } = useAuth();

  const FamilyMemberFormRef = useRef<FormHandles>(null);

  function handleIcrement(): void {
    if (counter === 12) return;
    setCounter(counter + 1);
  }

  function handleDecrement(): void {
    if (counter === 0) return;
    setCounter(counter - 1);
  }

  const handleFamilySubmit = useCallback(
    async (data: ICreateFamilyMemberDTO) => {
      try {
        const validatedData = await FamilyMemberValidation.validate(data, {
          abortEarly: false,
        });

        const person_id = localStorage.getItem('@Safety:person_id');

        const familyMember = {
          person_id,
          ...validatedData,
        };

        console.log('familyMember', familyMember);

        console.log('token', token);
        const response = await api.post('/familymember', familyMember, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );


  return (
    <>
      <Counters>
        <CounterButton onClick={handleIcrement}>+</CounterButton>
        <CounterButton onClick={handleDecrement}>-</CounterButton>
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
