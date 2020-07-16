import React, { useState, useRef, useCallback } from 'react';
import Select from '../../components/Select';
import CheckboxInput from '../../components/Checkbox';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Container,
  Header,
  SectionTitle,
  Counters,
  StyledFamilyForm,
  Section,
  CounterButton,
  Label,
  ResponsiveMenu,
} from './styles';
import {
  FiUser,
  FiUsers,
  FiDollarSign,
  FiMail,
  FiMap,
  FiSquare,
  FiCornerDownLeft,
  FiHome,
  FiPhoneCall,
  FiMenu,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ScrollSpy from '../../components/ScrollSpy';
import ICreatePersonDTO from './dtos/ICreatePersonDTO';
import ICreateFamilyMemberDTO from './dtos/ICreateFamilyMemberDTO';
import ICreateHouseholdDTO from './dtos/ICreateHouseholdDTO';
import ICreateAddressDTO from './dtos/ICreateAddressDTO';
import { PersonValidation } from './validation/schemas/PersonValidation';
import { HouseholdValidation } from './validation/schemas/HouseholdValidation';
import { AddressValidation } from './validation/schemas/AddressValidation';
import { FamilyMemberValidation } from './validation/schemas/FamilyMemberValidation';

import {
  genderOptions,
  raceOptions,
  maritalOptions,
  educationOptions,
  healthOptions,
  religionOptions,
  workOptions,
  drinkingWaterOptions,
  mainPersonOptions,
  typeOfResidenceOptions,
  brazilStatesOptions,
  locationOptions,
  relationMainPersonOptions,
  BathroomOptions,
  GarbageOptions,
  LiteracyOptions,
} from './questions/SelectorOptions/options';
import api from '../../services/api';

interface IUser {
  [key: string]: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const Interview: React.FC = () => {
  const PersonFormRef = useRef<FormHandles>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [family, setFamily] = useState(3);
  const [mainPerson, setMainPerson] = useState(false);
  const [urban, setUrban] = useState(false);
  // const [person_id, setPerson_id] = useState('');
  const [household_id, setHousehold_id] = useState('');
  const { user, token } = useAuth();

  const [counter, setCounter] = useState(1);

  let listitems: number[] = [];

  for (let i = 1; i <= counter; i++) {
    listitems.push(i);
  }

  const handlePersonSubmit = useCallback(async (data: ICreatePersonDTO) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  function handleIcrement(): void {
    if (counter === 12) return;
    setCounter(counter + 1);
  }

  function handleDecrement(): void {
    if (counter === 0) return;
    setCounter(counter - 1);
  }

  return (
    <Container>
      <Header>
        Safety <span>|</span> Interview
      </Header>
      <ResponsiveMenu>
        <FiMenu size={30} onClick={() => setMenuOpen(!menuOpen)} />
        <div>
          <ScrollSpy open={menuOpen} />
        </div>
      </ResponsiveMenu>
      <SectionTitle id="person">Pessoa</SectionTitle>
      <StyledForm ref={PersonFormRef} onSubmit={handlePersonSubmit}>
        <Section>
          <Input icon={FiUser} placeholder="Nome Completo" name="name" />

          <Input name="date_of_birth" type="date" />

          <Label>Gênero</Label>

          <Select name="gender" options={genderOptions} />
          <Label>Raça ou cor</Label>
          <Select name="race_color" options={raceOptions} />
        </Section>

        <Section>
          <Label>Religião</Label>
          <Select name="religion" options={religionOptions} />

          <Label>Estado Civil</Label>
          <Select name="marital_status" options={maritalOptions} />
          <Label>
            <span>Sabe ler e escrever?</span>
            <Select name="literacy" options={LiteracyOptions} />
          </Label>
        </Section>

        <Section>
          <Label>Escolaridade</Label>
          <Select name="education" options={educationOptions} />
          <Label>Situação de emprego</Label>
          <Select name="work_status" options={workOptions} />
          <Label>Situação de saúde</Label>
          <Select name="health_conditions" options={healthOptions} />
          <Button type="submit">Submit</Button>
        </Section>
      </StyledForm>
      <SectionTitle id="family">
        Membros da Família{' '}
        <Counters>
          <CounterButton onClick={handleIcrement}>+</CounterButton>
          <CounterButton onClick={handleDecrement}>-</CounterButton>
        </Counters>
      </SectionTitle>

      <StyledFamilyForm onSubmit={handleFamilySubmit}>
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

      <SectionTitle id="household">Residência</SectionTitle>

      <StyledForm onSubmit={handleHouseholdSubmit}>
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
              isDisabled={mainPerson}
            />
          </Label>
          <Label>Se não é, qual é a relação com a pessoa de referência?</Label>
          <Select
            name="relationship_to_main_person"
            options={relationMainPersonOptions}
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
              onChange={() => {}}
            />
          </Label>
          <Label>
            <span>Tem serviço de coleta de lixo?</span>
            <Select
              name="garbage_service"
              options={GarbageOptions}
              onChange={() => {}}
            />
          </Label>
          <Button>Submit</Button>
        </Section>
      </StyledForm>
      <SectionTitle id="address">Endereço</SectionTitle>
      <StyledForm onSubmit={handleAddressSubmit}>
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
    </Container>
  );
};

export default Interview;
