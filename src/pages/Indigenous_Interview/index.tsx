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
      show: boolean;
    };
    alimentacao_nutricao:
    {
      show: boolean;
    };
    apoio_protecao_social:
    {
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
      id: null,
      show: true,
    },
    demografico: {
      id: null,
      show: true,
    },
    domicilio: {
      id: null,
      show: true,
    },
    saude_doenca: {
      show: true,
    },
    alimentacao_nutricao: {
      show: true,
    },
    apoio_protecao_social: {
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
    const [initialValues] = useState<any>({})
    const [formState, dispatch] = useReducer(reducer, initialState);

    const resetForms = useCallback(
        () => {
          localStorage.removeItem('@Safety:informacoes_basicas');
          localStorage.removeItem('@Safety:demografico');
          localStorage.removeItem('@Safety:domicilio');
          localStorage.removeItem('@Safety:saude_doenca');
          localStorage.removeItem('@Safety:alimentacao_nutricao');
          localStorage.removeItem('@Safety:apoio_protecao_social');
          window.location.reload();
        },
        [],
      )

    useEffect(() => {
      if (!id) {
        const indigenous_informacoes_basicas_id = localStorage.getItem('@Safety:indigenous_informacoes_basicas_id');
  
        if (indigenous_informacoes_basicas_id) {
          dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: indigenous_informacoes_basicas_id, show: false } })
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
            initialValues={initialValues ? initialValues?.demografico : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas }}
          />
        )}
        <SectionTitle id="domicilio">Domicílio</SectionTitle>
        {formState.formsSubmitted.domicilio.show && (
          <DomiciliosForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.domicilio : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas }}
          />
        )}
        <SectionTitle id="saude_doenca">Saúde e Doença</SectionTitle>
        {formState.formsSubmitted.saude_doenca.show && (
          <SaudeDoencaForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.saude_doenca : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas }}
          />
        )}
        <SectionTitle id="alimentacao_nutricao">Alimentação e Nutrição</SectionTitle>
        {formState.formsSubmitted.alimentacao_nutricao.show && (
          <AlimentacaoNutricaoForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.alimentacao_nutricao : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas }}
          />
        )}
        <SectionTitle id="apoio_protecao_social">Apoio e Proteção Social</SectionTitle>
        {formState.formsSubmitted.apoio_protecao_social.show && (
          <ApoioProtecaoSocialForm
            dispatch={dispatch}
            isEditForm={id ? true : false}
            offline={isOffline}
            initialValues={initialValues ? initialValues?.apoio_protecao_social : { entrevista_indigena_id: formState?.formsSubmitted?.informacoes_basicas }}
          />
        )}

        </Container>
    )
}

export default IndigenousInterview;