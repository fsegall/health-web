import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
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
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useToast } from '../../../../hooks/toast';

import api from '../../../../services/api';


const AddressForm: React.FC = (props) => {

  const { addToast } = useToast();

  const { token } = useAuth();

  const AddressFormRef = useRef<FormHandles>(null);


  const handleAddressSubmit = useCallback(async (data: ICreateAddressDTO) => {
    try {
      AddressFormRef.current?.setErrors({});
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
      const response = await api.post('/addresses', address, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response);

      localStorage.setItem('@Safety:address_id', response.data.id);
      addToast({
        type: 'success',
        title: 'Endereço adicionado com sucesso',
        description: 'Você já pode preencher o formulário seguinte para concluir a entrevista.',
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        AddressFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro ao adicionar endereço',
          description: 'Ocorreu um erro ao adicionar o endereço, tente novamente',
        });
      }
    }
  }, [addToast, token]);

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
