import React, { useState } from 'react';
import {
  Container,
  Header,
  SectionTitle,
  ResponsiveMenu,
} from './styles';
import {
  FiMenu,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import ScrollSpy from '../../components/ScrollSpy';

import PersonForm from './Forms/PersonForm';
/* import FamilyMemberForm from './Forms/FamilyMemberForm'; */
import HouseholdForm from './Forms/HouseholdForm';
import AddressForm from './Forms/AddressForm';

const Interview: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);

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

      <SectionTitle id="household">Residência</SectionTitle>

      <HouseholdForm />

      {/*       <SectionTitle id="family">
        Membros da Família
      </SectionTitle>

      <FamilyMemberForm /> */}

      <SectionTitle id="address">Endereço</SectionTitle>

      <AddressForm />

    </Container>
  );
};

export default Interview;
