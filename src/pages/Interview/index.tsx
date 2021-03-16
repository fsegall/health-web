import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  Container,
  Header,
  SectionTitle,
  ResponsiveMenu,
  SubmittedContainer,
  ResetButton
} from './styles';
import {
  FiMenu,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import ScrollSpy from '../../components/ScrollSpy';
/* import ProjectForm from './Forms/ProjectForm'; */
import InterviewForm from './Forms/InterviewForm';
import PersonForm from './Forms/PersonForm';
/* import FamilyMemberForm from './Forms/FamilyMemberForm'; */
import HouseholdForm from './Forms/HouseholdForm';
import AddressForm from './Forms/AddressForm';

interface StateFormat {
  formsSubmitted: {
    person:
    {
      id: string;
      show: boolean
    };
    household:
    {
      id: string;
      show: boolean;
    };
    address:
    {
      id: string;
      show: boolean;
    };
    interview
    : {
      show: boolean;
    };
  }
}

interface FormActionFormat {
  type: string;
  payload: {
    id: string;
    show: boolean;
  }
}

const initialState: StateFormat = {
  formsSubmitted: {
    person: {
      id: '',
      show: true,
    },
    household: {
      id: '',
      show: true,
    },
    address: {
      id: '',
      show: true,
    },
    interview: {
      show: true,
    },
  }
}

function reducer(state: StateFormat, action: FormActionFormat) {
  switch (action.type) {
    case 'PERSON':
      return { formsSubmitted: { ...state.formsSubmitted, person: { id: action?.payload?.id, show: false } } };
    case 'HOUSEHOLD':
      return { formsSubmitted: { ...state.formsSubmitted, household: { id: action?.payload?.id, show: false } } };
    case 'ADDRESS':
      return { formsSubmitted: { ...state.formsSubmitted, address: { id: action?.payload?.id, show: false } } };
    case 'INTERVIEW':
      return { ...initialState };
    default:
      return state;
  }
}

const Interview: React.FC = () => {

  const [formState, dispatch] = useReducer(reducer, initialState);

  const [menuOpen, setMenuOpen] = useState(false);



  const resetForms = useCallback(
    () => {
      localStorage.removeItem('@Safety:person_id');
      localStorage.removeItem('@Safety:household_id');
      localStorage.removeItem('@Safety:address_id');
      window.location.reload();
    },
    [],
  )

  useEffect(() => {

    const person_id = localStorage.getItem('@Safety:person_id');
    const household_id = localStorage.getItem('@Safety:household_id');
    const address_id = localStorage.getItem('@Safety:address_id');

    if (person_id) {
      dispatch({ type: 'PERSON', payload: { id: person_id, show: false } })
    }

    if (household_id) {
      dispatch({ type: 'HOUSEHOLD', payload: { id: household_id, show: false } })
    }

    if (address_id) {
      dispatch({ type: 'ADDRESS', payload: { id: address_id, show: false } })
    }
  }, [dispatch])


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

      <ResetButton onClick={resetForms}>Reiniciar</ResetButton>
      <SectionTitle id="person">Dados Pessoais</SectionTitle>
      {formState.formsSubmitted.person.show ? (

        <PersonForm dispatch={dispatch} />) : null}
      {formState.formsSubmitted.person.id !== '' ? <SubmittedContainer>Uma pessoa já foi criada</SubmittedContainer> : null}

      <SectionTitle id="household">Domicílio</SectionTitle>
      {formState.formsSubmitted.household.show ? (

        <HouseholdForm dispatch={dispatch} />) : null}
      {formState.formsSubmitted.household.id !== '' ? <SubmittedContainer>Uma residência já foi criada</SubmittedContainer> : null}

      {/*       <SectionTitle id="family">
        Membros da Família
      </SectionTitle>

      <FamilyMemberForm /> */}
      <SectionTitle id="address">Endereço</SectionTitle>
      {formState.formsSubmitted.address.show ? (

        <AddressForm dispatch={dispatch} />) : null}
      {formState.formsSubmitted.address.id !== '' ? <SubmittedContainer>Um endereço já foi criado</SubmittedContainer> : null}

      <SectionTitle id="interview">Entrevista</SectionTitle>
      {formState.formsSubmitted.interview.show ? (

        <InterviewForm dispatch={dispatch} />) : null}

    </Container>
  );
};

export default Interview;
