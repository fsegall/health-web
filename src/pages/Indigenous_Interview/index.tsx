import React, { useState, useCallback, useReducer, useEffect } from 'react';
import {
  Container,
  Header,
  SectionTitle,
  ButtonsContainer,
  OfflineLabel,
  ResetButton,
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

interface StateFormat {
  formsSubmitted: {
    informacoes_basicas:
    {
      id: string | null;
      show: boolean
    };
    demografico:
    {
      id: string | null;
      show: boolean;
    };
    domicilio:
    {
      id: string | null;
      show: boolean;
    };
    saude_doenca:
    {
      id: string | null;
      show: boolean;
    };
    alimentacao_nutricao:
    {
      id: string | null;
      show: boolean;
    };
    apoio_protecao_social:
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
    informacoes_basicas: {
      id: localStorage.getItem('@Safety:indigenous_informacoes_basicas') ?? null,
      show: true,
    },
    demografico: {
      id: localStorage.getItem('@Safety:indigenous_demografico') ?? null,
      show: true,
    },
    domicilio: {
      id: localStorage.getItem('@Safety:indigenous_domicilio') ?? null,
      show: true,
    },
    saude_doenca: {
      id: localStorage.getItem('@Safety:indigenous_saude_doenca') ?? null,
      show: true,
    },
    alimentacao_nutricao: {
      id: localStorage.getItem('@Safety:indigenous_alimentacao_nutricao') ?? null,
      show: true,
    },
    apoio_protecao_social: {
      id: localStorage.getItem('@Safety:indigenous_apoio_protecao_social') ?? null,
      show: true,
    },
  }
}

function reducer(state: StateFormat, action: FormActionFormat) {
  switch (action.type) {
    case 'INFORMACOES_BASICAS':
      return { formsSubmitted: { ...state.formsSubmitted, informacoes_basicas: { id: action?.payload?.id, show: false } } };
    case 'DEMOGRAFICO':
      return { formsSubmitted: { ...state.formsSubmitted, demografico: { id: action?.payload?.id, show: false } } };
    case 'DOMICILIO':
      return { formsSubmitted: { ...state.formsSubmitted, domicilio: { id: action?.payload?.id, show: false } } };
    case 'SAUDE_DOENCA':
      return { formsSubmitted: { ...state.formsSubmitted, saude_doenca: { id: action?.payload?.id, show: false } } };
    case 'ALIMENTACAO_NUTRICAO':
      return { formsSubmitted: { ...state.formsSubmitted, alimentacao_nutricao: { id: action?.payload?.id, show: false } } };
    case 'APOIO_PROTECAO_SOCIAL':
      return { formsSubmitted: { ...state.formsSubmitted, apoio_protecao_social: { id: action?.payload?.id, show: false } } };
    case 'INTERVIEW':
      return { ...initialState };
    default:
      return state;
  }
}

const IndigenousInterview: React.FC = () => {
    //@ts-ignore
    const { id } = useParams();
    // const { token } = useAuth();
    const [initialValues] = useState<any>(null)
    const [formState, dispatch] = useReducer(reducer, initialState);

    const resetForms = useCallback(
        () => {
          localStorage.removeItem('@Safety:indigenous_informacoes_basicas');
          localStorage.removeItem('@Safety:indigenous_demografico');
          localStorage.removeItem('@Safety:indigenous_domicilio');
          localStorage.removeItem('@Safety:indigenous_saude_doenca');
          localStorage.removeItem('@Safety:indigenous_alimentacao_nutricao');
          localStorage.removeItem('@Safety:indigenous_apoio_protecao_social');
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
          if (offlineInterviews[offline_id]?.hasOwnProperty('informacoes_basicas')) {
            dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: offline_id, show: false } })
          }
        }
  
        if (demografico) {
          dispatch({ type: 'DEMOGRAFICO', payload: { id: demografico, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('demografico')) {
            dispatch({ type: 'DEMOGRAFICO', payload: { id: offline_id, show: false } })
          }
        }
  
        if (domicilio) {
          dispatch({ type: 'DOMICILIO', payload: { id: domicilio, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('domicilio')) {
            dispatch({ type: 'DOMICILIO', payload: { id: offline_id, show: false } })
          }
        }
  
        if (saude_doenca) {
          dispatch({ type: 'SAUDE_DOENCA', payload: { id: saude_doenca, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('saude_doenca')) {
            dispatch({ type: 'SAUDE_DOENCA', payload: { id: offline_id, show: false } })
          }
        }
  
        if (alimentacao_nutricao) {
          dispatch({ type: 'ALIMENTACAO_NUTRICAO', payload: { id: alimentacao_nutricao, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('alimentacao_nutricao')) {
            dispatch({ type: 'ALIMENTACAO_NUTRICAO', payload: { id: offline_id, show: false } })
          }
        }
  
        if (apoio_protecao_social) {
          dispatch({ type: 'APOIO_PROTECAO_SOCIAL', payload: { id: apoio_protecao_social, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('apoio_protecao_social')) {
            dispatch({ type: 'APOIO_PROTECAO_SOCIAL', payload: { id: offline_id, show: false } })
          }
        }
      }
    }, [dispatch, id])

    const [isOffline, setIsOffline] = useState(false);
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
        <SectionTitle id="informacoes_basicas">Informações Básicas</SectionTitle>
        {formState.formsSubmitted.informacoes_basicas.show && (
          <InformacoesBasicasForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.informacoes_basicas : {}}
          />
        )}
        <SectionTitle id="demografico">Demográfico</SectionTitle>
        {formState.formsSubmitted.demografico.show && (
          <DemograficoForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.demografico : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas?.id }}
          />
        )}
        <SectionTitle id="domicilio">Domicílio</SectionTitle>
        {formState.formsSubmitted.domicilio.show && (
          <DomiciliosForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.domicilio : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas?.id }}
          />
        )}
        <SectionTitle id="saude_doenca">Saúde e Doença</SectionTitle>
        {formState.formsSubmitted.saude_doenca.show && (
          <SaudeDoencaForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.saude_doenca : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas?.id }}
          />
        )}
        <SectionTitle id="alimentacao_nutricao">Alimentação e Nutrição</SectionTitle>
        {formState.formsSubmitted.alimentacao_nutricao.show && (
          <AlimentacaoNutricaoForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.alimentacao_nutricao : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas?.id }}
          />
        )}
        <SectionTitle id="apoio_protecao_social">Apoio e Proteção Social</SectionTitle>
        {formState.formsSubmitted.apoio_protecao_social.show && (
          <ApoioProtecaoSocialForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.apoio_protecao_social : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas?.id }}
          />
        )}

        </Container>
    )
}

export default IndigenousInterview;