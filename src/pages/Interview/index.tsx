import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  Container,
  Header,
  SectionTitle,
  SubmittedContainer,
  ButtonsContainer,
  OfflineLabel,
  ResetButton,
  EditInterviewCard,
  SectionTitleGroup
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
import DiscriminationForm from './Forms/DiscriminationForm';
import MentalHealthForm from './Forms/MentalHealthForm';
import ViolenceForm from './Forms/ViolenceForm';

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
    health_module:
    {
      id: string | null;
      show: boolean;
    };
    discrimination:
    {
      id: string | null;
      show: boolean;
    };
    violence:
    {
      id: string | null;
      show: boolean;
    };
    mental_health:
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
    health_module: {
      id: null,
      show: true,
    },
    discrimination: {
      id: null,
      show: true,
    },
    violence: {
      id: null,
      show: true,
    },
    mental_health: {
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
    case 'HEALTH_MODULE':
      const isHidding = action?.payload?.show === false
      if (isHidding) {
        localStorage.setItem('@Safety:hide_health_module', 'true');
      } else {
        localStorage.setItem('@Safety:hide_health_module', 'false');
      }
      return { formsSubmitted: { ...state.formsSubmitted, health_module: { id: null, show: action?.payload?.show } } };
    case 'DISCRIMINATION':
      return { formsSubmitted: { ...state.formsSubmitted, discrimination: { id: action?.payload?.id, show: action?.payload?.show } } };
    case 'VIOLENCE':
      return { formsSubmitted: { ...state.formsSubmitted, violence: { id: action?.payload?.id, show: action?.payload?.show } } };
    case 'MENTAL_HEALTH':
      return { formsSubmitted: { ...state.formsSubmitted, mental_health: { id: action?.payload?.id, show: action?.payload?.show } } };
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
  }, [id, token])

  const [formState, dispatch] = useReducer(reducer, initialState);

  const [isOffline, setIsOffline] = useState(false);

  const resetForms = useCallback(
    () => {
      localStorage.removeItem('@Safety:person_id');
      localStorage.removeItem('@Safety:household_id');
      localStorage.removeItem('@Safety:address_id');
      localStorage.removeItem('@Safety:discrimination_id');
      localStorage.removeItem('@Safety:violence_id');
      localStorage.removeItem('@Safety:mental_health_id');
      localStorage.removeItem('@Safety:current-offline-interview-id');
      localStorage.removeItem('@Safety:hide_health_module');
      localStorage.removeItem('@Safety:discrimination_form_sent');
      window.location.reload();
    },
    [],
  )

  useEffect(() => {

    if (!id) {
      const person_id = localStorage.getItem('@Safety:person_id');
      const household_id = localStorage.getItem('@Safety:household_id');
      const address_id = localStorage.getItem('@Safety:address_id');
      const discrimination_id = localStorage.getItem('@Safety:discrimination_id');
      const violence_id = localStorage.getItem('@Safety:violence_id');
      const mental_health_id = localStorage.getItem('@Safety:mental_health_id');

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

      if (discrimination_id) {
        dispatch({ type: 'DISCRIMINATION', payload: { id: discrimination_id, show: false } })
      } else if (offlineInterviews && offline_id) {
        if (offlineInterviews[offline_id]?.hasOwnProperty('discrimination')) {
          dispatch({ type: 'DISCRIMINATION', payload: { id: offline_id, show: false } })
        }
      }

      if (violence_id) {
        dispatch({ type: 'VIOLENCE', payload: { id: violence_id, show: false } })
      } else if (offlineInterviews && offline_id) {
        if (offlineInterviews[offline_id]?.hasOwnProperty('violence')) {
          dispatch({ type: 'VIOLENCE', payload: { id: offline_id, show: false } })
        }
      }

      if (mental_health_id) {
        dispatch({ type: 'MENTAL_HEALTH', payload: { id: mental_health_id, show: false } })
      } else if (offlineInterviews && offline_id) {
        if (offlineInterviews[offline_id]?.hasOwnProperty('mental_health')) {
          dispatch({ type: 'MENTAL_HEALTH', payload: { id: offline_id, show: false } })
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
          hasPreviousStepCompleted={formState.formsSubmitted.person.id ? true : false}
        />
      )}
      {formState.formsSubmitted.household.id !== null && (
        <SubmittedContainer>Uma residência já foi criada</SubmittedContainer>
      )}
      <SectionTitleGroup>
        <SectionTitle id="health_module">Qualidade de Vida</SectionTitle>
        <Switch
          onColor="#c2024b" offColor="#dedede"
          onChange={() => {
            const discriminationFormID = localStorage.getItem('@Safety:discrimination_form_sent')
            if (!discriminationFormID) {
            const healthModuleShow = formState.formsSubmitted.health_module.show
              dispatch({ type: 'HEALTH_MODULE', payload: { id: null, show: !healthModuleShow } })
              const showDiscrimination = formState.formsSubmitted.discrimination.show
              const discriminationId = formState.formsSubmitted.discrimination.id
              dispatch({ type: 'DISCRIMINATION', payload: { id: formState.formsSubmitted.discrimination.id, show: discriminationId ? false : !showDiscrimination } })
              const showViolence = formState.formsSubmitted.violence.show
              const violenceId = formState.formsSubmitted.violence.id
              dispatch({ type: 'VIOLENCE', payload: { id: violenceId, show: violenceId ? false : !showViolence} })
              const mentalHealthId = formState.formsSubmitted.mental_health.id
              const showMentalHealth = formState.formsSubmitted.mental_health.show
              dispatch({ type: 'MENTAL_HEALTH', payload: { id: mentalHealthId, show: mentalHealthId ? false : !showMentalHealth } })
            }
            }} checked={formState.formsSubmitted.health_module.show}
        />
      </SectionTitleGroup>
      <SectionTitleGroup>
        <SectionTitle id="discrimination">Discriminação</SectionTitle>
      </SectionTitleGroup>
      {formState.formsSubmitted.discrimination.show && (
        <DiscriminationForm
          dispatch={dispatch}
          isEditForm={id ? true : false}
          offline={isOffline}
          initialValues={initialValues ? initialValues?.discrimination : {}}
          hasPreviousStepCompleted={formState.formsSubmitted.household.id ? true : false}
        />
      )}
      <SectionTitleGroup>
        <SectionTitle id="violence">Violência</SectionTitle>
      </SectionTitleGroup>
      {formState.formsSubmitted.violence.show && (
        <ViolenceForm
          dispatch={dispatch}
          isEditForm={id ? true : false}
          offline={isOffline}
          initialValues={initialValues ? initialValues?.violence : {}}
          hasPreviousStepCompleted={formState.formsSubmitted.discrimination.id ? true : false}
        />
      )}
      <SectionTitleGroup>
        <SectionTitle id="mental_health">Saúde Mental e Estresse</SectionTitle>
      </SectionTitleGroup>
      {formState.formsSubmitted.mental_health.show && (
        <MentalHealthForm
          dispatch={dispatch}
          isEditForm={id ? true : false}
          offline={isOffline}
          initialValues={initialValues ? initialValues?.mental_health : {}}
          hasPreviousStepCompleted={formState.formsSubmitted.violence.id ? true : false}
        />
      )}
      <SectionTitle id="address">Endereço</SectionTitle>
      {formState.formsSubmitted.address.show && (
        <AddressForm
          dispatch={dispatch}
          isEditForm={id ? true : false}
          initialValues={initialValues ? initialValues?.address : {}}
          offline={isOffline}
          hasPreviousStepCompleted={formState.formsSubmitted.health_module.show ? (formState.formsSubmitted.mental_health.id ? true : false) : (formState.formsSubmitted.household.id ? true : false)}
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
          hasPreviousStepCompleted={formState.formsSubmitted.address.id !== null ? true : false}
        />
      )}

    </Container>
  );
};

export default Interview;
