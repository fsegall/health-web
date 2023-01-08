import React, { useState, useCallback, useReducer, useEffect } from 'react';
import {
  Container,
  Header,
  SectionTitle,
  ButtonsContainer,
  OfflineLabel,
  ResetButton,
  SubmittedContainer,
} from './styles';
import { Link, useParams } from 'react-router-dom';
import Switch from "react-switch";
import logo from '../../assets/logo_transparent.png';
import InformacoesBasicasForm from './Forms/InformacoesBasicasForm';
import DemograficoForm from './Forms/DemograficoForm';
import DomiciliosForm from './Forms/DomicilioForm';
import SaudeDoencaForm from './Forms/SaudeDoencaForm';
import AlimentacaoNutricaoForm from './Forms/AlimentacaoNutricaoForm';
import ApoioProtecaoSocialForm from './Forms/ApoioProtecaoSocialForm';
import ICreateIndigenousOfflineInterviewDTO from './dtos/ICreateIndigenousOfflineInterviewDTO';
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';

interface StateFormat {
  formsSubmitted: {
    indigenous_informacoes_basicas:
    {
      id: string | null;
      show: boolean
    };
    indigenous_demografico:
    {
      id: string | null;
      show: boolean;
    };
    indigenous_domicilio:
    {
      id: string | null;
      show: boolean;
    };
    indigenous_saude_doenca:
    {
      id: string | null;
      show: boolean;
    };
    indigenous_alimentacao_nutricao:
    {
      id: string | null;
      show: boolean;
    };
    indigenous_apoio_protecao_social:
    {
      id: string | null;
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
    indigenous_informacoes_basicas: {
      id: localStorage.getItem('@Safety:indigenous_informacoes_basicas') ?? null,
      show: true,
    },
    indigenous_demografico: {
      id: localStorage.getItem('@Safety:indigenous_demografico') ?? null,
      show: true,
    },
    indigenous_domicilio: {
      id: localStorage.getItem('@Safety:indigenous_domicilio') ?? null,
      show: true,
    },
    indigenous_saude_doenca: {
      id: localStorage.getItem('@Safety:indigenous_saude_doenca') ?? null,
      show: true,
    },
    indigenous_alimentacao_nutricao: {
      id: localStorage.getItem('@Safety:indigenous_alimentacao_nutricao') ?? null,
      show: true,
    },
    indigenous_apoio_protecao_social: {
      id: localStorage.getItem('@Safety:indigenous_apoio_protecao_social') ?? null,
      show: true,
    },
  }
}

function reducer(state: StateFormat, action: FormActionFormat) {
  switch (action.type) {
    case 'INFORMACOES_BASICAS':
      return { formsSubmitted: { ...state.formsSubmitted, indigenous_informacoes_basicas: { id: action?.payload?.id, show: false } } };
    case 'DEMOGRAFICO':
      return { formsSubmitted: { ...state.formsSubmitted, indigenous_demografico: { id: action?.payload?.id, show: false } } };
    case 'DOMICILIO':
      return { formsSubmitted: { ...state.formsSubmitted, indigenous_domicilio: { id: action?.payload?.id, show: false } } };
    case 'SAUDE_DOENCA':
      return { formsSubmitted: { ...state.formsSubmitted, indigenous_saude_doenca: { id: action?.payload?.id, show: false } } };
    case 'ALIMENTACAO_NUTRICAO':
      return { formsSubmitted: { ...state.formsSubmitted, indigenous_alimentacao_nutricao: { id: action?.payload?.id, show: false } } };
    case 'APOIO_PROTECAO_SOCIAL':
      return { formsSubmitted: { ...state.formsSubmitted, indigenous_apoio_protecao_social: { id: action?.payload?.id, show: false } } };
    case 'INTERVIEW':
      return { ...initialState };
    default:
      return state;
  }
}

const IndigenousInterview: React.FC = () => {
    //@ts-ignore
    const params: any = useParams();
    const id = params?.id || null

    const [initialValues, setInitialValues] = useState<any>(null)
    const [formState, dispatch] = useReducer(reducer, initialState);
    const [isOffline, setIsOffline] = useState(localStorage.getItem('@Safety:current-indigenous-offline-interview-id') ? true : false);


    useEffect(() => {
      function handleInitialData(id: string) {
        const offlineData: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');

        const response = offlineData[id]

        if (response) {
          setIsOffline(true)
          setInitialValues(response)
        }
      }

      if (id !== undefined) {
        handleInitialData(id)
      }
    }, [id])

    const resetForms = useCallback(
        () => {
          localStorage.removeItem('@Safety:indigenous_informacoes_basicas');
          localStorage.removeItem('@Safety:indigenous_demografico');
          localStorage.removeItem('@Safety:indigenous_domicilio');
          localStorage.removeItem('@Safety:indigenous_saude_doenca');
          localStorage.removeItem('@Safety:indigenous_alimentacao_nutricao');
          localStorage.removeItem('@Safety:indigenous_apoio_protecao_social');
          localStorage.removeItem('@Safety:current-indigenous-offline-interview-id');
          window.location.reload();
        },
        [],
    )


    useEffect(() => {
      if (!id) {
        const indigenous_informacoes_basicas_id = localStorage.getItem('@Safety:indigenous_informacoes_basicas');
        const demografico = localStorage.getItem('@Safety:indigenous_demografico');
        const domicilio = localStorage.getItem('@Safety:indigenous_domicilio');
        const saude_doenca = localStorage.getItem('@Safety:indigenous_saude_doenca');
        const alimentacao_nutricao = localStorage.getItem('@Safety:indigenous_alimentacao_nutricao');
        const apoio_protecao_social = localStorage.getItem('@Safety:indigenous_apoio_protecao_social');

        const offline_id = JSON.parse(localStorage.getItem('@Safety:current-indigenous-offline-interview-id')!);

        const offlineInterviews: { [key: string]: ICreateIndigenousOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');


        if (indigenous_informacoes_basicas_id) {
          dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: indigenous_informacoes_basicas_id, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('indigenous_informacoes_basicas')) {
            dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: offline_id, show: false } })
          }
        }

        if (demografico) {
          dispatch({ type: 'DEMOGRAFICO', payload: { id: demografico, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('indigenous_demografico')) {
            dispatch({ type: 'DEMOGRAFICO', payload: { id: offline_id, show: false } })
          }
        }

        if (domicilio) {
          dispatch({ type: 'DOMICILIO', payload: { id: domicilio, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('indigenous_domicilio')) {
            dispatch({ type: 'DOMICILIO', payload: { id: offline_id, show: false } })
          }
        }

        if (saude_doenca) {
          dispatch({ type: 'SAUDE_DOENCA', payload: { id: saude_doenca, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('indigenous_saude_doenca')) {
            dispatch({ type: 'SAUDE_DOENCA', payload: { id: offline_id, show: false } })
          }
        }

        if (alimentacao_nutricao) {
          dispatch({ type: 'ALIMENTACAO_NUTRICAO', payload: { id: alimentacao_nutricao, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('indigenous_alimentacao_nutricao')) {
            dispatch({ type: 'ALIMENTACAO_NUTRICAO', payload: { id: offline_id, show: false } })
          }
        }

        if (apoio_protecao_social) {
          dispatch({ type: 'APOIO_PROTECAO_SOCIAL', payload: { id: apoio_protecao_social, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('indigenous_apoio_protecao_social')) {
            dispatch({ type: 'APOIO_PROTECAO_SOCIAL', payload: { id: offline_id, show: false } })
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
            PenSSAN <span>|</span> Entrevista Indígena
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
        <SectionTitle id="indigenous_informacoes_basicas">Informações Básicas</SectionTitle>
        {(id || formState.formsSubmitted.indigenous_informacoes_basicas.show) ? (
          <InformacoesBasicasForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            offlineId={id}
            initialValues={initialValues ? initialValues?.indigenous_informacoes_basicas : {}}
          />
        ) : <SubmittedContainer>Módulo informações básicas já cadastrado</SubmittedContainer>}
        <SectionTitle id="indigenous_demografico">Demográfico</SectionTitle>
        {!id && formState.formsSubmitted.indigenous_demografico.show ? (
          <DemograficoForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.indigenous_demografico : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
            hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_informacoes_basicas.show}
          />
        ) : <SubmittedContainer>Módulo demográfico já cadastrado</SubmittedContainer>}
        <SectionTitle id="indigenous_domicilio">Domicílio</SectionTitle>
        {!id && formState.formsSubmitted.indigenous_domicilio.show ? (
          <DomiciliosForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.domicilio : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
            hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_demografico.show}
          />
        ) : <SubmittedContainer>Módulo domicílio já cadastrado</SubmittedContainer>}
        <SectionTitle id="indigenous_saude_doenca">Saúde e Doença</SectionTitle>
        {!id && formState.formsSubmitted.indigenous_saude_doenca.show ? (
          <SaudeDoencaForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.indigenous_saude_doenca : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
            hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_domicilio.show}
          />
        ) : <SubmittedContainer>Módulo saúde e doença já cadastrado</SubmittedContainer>}
        <SectionTitle id="indigenous_alimentacao_nutricao">Alimentação e Nutrição</SectionTitle>
        {!id && formState.formsSubmitted.indigenous_alimentacao_nutricao.show ? (
          <AlimentacaoNutricaoForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.indigenous_alimentacao_nutricao : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
            hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_saude_doenca.show}
          />
        ) : <SubmittedContainer>Módulo alimentação e nutrição já cadastrado</SubmittedContainer>}
        <SectionTitle id="indigenous_apoio_protecao_social">Apoio e Proteção Social</SectionTitle>
        {!id && formState.formsSubmitted.indigenous_apoio_protecao_social.show ? (
          <ApoioProtecaoSocialForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.indigenous_apoio_protecao_social : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
            hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_alimentacao_nutricao.show}
          />
        ) : <SubmittedContainer>Módulo apoio social já cadastrado</SubmittedContainer>}
        </Container>
    )
}

export default IndigenousInterview;
