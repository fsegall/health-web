import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  Container,
  Header,
  SectionTitle,
  SubmittedContainer,
  ButtonsContainer,
  OfflineLabel,
  ResetButton,
  EditInterviewCard
} from './styles';
import { Link, useParams } from 'react-router-dom';
import Switch from "react-switch";
import logo from '../../assets/logo_transparent.png';
import InterviewForm from './Forms/InterviewForm';
import PersonForm from './Forms/PersonForm';
import HouseholdForm from './Forms/HouseholdForm';
import AddressForm from './Forms/AddressForm';
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

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
  //@ts-ignore
  const { id } = useParams();
  const { token } = useAuth();
  const [initialValues, setInitialValues] = useState<any>({})

  useEffect(() => {
    async function handleInitialData(id: string) {
      try {
        const response = await api.get(`/interviews/get-one/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
          }
        })
        if (response?.data) {
          setInitialValues(response?.data)
        }
      } catch(err) {
        console.log('error ', err)
      }
    }
    if (id) {
      handleInitialData(id)
    }
  }, [id])

  const [formState, dispatch] = useReducer(reducer, initialState);

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

    if (!id) {
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
    }
  }, [dispatch, id])

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
          {!initialValues?.project_name && (
              <>
              <OfflineLabel offline={isOffline}>{isOffline ? 'Offline' : 'Online'}</OfflineLabel>
              <Switch onColor="#c2024b" offColor="#dedede" onChange={() => setIsOffline(!isOffline)!} checked={isOffline} />
              <ResetButton onClick={resetForms}>Reiniciar</ResetButton>
              </>
            )}
          </ButtonsContainer>
      </Header>

      {initialValues?.project_name && (
        <EditInterviewCard>
          <p>{initialValues?.interviewer?.organization_name} | {initialValues?.project_name} | {initialValues?.interviewer?.name}</p>
          <p>{new Date(initialValues?.created_at)?.toLocaleDateString()}</p>
        </EditInterviewCard>
      )}

      <SectionTitle id="person">Dados Pessoais</SectionTitle>
      {formState.formsSubmitted.person.show && (
        <PersonForm
          dispatch={dispatch}
          isEditForm={id ? true : false}
          offline={isOffline}
          initialValues={initialValues ? initialValues?.person : {}}
        />
      )}
      {formState.formsSubmitted.person.id !== null && (
        <SubmittedContainer>Uma pessoa já foi adicionada</SubmittedContainer>
      )}
      <SectionTitle id="household">Domicílio</SectionTitle>
      {formState.formsSubmitted.household.show && (
        <HouseholdForm
          dispatch={dispatch}
          isEditForm={id ? true : false}
          initialValues={initialValues ? initialValues?.household : {}}
          offline={isOffline}
        />
      )}
      {formState.formsSubmitted.household.id !== null && (
        <SubmittedContainer>Uma residência já foi criada</SubmittedContainer>
      )}

      {/*       <SectionTitle id="family">
        Membros da Família
      </SectionTitle>

      <FamilyMemberForm /> */}
      <SectionTitle id="address">Endereço</SectionTitle>
      {formState.formsSubmitted.address.show && (
        <AddressForm
          dispatch={dispatch}
          isEditForm={id ? true : false}
          initialValues={initialValues ? initialValues?.address : {}}
          offline={isOffline}
        />
      )}
      {formState.formsSubmitted.address.id !== null && (
        <SubmittedContainer>Um endereço já foi criado</SubmittedContainer>
      )}
      <SectionTitle id="interview">Entrevista</SectionTitle>
      {formState.formsSubmitted.interview.show && (
        <InterviewForm
          dispatch={dispatch}
          isEditForm={id ? true : false}
          initialValues={initialValues ? initialValues : {}}
          offline={isOffline}
        />
      )}

    </Container>
  );
};

export default Interview;
