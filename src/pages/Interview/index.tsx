import React, { useState, useRef, useCallback } from 'react';
import Select from '../../components/Select';

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
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ScrollSpy from '../../components/ScrollSpy';

import ICreateFamilyMemberDTO from './dtos/ICreateFamilyMemberDTO';
import ICreateHouseholdDTO from './dtos/ICreateHouseholdDTO';
import ICreateAddressDTO from './dtos/ICreateAddressDTO';

import { HouseholdValidation } from './validation/schemas/HouseholdValidation';
import { AddressValidation } from './validation/schemas/AddressValidation';
import { FamilyMemberValidation } from './validation/schemas/FamilyMemberValidation';
import PersonForm from './Forms/PersonForm'
import {
  genderOptions,
  drinkingWaterOptions,
  mainPersonOptions,
  typeOfResidenceOptions,
  brazilStatesOptions,
  locationOptions,
  relationMainPersonOptions,
  BathroomOptions,
  GarbageOptions,
} from './questions/SelectorOptions/options';
import api from '../../services/api';

const Interview: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [family, setFamily] = useState(3);
  const [mainPerson, setMainPerson] = useState(false);
  const [urban, setUrban] = useState(false);

  const [household_id, setHousehold_id] = useState('');
  const { user, token } = useAuth();

  const [counter, setCounter] = useState(1);

  let listitems: number[] = [];

  for (let i = 1; i <= counter; i++) {
    listitems.push(i);
  }

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
        <div>
          Safety <span>|</span> Interview
        </div>
        <Link to="/dashboard">Dashboard</Link>
      </Header>

      <ResponsiveMenu>
        <FiMenu size={30} onClick={() => setMenuOpen(!menuOpen)} />
        <div>
          <ScrollSpy open={menuOpen} />
        </div>
      </ResponsiveMenu>
      <SectionTitle id="person">Pessoa</SectionTitle>
      <PersonForm />

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
