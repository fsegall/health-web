import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Roles } from '../../authorization/constants';
import Button from '../../components/Button';
import {
  Container,
  Header,
  Content,
  Section,
  SectionTitle,
  Field,
  FieldLabel,
  FieldValue,
  LoadingContainer,
  ErrorContainer,
  StatusBadge,
  HeaderTitleContainer,
  MoradoresContainer,
  MoradorCard,
} from './styles';
import {
  formatDemograficoData,
  formatDomicilioData,
  formatSaudeDoencaData,
  formatAlimentacaoNutricaoData,
  formatApoioProtecaoSocialData,
} from './formatData';

const ViewIndigenousInterview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { user, token } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interview, setInterview] = useState<any>(null);
  const [canEdit, setCanEdit] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const checkEditPermission = React.useCallback((interviewData: any) => {
    if (!user) {
      setCanEdit(false);
      return;
    }

    // ADMIN pode editar tudo
    if (user.role === Roles.ADMIN) {
      setCanEdit(true);
      return;
    }

    // INTERVIEWER só pode editar suas próprias entrevistas
    if (user.role === Roles.INTERVIEWER) {
      const interviewerId = interviewData?.entrevistador_id || 
                           interviewData?.indigenous_informacoes_basicas?.entrevistador_id;
      setCanEdit(interviewerId === user.id);
      return;
    }

    // COORDINATOR pode editar entrevistas dos seus projetos
    if (user.role === Roles.COORDINATOR) {
      // Para entrevistas offline, precisamos verificar via project_id
      // Para entrevistas online, já temos project_id na resposta
      const projectId = interviewData?.project_id || 
                       interviewData?.indigenous_informacoes_basicas?.project_id;
      
      // Busca os projetos do coordenador para verificar
      api.get('/projects', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          const userProjects = response.data.filter((p: any) => p.user_id === user.id);
          const projectIds = userProjects.map((p: any) => p.id);
          setCanEdit(projectId && projectIds.includes(projectId));
        })
        .catch(() => setCanEdit(false));
      return;
    }

    setCanEdit(false);
  }, [user, token]);

  useEffect(() => {
    async function loadInterview() {
      try {
        setLoading(true);
        setError(null);

        try {
          const response = await api.get(`/indigenous-interviews/v2/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setInterview(response.data);
          setIsOffline(false);
          checkEditPermission(response.data);
        } catch (apiError) {
          // Se não encontrou na API, tenta buscar do localStorage (offline)
          const offlineInterviews: { [key: string]: any } = JSON.parse(
            localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}'
          );

          if (offlineInterviews[id]) {
            setInterview(offlineInterviews[id]);
            setIsOffline(true);
            checkEditPermission(offlineInterviews[id]);
          } else {
            const error = apiError as any;
            throw new Error(error?.response?.data?.message || 'Entrevista não encontrada');
          }
        }
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Erro ao carregar entrevista');
        addToast({
          type: 'error',
          title: 'Erro',
          description: error.message || 'Não foi possível carregar a entrevista',
        });
      } finally {
        setLoading(false);
      }
    }

    if (id && token) {
      loadInterview();
    }
  }, [id, token, addToast, checkEditPermission]);

  const handleEdit = () => {
    history.push(`/indigenous-interview/${id}`);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <p>Carregando entrevista...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (error || !interview) {
    return (
      <Container>
        <ErrorContainer>
          <p>{error || 'Entrevista não encontrada'}</p>
          <Button onClick={() => history.push('/indigenous-dashboard')}>
            Voltar
          </Button>
        </ErrorContainer>
      </Container>
    );
  }

  const basicInfo = interview?.indigenous_informacoes_basicas || interview;
  const demografico = interview?.indigenous_demografico || interview?.entrevista_indigena_demografico;
  const domicilio = interview?.indigenous_domicilio || interview?.entrevista_indigena_domicilio;
  const saudeDoenca = interview?.indigenous_saude_doenca || interview?.entrevista_indigena_saude_doenca;
  const alimentacaoNutricao = interview?.indigenous_alimentacao_nutricao || interview?.entrevista_indigena_alimentacao_nutricao;
  const apoioProtecaoSocial = interview?.indigenous_apoio_protecao_social || interview?.entrevista_indigena_apoio_financeiro;

  return (
    <Container>
      <Header>
        <Button onClick={() => history.push('/indigenous-dashboard')}>
          <FiArrowLeft /> Voltar
        </Button>
        <HeaderTitleContainer>
          <h1>Visualizar Entrevista Indígena</h1>
          <StatusBadge isOffline={isOffline}>
            {isOffline ? 'Offline - Apenas no dispositivo' : 'Online - Entrevista salva no banco'}
          </StatusBadge>
        </HeaderTitleContainer>
        {canEdit && (
          <Button onClick={handleEdit}>
            <FiEdit /> Editar
          </Button>
        )}
      </Header>

      <Content>
        <Section>
          <SectionTitle>Informações Básicas</SectionTitle>
          <Field>
            <FieldLabel>Projeto:</FieldLabel>
            <FieldValue>{basicInfo?.projeto_numero || '-'}</FieldValue>
          </Field>
          <Field>
            <FieldLabel>DSEI:</FieldLabel>
            <FieldValue>{basicInfo?.distrito_sanitario_indigena || '-'}</FieldValue>
          </Field>
          <Field>
            <FieldLabel>Município:</FieldLabel>
            <FieldValue>{basicInfo?.municipio || '-'}</FieldValue>
          </Field>
          <Field>
            <FieldLabel>Aldeia/Comunidade:</FieldLabel>
            <FieldValue>{basicInfo?.aldeia_comunidade || '-'}</FieldValue>
          </Field>
          <Field>
            <FieldLabel>Situação Legal da Terra:</FieldLabel>
            <FieldValue>{basicInfo?.situacao_legal_terra || '-'}</FieldValue>
          </Field>
          <Field>
            <FieldLabel>Responsável por Documentos:</FieldLabel>
            <FieldValue>
              {basicInfo?.responsavel_documentos 
                ? (Array.isArray(basicInfo.responsavel_documentos) 
                    ? basicInfo.responsavel_documentos.join(', ')
                    : basicInfo.responsavel_documentos.replace(/,/g, ', '))
                : '-'}
            </FieldValue>
          </Field>
          <Field>
            <FieldLabel>Data da Entrevista:</FieldLabel>
            <FieldValue>
              {basicInfo?.data_entrevista 
                ? new Date(basicInfo.data_entrevista).toLocaleDateString('pt-BR')
                : '-'}
            </FieldValue>
          </Field>
        </Section>

        {demografico && (() => {
          const formattedData = formatDemograficoData(demografico);
          const moradores = formattedData?.Moradores || [];
          
          return (
            <Section>
              <SectionTitle>Demográfico</SectionTitle>
              
              {formattedData && Object.entries(formattedData)
                .filter(([key]) => key !== 'Moradores')
                .map(([label, value]) => (
                  <Field key={label}>
                    <FieldLabel>{label}:</FieldLabel>
                    <FieldValue>{value}</FieldValue>
                  </Field>
                ))}
              
              {moradores.length > 0 && (
                <div>
                  <FieldLabel style={{ marginBottom: '15px', display: 'block' }}>
                    Moradores ({moradores.length}):
                  </FieldLabel>
                  <MoradoresContainer>
                    {moradores.map((morador: any, index: number) => (
                      <MoradorCard key={morador.id || index}>
                        <FieldLabel>Morador {index + 1}:</FieldLabel>
                        <Field>
                          <FieldLabel>Nome:</FieldLabel>
                          <FieldValue>{morador.nome || '-'}</FieldValue>
                        </Field>
                        <Field>
                          <FieldLabel>Data de nascimento:</FieldLabel>
                          <FieldValue>{morador.data_nascimento || '-'}</FieldValue>
                        </Field>
                        <Field>
                          <FieldLabel>Idade:</FieldLabel>
                          <FieldValue>{morador.idade || '-'}</FieldValue>
                        </Field>
                        <Field>
                          <FieldLabel>Sexo:</FieldLabel>
                          <FieldValue>
                            {morador.sexo === 'masculino' ? 'Masculino' : morador.sexo === 'feminino' ? 'Feminino' : morador.sexo || '-'}
                          </FieldValue>
                        </Field>
                        {morador.relacao_com_lider && (
                          <Field>
                            <FieldLabel>Relação com líder:</FieldLabel>
                            <FieldValue>{morador.relacao_com_lider}</FieldValue>
                          </Field>
                        )}
                      </MoradorCard>
                    ))}
                  </MoradoresContainer>
                </div>
              )}
            </Section>
          );
        })()}

        {domicilio && (() => {
          const formattedData = formatDomicilioData(domicilio);
          
          return (
            <Section>
              <SectionTitle>Domicílio</SectionTitle>
              
              {formattedData && Object.entries(formattedData).map(([label, value]) => (
                <Field key={label}>
                  <FieldLabel>{label}:</FieldLabel>
                  <FieldValue>{value}</FieldValue>
                </Field>
              ))}
            </Section>
          );
        })()}

        {saudeDoenca && (
          <Section>
            <SectionTitle>Saúde e Doença</SectionTitle>
            <p>Dados de saúde e doença cadastrados</p>
          </Section>
        )}

        {alimentacaoNutricao && (
          <Section>
            <SectionTitle>Alimentação e Nutrição</SectionTitle>
            <p>Dados de alimentação e nutrição cadastrados</p>
          </Section>
        )}

        {apoioProtecaoSocial && (
          <Section>
            <SectionTitle>Apoio e Proteção Social</SectionTitle>
            <p>Dados de apoio e proteção social cadastrados</p>
          </Section>
        )}
      </Content>
    </Container>
  );
};

export default ViewIndigenousInterview;

