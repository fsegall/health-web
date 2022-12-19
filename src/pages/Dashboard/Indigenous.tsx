import React, { useState, useEffect } from 'react';
import hasPermission, { Actions } from '../../authorization/constants';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Container, FilterContainer, IndigenousCard, IndigenousSection, ListTitle, SubHeader } from './styles';

const IndigenousDashboardSection: React.FC = () => {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {

    async function fetchAllInterviews() {
      const interviews = await api.get('/indigenous-interviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setInterviews(interviews.data);
    }
    fetchAllInterviews()
  }, [token, user.id, user.role]);

  return (
    <>
        <Container>
        <SubHeader>
          {hasPermission(user.role, Actions.VIEW_ALL_INTERVIEWS) ? <ListTitle>Entrevistas</ListTitle> : <ListTitle>Minhas Entrevistas</ListTitle>}

          <FilterContainer>
            <h2>Projetos Indígenas</h2>
          </FilterContainer>

        </SubHeader>
      <IndigenousSection>
        {interviews?.map((i: any, index: number) => (
          <IndigenousCard key={index}>
            <p><strong>ID:</strong> {i.id}</p>
            <p><strong>Municipio:</strong> {i.municipio}</p>
            <p><strong>Aldeia:</strong> {i.aldeia_comunidade}</p>
            <p><strong>Data:</strong> {new Date(i.created_at).toLocaleDateString('pt-BR')} - {new Date(i.created_at).toLocaleTimeString('pt-BR')}</p>
          </IndigenousCard>
        ))}
      </IndigenousSection>
      </Container>
    </>
  )
}

export default IndigenousDashboardSection;
