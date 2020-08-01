import React, { useState, useRef, useCallback } from 'react';
import Select from '../../components/Select';

import {
  StyledForm,
  Container,
  Header,
  SectionTitle,
  Label,
  ResponsiveMenu,
} from './styles';
import {
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


import ICreateAddressDTO from './dtos/ICreateAddressDTO';

import { AddressValidation } from './validation/schemas/AddressValidation';



import PersonForm from './Forms/PersonForm'
import FamilyMemberForm from './Forms/FamilyMemberForm'
import HouseholdForm from './Forms/HouseholdForm'

import {

  brazilStatesOptions,

} from './questions/SelectorOptions/options';
import api from '../../services/api';
import { HouseholdValidation } from './validation/schemas/HouseholdValidation';

const Interview: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const { token } = useAuth();

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
        Membros da Família
      </SectionTitle>

      <FamilyMemberForm />

      <SectionTitle id="household">Residência</SectionTitle>

      <HouseholdForm />

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
