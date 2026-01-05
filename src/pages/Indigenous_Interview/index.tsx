import React, { useState, useCallback, useReducer, useEffect } from 'react';
import {
  Container,
  Header,
  SectionTitle,
  SectionTitleGroup,
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
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

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
      // Verificar se o módulo está desabilitado no localStorage
      show: localStorage.getItem('@Safety:hide_indigenous_saude_doenca') !== 'true',
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
      return { formsSubmitted: { ...state.formsSubmitted, indigenous_saude_doenca: { id: action?.payload?.id, show: action?.payload?.show ?? false } } };
    case 'TOGGLE_SAUDE_DOENCA':
      const isHiding = action?.payload?.show === false;
      if (isHiding) {
        localStorage.setItem('@Safety:hide_indigenous_saude_doenca', 'true');
        // Remover módulo do objeto offline se existir
        const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-indigenous-offline-interview-id') || 'null');
        if (uniqueId) {
          const offlineInterviews: { [key: string]: ICreateIndigenousOfflineInterviewDTO } = JSON.parse(
            localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}'
          );
          if (offlineInterviews[uniqueId]) {
            const { indigenous_saude_doenca, ...rest } = offlineInterviews[uniqueId];
            offlineInterviews[uniqueId] = rest;
            localStorage.setItem('@Safety:indigenous-offline-interviews', JSON.stringify(offlineInterviews));
          }
        }
        // Remover ID do módulo do localStorage
        localStorage.removeItem('@Safety:indigenous_saude_doenca');
      } else {
        localStorage.setItem('@Safety:hide_indigenous_saude_doenca', 'false');
      }
      return { formsSubmitted: { ...state.formsSubmitted, indigenous_saude_doenca: { id: null, show: action?.payload?.show ?? true } } };
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
    const [isOffline, setIsOffline] = useState(false);
    const { token } = useAuth();

    // Função para transformar dados da API no formato esperado pelos formulários
    const transformApiDataToFormFormat = (apiData: any) => {
      // Normaliza responsavel_documentos - campo é varchar no banco, pode vir como string JSON ou string simples
      // No banco pode estar salvo como: "[\"certidao_de_nascimento\"]" ou "{\"certidao_de_nascimento\"}"
      let responsavel_documentos = [];
      if (apiData?.responsavel_documentos !== null && apiData?.responsavel_documentos !== undefined && apiData?.responsavel_documentos !== '') {
        if (Array.isArray(apiData.responsavel_documentos)) {
          responsavel_documentos = apiData.responsavel_documentos;
        } else if (typeof apiData.responsavel_documentos === 'string') {
          const trimmed = apiData.responsavel_documentos.trim();
          // Tenta fazer parse se parecer JSON (começa com [ ou {)
          if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
            try {
              const parsed = JSON.parse(apiData.responsavel_documentos);
              if (Array.isArray(parsed)) {
                responsavel_documentos = parsed;
              } else if (typeof parsed === 'object' && parsed !== null) {
                // Se for objeto JSON (como {"certidao_de_nascimento": true}), extrai as chaves como array
                responsavel_documentos = Object.keys(parsed);
              } else {
                responsavel_documentos = [parsed];
              }
            } catch (e) {
              // Se não for JSON válido, trata como string simples
              responsavel_documentos = [apiData.responsavel_documentos];
            }
          } else {
            // Se for string simples (não JSON), trata como valor único
            responsavel_documentos = [apiData.responsavel_documentos];
          }
        } else {
          responsavel_documentos = [apiData.responsavel_documentos];
        }
      }

      // Os dados básicos da entrevista vêm diretamente no objeto principal da API
      const basicInfo = {
        ...apiData,
        entrevista_indigena_id: apiData?.id,
        responsavel_documentos,
      };

      return {
        indigenous_informacoes_basicas: basicInfo,
        indigenous_demografico: apiData?.entrevista_indigena_demografico,
        indigenous_domicilio: apiData?.entrevista_indigena_domicilio,
        indigenous_saude_doenca: apiData?.entrevista_indigena_saude_doenca,
        indigenous_alimentacao_nutricao: apiData?.entrevista_indigena_alimentacao_nutricao,
        indigenous_apoio_protecao_social: apiData?.entrevista_indigena_apoio_financeiro,
      };
    };

    useEffect(() => {
      async function handleInitialData(id: string) {
        // Primeiro tenta buscar no localStorage (offline)
        const offlineData: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(
          localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}'
        );

        const offlineResponse = offlineData[id];

        if (offlineResponse) {
          setIsOffline(true);
          setInitialValues(offlineResponse);
          return;
        }

        // Se não encontrou no localStorage, busca na API (online)
        try {
          const response = await api.get(`/indigenous-interviews/v2/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response?.data) {
            setIsOffline(false);
            console.log('[DEBUG] responsavel_documentos da API:', response.data.responsavel_documentos, typeof response.data.responsavel_documentos);
            const transformedData = transformApiDataToFormFormat(response.data);
            console.log('[DEBUG] responsavel_documentos transformado:', transformedData.indigenous_informacoes_basicas.responsavel_documentos);
            setInitialValues(transformedData);
          }
        } catch (error) {
          console.error('Erro ao carregar entrevista da API:', error);
          // Se der erro, deixa initialValues como null (vai mostrar estado de carregamento)
        }
      }

      if (id && token) {
        handleInitialData(id);
      }
    }, [id, token])

    const resetForms = useCallback(
        () => {
          localStorage.removeItem('@Safety:indigenous_informacoes_basicas');
          localStorage.removeItem('@Safety:indigenous_demografico');
          localStorage.removeItem('@Safety:indigenous_domicilio');
          localStorage.removeItem('@Safety:indigenous_saude_doenca');
          localStorage.removeItem('@Safety:indigenous_alimentacao_nutricao');
          localStorage.removeItem('@Safety:indigenous_apoio_protecao_social');
          localStorage.removeItem('@Safety:current-indigenous-offline-interview-id');
          // Não remover a preferência de desabilitar o módulo (persiste entre sessões)
          // localStorage.removeItem('@Safety:hide_indigenous_saude_doenca');
          window.location.reload();
        },
        [],
    )


    useEffect(() => {
      const offlineInterviews: { [key: string]: ICreateIndigenousOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');
      
      if (!id) {
        const indigenous_informacoes_basicas_id = localStorage.getItem('@Safety:indigenous_informacoes_basicas');
        const demografico = localStorage.getItem('@Safety:indigenous_demografico');
        const domicilio = localStorage.getItem('@Safety:indigenous_domicilio');
        const saude_doenca = localStorage.getItem('@Safety:indigenous_saude_doenca');
        const alimentacao_nutricao = localStorage.getItem('@Safety:indigenous_alimentacao_nutricao');
        const apoio_protecao_social = localStorage.getItem('@Safety:indigenous_apoio_protecao_social');

        const offline_id = JSON.parse(localStorage.getItem('@Safety:current-indigenous-offline-interview-id') || 'null');


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

        // Verificar se o módulo está desabilitado
        const isModuleDisabled = localStorage.getItem('@Safety:hide_indigenous_saude_doenca') === 'true';
        
        if (saude_doenca) {
          dispatch({ type: 'SAUDE_DOENCA', payload: { id: saude_doenca, show: false } })
        } else if (offlineInterviews && offline_id) {
          if (offlineInterviews[offline_id]?.hasOwnProperty('indigenous_saude_doenca')) {
            dispatch({ type: 'SAUDE_DOENCA', payload: { id: offline_id, show: false } })
          } else if (isModuleDisabled) {
            // Módulo desabilitado - não mostrar formulário
            dispatch({ type: 'SAUDE_DOENCA', payload: { id: null, show: false } })
          }
        } else if (isModuleDisabled) {
          // Módulo desabilitado - não mostrar formulário
          dispatch({ type: 'SAUDE_DOENCA', payload: { id: null, show: false } })
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
      } else if (id && offlineInterviews && offlineInterviews[id]) {
        // Quando há id (modo edição), marca os módulos como disponíveis para edição
        const interviewData = offlineInterviews[id];
        if (interviewData.hasOwnProperty('indigenous_informacoes_basicas')) {
          dispatch({ type: 'INFORMACOES_BASICAS', payload: { id: id, show: true } })
        }
        if (interviewData.hasOwnProperty('indigenous_demografico')) {
          dispatch({ type: 'DEMOGRAFICO', payload: { id: id, show: true } })
        }
        if (interviewData.hasOwnProperty('indigenous_domicilio')) {
          dispatch({ type: 'DOMICILIO', payload: { id: id, show: true } })
        }
        if (interviewData.hasOwnProperty('indigenous_saude_doenca')) {
          dispatch({ type: 'SAUDE_DOENCA', payload: { id: id, show: true } })
        } else {
          // Verifica se o módulo está desabilitado
          const isModuleDisabled = localStorage.getItem('@Safety:hide_indigenous_saude_doenca') === 'true';
          dispatch({ type: 'SAUDE_DOENCA', payload: { id: null, show: !isModuleDisabled } })
        }
        if (interviewData.hasOwnProperty('indigenous_alimentacao_nutricao')) {
          dispatch({ type: 'ALIMENTACAO_NUTRICAO', payload: { id: id, show: true } })
        }
        if (interviewData.hasOwnProperty('indigenous_apoio_protecao_social')) {
          dispatch({ type: 'APOIO_PROTECAO_SOCIAL', payload: { id: id, show: true } })
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
            {/* Não mostra os controles quando há id na URL (modo edição) */}
            {!id && (
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
          (id && !initialValues) ? (
            <SubmittedContainer>Carregando dados...</SubmittedContainer>
          ) : (
            <InformacoesBasicasForm
              dispatch={dispatch}
              isEditForm={id ? true : false}
              offline={isOffline}
              offlineId={id}
              initialValues={initialValues ? initialValues?.indigenous_informacoes_basicas : {}}
            />
          )
        ) : <SubmittedContainer>Módulo informações básicas já cadastrado</SubmittedContainer>}
        <SectionTitle id="indigenous_demografico">Demográfico</SectionTitle>
        {(id || formState.formsSubmitted.indigenous_demografico.show) ? (
          (id && !initialValues) ? (
            <SubmittedContainer>Carregando dados...</SubmittedContainer>
          ) : (
            <DemograficoForm
              dispatch={dispatch}
              isEditForm={id ? true : false}
              offline={isOffline}
              initialValues={initialValues ? initialValues?.indigenous_demografico : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
              hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_informacoes_basicas.show}
            />
          )
        ) : <SubmittedContainer>Módulo demográfico já cadastrado</SubmittedContainer>}
        <SectionTitle id="indigenous_domicilio">Domicílio</SectionTitle>
        {(id || formState.formsSubmitted.indigenous_domicilio.show) ? (
          (id && !initialValues) ? (
            <SubmittedContainer>Carregando dados...</SubmittedContainer>
          ) : (
            <DomiciliosForm
              dispatch={dispatch}
              isEditForm={id ? true : false}
              offline={isOffline}
              initialValues={initialValues ? initialValues?.indigenous_domicilio : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
              hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_demografico.show}
            />
          )
        ) : <SubmittedContainer>Módulo domicílio já cadastrado</SubmittedContainer>}
        {/* Só mostra o módulo Saúde e Doença se ele existir nos dados ou se não estiver editando */}
        {(!id || (id && initialValues && initialValues?.indigenous_saude_doenca)) && (
          <>
            <SectionTitleGroup>
              <SectionTitle id="indigenous_saude_doenca">Saúde e Doença</SectionTitle>
              {!id && !formState.formsSubmitted.indigenous_saude_doenca.id && (
                <Switch
                  onColor="#c2024b"
                  offColor="#dedede"
                  onChange={() => {
                    const saudeDoencaShow = formState.formsSubmitted.indigenous_saude_doenca.show;
                    dispatch({ type: 'TOGGLE_SAUDE_DOENCA', payload: { id: null, show: !saudeDoencaShow } });
                  }}
                  checked={formState.formsSubmitted.indigenous_saude_doenca.show}
                />
              )}
            </SectionTitleGroup>
            {(id || formState.formsSubmitted.indigenous_saude_doenca.show) ? (
              (id && !initialValues) ? (
                <SubmittedContainer>Carregando dados...</SubmittedContainer>
              ) : (
                <SaudeDoencaForm
                  dispatch={dispatch}
                  isEditForm={id ? true : false}
                  offline={isOffline}
                  initialValues={initialValues ? initialValues?.indigenous_saude_doenca : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
                  hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_domicilio.show}
                />
              )
            ) : formState.formsSubmitted.indigenous_saude_doenca.id ? (
              <SubmittedContainer>Módulo saúde e doença já cadastrado</SubmittedContainer>
            ) : (
              <SubmittedContainer>Módulo saúde e doença desabilitado</SubmittedContainer>
            )}
          </>
        )}
        <SectionTitle id="indigenous_alimentacao_nutricao">Alimentação e Nutrição</SectionTitle>
        {(id || formState.formsSubmitted.indigenous_alimentacao_nutricao.show) ? (
          (id && !initialValues) ? (
            <SubmittedContainer>Carregando dados...</SubmittedContainer>
          ) : (
            <AlimentacaoNutricaoForm
              dispatch={dispatch}
              isEditForm={id ? true : false}
              offline={isOffline}
              initialValues={initialValues ? initialValues?.indigenous_alimentacao_nutricao : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
              hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_domicilio.show && (!formState.formsSubmitted.indigenous_saude_doenca.show || (id && initialValues && !initialValues?.indigenous_saude_doenca))}
            />
          )
        ) : <SubmittedContainer>Módulo alimentação e nutrição já cadastrado</SubmittedContainer>}
        <SectionTitle id="indigenous_apoio_protecao_social">Apoio e Proteção Social</SectionTitle>
        {(id || formState.formsSubmitted.indigenous_apoio_protecao_social.show) ? (
          (id && !initialValues) ? (
            <SubmittedContainer>Carregando dados...</SubmittedContainer>
          ) : (
            <ApoioProtecaoSocialForm
              dispatch={dispatch}
              isEditForm={id ? true : false}
              offline={isOffline}
              initialValues={initialValues ? initialValues?.indigenous_apoio_protecao_social : { entrevista_indigena_id: formState?.formsSubmitted?.indigenous_informacoes_basicas?.id }}
              hasPreviousStepCompleted={!formState.formsSubmitted.indigenous_alimentacao_nutricao.show}
              resetForms={resetForms}
            />
          )
        ) : <SubmittedContainer>Módulo apoio social já cadastrado</SubmittedContainer>}
        </Container>
    )
}

export default IndigenousInterview;
