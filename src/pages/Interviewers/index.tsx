import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import Spinner from '../../components/Spinner';

interface Interviewer {
  id: string;
  name: string;
  organization_name?: string;
}

const Interviewers: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false)

  const { token } = useAuth();

  const [users, setUsers] = useState<Interviewer[]>([]);

  useEffect(() => {

    setIsLoading(true);

    async function fetchUsers() {

      const users = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setUsers(users.data);
    }
    setTimeout(fetchUsers, 2000);
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
        {isLoading ? <Spinner /> : <StyledList>
          {users.map((user) => {
            console.log(user);
            return <Card key={user.id} person={user} />;
          })}
        </StyledList>}
      </div>
    </Container>
  );
};
export default Interviewers;
