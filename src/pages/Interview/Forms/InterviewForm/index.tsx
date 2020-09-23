import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label,
  CheckBoxContainer
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
  interviewTypeOptions,
} from '../../questions/SelectorOptions/options';
import { useAuth } from '../../../../hooks/auth';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ICreateInterviewDTO from '../../dtos/ICreateInterviewDTO';
import { InterviewValidation } from '../../validation/schemas/InterviewValidation';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useToast } from '../../../../hooks/toast';
import CheckBoxInput from '../../../../components/Checkbox';
import api from '../../../../services/api';


const InterviewForm: React.FC = (props) => {

  const { addToast } = useToast();

  const { token } = useAuth();

  const InterviewFormRef = useRef<FormHandles>(null);


  /*   const handleAddressSubmit = useCallback(async (data: ICreateAddressDTO) => {
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
        const response = await api.post('/address', address, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);
        addToast({
          type: 'success',
          title: 'Endereço adicionado com sucesso',
          description: 'O formulário de pesquisa foi preenchido.',
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
   */
  return (
    <StyledForm ref={InterviewFormRef} onSubmit={() => { }}>
      <section>
        <Label>Nome do Projeto</Label>
        <Input name="project_name" placeholder="Nome do Projeto" defaultValue="PENSAN" />
        <Label>A entrevista foi concluída:</Label>

        <CheckBoxContainer>

          <CheckBoxInput
            name="is_complete"
            options={[{ id: 'completo', value: 'true', label: 'Completa e sem erros' }]}
          />
        </CheckBoxContainer>

        <Label>Qual a modalidade de entrevista?</Label>
        <Select name="interview_type" options={interviewTypeOptions} />
      </section>
      <section>
        <textarea name="comments" placeholder="Comentários sobre a entrevista" rows={10} style={{ width: 300, padding: 10 }}></textarea>
        <Button>Submit</Button>
      </section>

    </StyledForm>
  );

}

export default InterviewForm;
