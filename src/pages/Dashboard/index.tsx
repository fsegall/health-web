import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ICreatePersonDTO from '../Interview/dtos/ICreatePersonDTO';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  ListTitle,
  BigScreenLinkContainer,
  StyledLink,
  StyledList,
  FilterButton
} from './styles';
import BurguerMenu from '../../components/BurguerMenu';
import Card from '../../components/Card';
import logo from '../../assets/logo_transparent.png';
import api from '../../services/api';
const Dashboard: React.FC = () => {
  const { signOut, user, token } = useAuth();
  const [persons, setPersons] = useState<ICreatePersonDTO[]>([]);

  const [filteredByUser, setFilteredByUser] = useState(false);

  const personsFilterByInterviewer = persons.filter(person => person.interviewer_id === user.id);

  useEffect(() => {
    async function fetchPersons() {
      const persons = await api.get('/persons', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPersons(persons.data);
    }
    fetchPersons();
  }, [token]);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="Safety" />
          <Profile>
            <img
              src={user.avatar_url}
              alt={user.name}
            />
            <div>
              <span>Bem-vindo</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <BigScreenLinkContainer>
            <StyledLink to="/interview">Faça uma entrevista</StyledLink>
            <StyledLink to="/project">Adicione um projeto</StyledLink>
          </BigScreenLinkContainer>

          <BurguerMenu />

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <div>
        <ListTitle>Entrevistados</ListTitle>
        <FilterButton type="button" onClick={() => setFilteredByUser(!filteredByUser)}>{!filteredByUser ? 'Meus Entrevistados' : 'Todos'}</FilterButton>
        <StyledList>
          {!filteredByUser ? persons.map((person) => {
            return <Card key={person.id} person={person} />;
          }) : personsFilterByInterviewer.map((person) => {
            return <Card key={person.id} person={person} />;
          })}
        </StyledList>
      </div>
    </Container>
  );
};
export default Dashboard;
