import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  Container,
  Header,
  SectionTitle,
  ResponsiveMenu,
  SubmittedContainer,
  ButtonsContainer,
  OfflineLabel,
  ResetButton
} from './styles';
import {
  FiMenu,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Switch from "react-switch";
import logo from '../../assets/logo_transparent.png';
import ScrollSpy from '../../components/ScrollSpy';
import InterviewForm from './Forms/InterviewForm';
import PersonForm from './Forms/PersonForm';
/* import FamilyMemberForm from './Forms/FamilyMemberForm'; */
import HouseholdForm from './Forms/HouseholdForm';
import AddressForm from './Forms/AddressForm';
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';

interface StateFormat {
  formsSubmitted: {
    person:
    {
      id: string | null;
      show: boolean
    };
    household:
    {
      id: string | null;
      show: boolean;
    };
    address:
    {
      id: string | null;
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
    id: string | null;
    show: boolean;
  }
}

const initialState: StateFormat = {
  formsSubmitted: {
    person: {
      id: null,
      show: true,
    },
    household: {
      id: null,
      show: true,
    },
    address: {
      id: null,
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
      console.log('no payload', action?.payload?.id);
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

  const [isOffline, setIsOffline] = useState(false);



  const resetForms = useCallback(
    () => {
      localStorage.removeItem('@Safety:person_id');
      localStorage.removeItem('@Safety:household_id');
      localStorage.removeItem('@Safety:address_id');
      localStorage.removeItem('@Safety:current-offline-interview-id');
      window.location.reload();
    },
    [],
  )

  useEffect(() => {

    const person_id = localStorage.getItem('@Safety:person_id');
    const household_id = localStorage.getItem('@Safety:household_id');
    const address_id = localStorage.getItem('@Safety:address_id');

    const offline_id = JSON.parse(localStorage.getItem('@Safety:current-offline-interview-id')!);

    const offlineInterviews: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

    if (person_id) {
      dispatch({ type: 'PERSON', payload: { id: person_id, show: false } })
    } else if (offlineInterviews && offline_id) {
      if (offlineInterviews[offline_id]?.hasOwnProperty('person')) {
        dispatch({ type: 'PERSON', payload: { id: offline_id, show: false } })
      }
    }

    if (household_id) {
      dispatch({ type: 'HOUSEHOLD', payload: { id: household_id, show: false } })
    } else if (offlineInterviews && offline_id) {
      if (offlineInterviews[offline_id]?.hasOwnProperty('household')) {
        dispatch({ type: 'HOUSEHOLD', payload: { id: offline_id, show: false } })
      }
    }

    if (address_id) {
      dispatch({ type: 'ADDRESS', payload: { id: address_id, show: false } })
    } else if (offlineInterviews && offline_id) {
      if (offlineInterviews[offline_id]?.hasOwnProperty('address')) {
        dispatch({ type: 'ADDRESS', payload: { id: offline_id, show: false } })
      }
    }
  }, [dispatch])


  return (
    <Container offline={isOffline}>
      <Header>
        <Link to="/dashboard">
          <img src={logo} alt="Rede PenSSAN" />
        </Link>
        <div>
          PenSSAN <span>|</span> Entrevista
        </div>
        <ButtonsContainer>
          <OfflineLabel offline={isOffline}>Offline</OfflineLabel>
          <Switch onColor="#c2024b" offColor="#dedede" onChange={() => setIsOffline(!isOffline)!} checked={isOffline} />
          <ResetButton onClick={resetForms}>Reiniciar</ResetButton>
        </ButtonsContainer>
      </Header>

      <ResponsiveMenu>
        <FiMenu size={30} onClick={() => setMenuOpen(!menuOpen)} />
        <div>
          <ScrollSpy open={menuOpen} />
        </div>
      </ResponsiveMenu>

      <SectionTitle id="person">Dados Pessoais</SectionTitle>
      {formState.formsSubmitted.person.show ? (

        <PersonForm dispatch={dispatch} offline={isOffline} />) : null}
      {formState.formsSubmitted.person.id !== null ? <SubmittedContainer>Uma pessoa já foi adicionada</SubmittedContainer> : null}

      <SectionTitle id="household">Domicílio</SectionTitle>
      {formState.formsSubmitted.household.show ? (

        <HouseholdForm dispatch={dispatch} offline={isOffline} />) : null}
      {formState.formsSubmitted.household.id !== null ? <SubmittedContainer>Uma residência já foi criada</SubmittedContainer> : null}

      {/*       <SectionTitle id="family">
        Membros da Família
      </SectionTitle>

      <FamilyMemberForm /> */}
      <SectionTitle id="address">Endereço</SectionTitle>
      {formState.formsSubmitted.address.show ? (

        <AddressForm dispatch={dispatch} offline={isOffline} />) : null}
      {formState.formsSubmitted.address.id !== null ? <SubmittedContainer>Um endereço já foi criado</SubmittedContainer> : null}

      <SectionTitle id="interview">Entrevista</SectionTitle>
      {formState.formsSubmitted.interview.show ? (

        <InterviewForm dispatch={dispatch} offline={isOffline} />) : null}

    </Container>
  );
};

export default Interview;
