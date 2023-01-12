import React, { useState, useEffect } from 'react';
import hasPermission, { Actions, Roles } from '../../authorization/constants';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Container, FilterContainer, IndigenousCard, IndigenousSection, ListTitle, SubHeader } from './styles';
import Switch from "react-switch";

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

const IndigenousDashboardSection: React.FC = () => {
  const { user, token } = useAuth();
  const [,setIsLoading] = useState(false);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    async function fetchAllInterviews() {
      const interviews = await api.get('/indigenous-interviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      if (user?.role ===  Roles.INTERVIEWER && !showAll) {
        const filteredInterviews = interviews?.data?.filter((i: IndigenousBasicInterviewResponse) => i?.entrevistador_id === user?.id)
        setInterviews(filteredInterviews);
      } else {
        setInterviews(interviews.data);
      }
    }
    fetchAllInterviews()
  }, [token, user, showAll, setInterviews]);

  return (
    <>
        <Container>
        <SubHeader>
          {hasPermission(user?.role, Actions?.VIEW_ALL_INTERVIEWS) ? <ListTitle>Entrevistas</ListTitle> : <ListTitle>Minhas Entrevistas</ListTitle>}
          <FilterContainer>
            <h2>Projetos Indígenas</h2>
          </FilterContainer>

        </SubHeader>
        {user?.role === Roles?.INTERVIEWER && (
          <div style={{ padding: '5px 30px' }}>
            <Switch onColor="rgb(89,116,140,0.7)" uncheckedIcon={false} checkedIcon={false} offColor="#dedede" onChange={() => setShowAll(!showAll)} checked={showAll} /> <p>{showAll ? 'Todas entrevistas' : 'Minhas entrevistas'}</p>
          </div>
        )}
      <IndigenousSection>
        {interviews?.length === 0 ? <p>Nenhuma entrevista cadastrada</p> : (
          interviews?.map((i: IndigenousBasicInterviewResponse, index: number) => (
            <IndigenousCard key={index} isInterviewer={user?.id === i?.entrevistador_id}>
              <p><strong>ID:</strong> {i?.id}</p>
              <p><strong>Municipio:</strong> {i?.municipio}</p>
              <p><strong>Aldeia:</strong> {i?.aldeia_comunidade}</p>
              <p><strong>Data:</strong> {new Date(i?.created_at).toLocaleDateString('pt-BR')} - {new Date(i?.created_at).toLocaleTimeString('pt-BR')}</p>
            </IndigenousCard>
          ))
        )}
      </IndigenousSection>
      </Container>
    </>
  )
}

export default IndigenousDashboardSection;
