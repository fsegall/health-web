import React, { useState, useEffect } from 'react';
import hasPermission, { Actions, Roles } from '../../authorization/constants';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Container, FilterContainer, FilterSection, IndigenousCard, IndigenousSection, ListTitle, SubHeader } from './styles';
import Pagination from '../../templates/PaginatedListTemplate/Pagination';
import useFetch from '../../hooks/useFetch';
import FilterSelect from '../../components/FilterSelect';

interface IndigenousBasicInterviewResponse {
  id: string;
  municipio: string;
  aldeia_comunidade: string;
  tipo_comunidade: string;
  entrevistador_id: string;
  projeto_id: string;
  data_entrevista: Date
  responsavel_domicilio: string,
  created_at: Date
  updated_at: Date
}

interface IndigenousInterviewData {
  indigenous_interviews: any[]
  totalCount: number;
  pagination: {
    hasNextPage: boolean;
    hasPreviousPage: boolean
  }
}

const IndigenousDashboardSection: React.FC = () => {
  const { user, token } = useAuth();
  const { data: interviewersData } = useFetch<any[]>(
    process.env.REACT_APP_API_URL + '/users',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const { data: projectsData } = useFetch<any[]>(
    process.env.REACT_APP_API_URL + '/projects',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const [interviewerId, setInterviewerId] = useState('');
  const [projectId, setProjectId] = useState('');
  const interviewers = interviewersData?.map(i => ({
    value: i.id,
    label: i.name + ' (' + i.organization_name + ')'
  })) ?? []
  const projects = projectsData?.map(i => ({
    value: i.id,
    label: i.name + ' (' + i.project_number + ')'
  })) ?? []
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [interviews, setInterviews] = useState<IndigenousInterviewData>({
    indigenous_interviews: [],
    pagination: {
      hasNextPage: false,
      hasPreviousPage: false
    },
    totalCount: 0
  });

  useEffect(() => {
    async function fetchAllInterviews() {
      let filters = {}
      if (interviewerId !== '') {
        filters = {
          entrevistador_id: interviewerId
        }
      }
      if (projectId !== '') {
        filters = {
          ...filters,
          projeto_id: projectId
        }
      }
      try {
        setLoading(true)
        const interviews = await api.get(`/indigenous-interviews/page/${page}/limit/${limit}`,
        {
          params: {
            ...filters
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInterviews(interviews?.data);
      } catch(er) {
        console.log(er)
      } finally {
        setLoading(false);
      }
    }
    fetchAllInterviews()
  }, [token, user, setInterviews, page, limit, interviewerId, projectId]);

  const hasFilter = (user?.role === Roles.COORDINATOR) || (user?.role === Roles.ADMIN)

  return (
    <>
        <Container>
        <SubHeader>
          {hasPermission(user?.role, Actions?.VIEW_ALL_INTERVIEWS) ? <ListTitle>Entrevistas</ListTitle> : <ListTitle>Minhas Entrevistas</ListTitle>}
          <FilterContainer>
            <div style={{ textAlign: 'end' }}>
              <h3>Entrevistas Indígenas</h3>
              <p>Total de {interviews?.totalCount} entrevistas</p>
            </div>
          </FilterContainer>
        </SubHeader>
        {hasFilter && (
          <FilterSection>
            <FilterSelect
              name="entrevistador_id"
              label="Filtrar por Entrevistador"
              value={interviewerId}
              setValue={setInterviewerId}
              options={interviewers}
            />
            <FilterSelect
              name="projeto_id"
              label="Filtrar por Projeto"
              value={projectId}
              setValue={setProjectId}
              options={projects}
            />
          </FilterSection>
        )}
      <IndigenousSection>
        {loading ? "..." :
        interviews?.indigenous_interviews?.length === 0 ? <p>Nenhuma entrevista cadastrada</p> : (
          interviews?.indigenous_interviews?.map((i: IndigenousBasicInterviewResponse, index: number) => (
            <IndigenousCard key={index} isInterviewer={user?.id === i?.entrevistador_id}>
              <p><strong>ID:</strong> {i?.id}</p>
              <p><strong>Municipio:</strong> {i?.municipio}</p>
              <p><strong>Aldeia:</strong> {i?.aldeia_comunidade}</p>
              <p><strong>Data:</strong> {new Date(i?.created_at).toLocaleDateString('pt-BR')} - {new Date(i?.created_at).toLocaleTimeString('pt-BR')}</p>
            </IndigenousCard>
          ))
        )}
      </IndigenousSection>
      <Pagination
        hasNextPage={interviews?.pagination?.hasNextPage}
        hasPreviousPage={interviews?.pagination?.hasPreviousPage}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />
      </Container>
    </>
  )
}

export default IndigenousDashboardSection;