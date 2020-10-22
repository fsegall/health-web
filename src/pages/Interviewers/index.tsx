import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ICreatePersonDTO from '../Interview/dtos/ICreatePersonDTO';
import { FiChevronLeft } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  ListTitle,
  StyledList,
} from './styles';
import Card from '../../components/Card';
import api from '../../services/api';

const Interviewers: React.FC = () => {

  const { token } = useAuth();

  const [persons, setPersons] = useState<ICreatePersonDTO[]>([]);

  useEffect(() => {
    async function fetchPersons() {
      const persons = await api.get('/users', {
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
        <div>
          <Link to="/dashboard">
            <FiChevronLeft size={30} />
          </Link>
        </div>
        <h1>Safety <span>|</span> Entrevistadores</h1>
      </Header>
      <div>
        <ListTitle>Entrevistadores</ListTitle>
        <StyledList>
          {persons.map((person) => {
            return <Card key={person.id} person={person} />;
          })}
        </StyledList>
      </div>
    </Container>
  );
};
export default Interviewers;
