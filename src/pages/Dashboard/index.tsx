import React, { useState, useEffect } from 'react';
import ICreatePersonDTO from '../Interview/dtos/ICreatePersonDTO';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { Container, Header, HeaderContent, Profile } from './styles';
import Card from '../../components/Card';
import logo from '../../assets/logo_transparent.png';
import api from '../../services/api';
const Dashboard: React.FC = () => {
  const { signOut, user, token } = useAuth();
  const [persons, setPersons] = useState<ICreatePersonDTO[]>([]);
  useEffect(() => {
    async function fetchPersons() {
      const persons = await api.get('/person', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPersons(persons.data);
    }
    fetchPersons();
  }, []);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="Safety" />
          <Profile>
            <img
              src={`http://localhost:3333/files/${user.avatar}`}
              alt={user.name}
            />
            <div>
              <span>Bem-vindo</span>
              <strong>Felipe</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <div>
        <h2>Entrevistados</h2>
        <ul>
          {persons.map((person) => {
            console.log(person);
            return <Card key={person.id} person={person} />;
          })}
        </ul>
      </div>
    </Container>
  );
};
export default Dashboard;
