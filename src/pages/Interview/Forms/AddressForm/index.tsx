import React, { useState, useRef, useCallback } from 'react';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label
} from './styles';
import {
  FiMail,
  FiMap,
  FiSquare,
  FiCornerDownLeft,
  FiHome,
  FiPhoneCall,
} from 'react-icons/fi';
import {
  brazilStatesOptions,
} from '../../questions/SelectorOptions/options';
import { useAuth } from '../../../../hooks/auth';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ICreateAddressDTO from '../../dtos/ICreateAddressDTO';
import { AddressValidation } from '../../validation/schemas/AddressValidation';


import api from '../../../../services/api';


const AddressForm: React.FC = (props) => {



  const { token } = useAuth();

  const AddressFormRef = useRef<FormHandles>(null);


  const handleAddressSubmit = useCallback(async (data: ICreateAddressDTO) => {
    try {
      const validatedData = await AddressValidation.validate(data, {
        abortEarly: false,
      });

      const household_id = localStorage.getItem('@Safety:household_id');
      const address = {
        household_id,
        ...validatedData,
      };
      console.log('address', address);

      console.log('token', token);
      const response = await api.post('/address', address, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <StyledForm ref={AddressFormRef} onSubmit={handleAddressSubmit}>
      <section>
        <Input name="post_code" placeholder="Código Postal" icon={FiMail} />
        <Label>Estado da Federação</Label>
        <Select name="state" options={brazilStatesOptions} id="state" />
      </section>
      <section>
        <Input name="city" placeholder="Cidade" icon={FiMap} />
        <Input name="neighborhood" placeholder="Bairro" icon={FiSquare} />
        <Input
          name="street_or_location"
          placeholder="Rua ou localização"
          icon={FiCornerDownLeft}
        />
      </section>
      <section>
        <Input
          icon={FiHome}
          placeholder="Número da casa"
          name="house_number"
          type="number"
        />
        <Input
          icon={FiPhoneCall}
          placeholder="Número de telefone"
          name="telephone_number"
        />
        <Button>Submit</Button>
      </section>
    </StyledForm>

  );

}

export default AddressForm;
