import React, { useState, useRef, useCallback } from 'react';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Section,
  Label
} from './styles';
import {
  FiDollarSign,
} from 'react-icons/fi';
import { useAuth } from '../../../../hooks/auth';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ICreateHouseholdDTO from '../../dtos/ICreateHouseholdDTO';
import { HouseholdValidation } from '../../validation/schemas/HouseholdValidation';

import {
  drinkingWaterOptions,
  mainPersonOptions,
  typeOfResidenceOptions,
  locationOptions,
  relationMainPersonOptions,
  BathroomOptions,
  GarbageOptions,
} from '../../questions/SelectorOptions/options';

import api from '../../../../services/api';


const HouseholdForm: React.FC = (props) => {

  const { token } = useAuth();

  const [mainPerson, setMainPerson] = useState(false);

  const HouseholdRef = useRef<FormHandles>(null);

  const handleHouseholdSubmit = useCallback(
    async (data: ICreateHouseholdDTO) => {
      try {
        const validatedData = await HouseholdValidation.validate(data, {
          abortEarly: false,
        });

        const person_id = localStorage.getItem('@Safety:person_id');

        const household = {
          person_id,
          ...validatedData,
        };

        console.log('household', household);

        const response = await api.post('/household', household, {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.setItem('@Safety:household_id', response.data.id);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  return (
    <StyledForm ref={HouseholdRef} onSubmit={handleHouseholdSubmit}>
      <Section>
        <Label>
          <span>Localização do domicílio</span>
          <Select name="location_of_residence" options={locationOptions} />
        </Label>
        <Label>
          <span>É a pessoa de referência da casa (chefe da casa)?</span>
          <Select
            name="household_main_person"
            options={mainPersonOptions}
            onChange={() => setMainPerson(!mainPerson)}
          />
        </Label>
        <Label>Se não é, qual é a relação com a pessoa de referência?</Label>
        <Select
          name="relationship_to_main_person"
          options={relationMainPersonOptions}
          isDisabled={mainPerson}
        />
      </Section>

      <Section>
        <Label>Tipo de residência</Label>
        <Select name="type_of_residence" options={typeOfResidenceOptions} />
        <Label>Tem acesso à água potável?</Label>
        <Select name="drinking_water" options={drinkingWaterOptions} />
        <Label></Label>
        <Input
          placeholder="Número de pessoas no domicílio"
          type="number"
          min="0"
          max="12"
          name="number_of_people_household"
        />
      </Section>

      <Section>
        <Input
          placeholder="Número de cômodos na casa"
          type="number"
          min="0"
          max="6"
          name="number_of_rooms"
        />

        <Input
          icon={FiDollarSign}
          placeholder="Renda familiar"
          name="family_income"
          type="number"
        />
        <Label>
          <span>Tem banheiro dentro de casa?</span>
          <Select
            name="bathroom_inside_house"
            options={BathroomOptions}
            onChange={() => { }}
          />
        </Label>
        <Label>
          <span>Tem serviço de coleta de lixo?</span>
          <Select
            name="garbage_service"
            options={GarbageOptions}
            onChange={() => { }}
          />
        </Label>
        <Button>Submit</Button>
      </Section>
    </StyledForm>
  );

}

export default HouseholdForm;


