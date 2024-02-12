import React, { useRef, useCallback, useState } from 'react';
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
import ICreateOfflineInterviewDTO from '../../dtos/ICreateOfflineInterviewDTO';

import api from '../../../../services/api';

interface AddressFormProps {
  dispatch: Function;
  offline: boolean;
  isEditForm?: boolean;
  initialValues?: any;
  hasPreviousStepCompleted: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ dispatch, offline, isEditForm = false, initialValues = {}, hasPreviousStepCompleted = false }) => {

  const { addToast } = useToast();

  const { token } = useAuth();

  const AddressFormRef = useRef<FormHandles>(null);

  const [,setLoading] = useState<boolean>(false)


  const handleAddressSubmit = useCallback(async (data: ICreateAddressDTO) => {
    if (!hasPreviousStepCompleted) {
      addToast({
        type: 'error',
        title: 'Você ainda não enviou todos os formulários anteriores',
        description: '',
      });
      return
    }
    try {
      setLoading(true)
      AddressFormRef.current?.setErrors({});
      const validatedData = await AddressValidation.validate(data, {
        abortEarly: false,
      });

      if (!offline) {

        const household_id = localStorage.getItem('@Safety:household_id');

        const address = {
          household_id,
          ...validatedData,
        };

        const response = await api.post('/addresses', address, {
          headers: { Authorization: `Bearer ${token}` },
        });



        localStorage.setItem('@Safety:address_id', response.data.id);

        dispatch({ type: 'ADDRESS' });

        addToast({
          type: 'success',
          title: 'Endereço adicionado com sucesso',
          description: 'Você já pode preencher o formulário seguinte para concluir a entrevista.',
        });
      } else {

        const address = {
          ...validatedData,
        };

        const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-offline-interview-id') || "");

        const offlineInterviews: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

        const addAddress = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], address } } : false;

        if (addAddress) {
          localStorage.setItem(`@Safety:offline-interviews`, JSON.stringify(addAddress));

          dispatch({ type: 'ADDRESS', payload: { id: uniqueId } });

          addToast({
            type: 'success',
            title: 'Um endreço foi salvo com sucesso no modo offline!',
            description: 'Você já pode adicionar uma entrevista no modo Offline!',
          });
        } else {
          throw new Error('Você também precisa adicionar uma residência antes de um endereço no modo offline');
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        AddressFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Ocorreu um erro ao adicionar o endereço, tente novamente',
        });
      }
    } finally {
      setLoading(false)
    }
  }, [addToast, token, dispatch, offline, setLoading, hasPreviousStepCompleted]);

  if (isEditForm) {
    AddressFormRef.current?.setData({
      post_code: initialValues?.post_code,
      state: initialValues?.state,
      city: initialValues?.city,
      neighborhood: initialValues?.neighborhood,
      street_or_location: initialValues?.street_or_location,
      house_number: initialValues?.house_number,
      telephone_number: initialValues?.telephone_number,
    })
  }

  return (
    <StyledForm ref={AddressFormRef} onSubmit={handleAddressSubmit}>
      <section>
        <Input name="post_code" placeholder="Código Postal" icon={FiMail} />
        <Label>Estado da Federação</Label>
        <Select name="state" options={brazilStatesOptions} />
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
        {!isEditForm && <Button>Submit</Button>}
      </section>
    </StyledForm>

  );

}

export default AddressForm;
