import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import {
  Container,
  Header,
  ListTitle,
  StyledList,
  FormContainer,
  CheckboxContainer,
  UserContainer,
  Button
} from './styles';
import Card from '../../components/Card';
import api from '../../services/api';
import Spinner from '../../components/Spinner';
import hasPermission, { Actions, Roles } from '../../authorization/constants';


interface Interviewer {
  id: string;
  name: string;
  organization_name?: string;
  role: string;
}

const Interviewers: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false)

  const { token, user } = useAuth();

  const [users, setUsers] = useState<Interviewer[]>([]);

  const [accept, setAccept] = useState(false);

  const { addToast } = useToast();

  async function onSubmit(gives_permission_id: string, receives_permission_id: string) {

    if (!accept) {
      addToast({
        type: 'error',
        title: 'Você deve dar permissão ao usuário para continuar',
        description:
          'Você deve dar permissão para continuar',
      })
      return;
    }
    await api.patch('/users/role', { gives_permission_id, receives_permission_id }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  }

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
    fetchUsers();
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
          {users.map((interviewer) => {
            return (
              <UserContainer>
                <FormContainer>
                  <Card key={interviewer.id} person={interviewer} />
                  {hasPermission(user.role, Actions.ASSIGN_COORDINATOR_ROLE) && interviewer.role === Roles.INTERVIEWER && <form onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    return onSubmit(user.id, interviewer.id)
                  }}>
                    <CheckboxContainer>
                      <label>Permissão de Coordenador</label>
                      <input type="checkbox"
                        name="Accept"
                        onChange={() => setAccept(!accept)}
                      />
                      <Button type="submit">Enviar</Button>
                    </CheckboxContainer>

                  </form>}
                </FormContainer>


              </UserContainer>
            );
          })}
        </StyledList>}
      </div>
    </Container>
  );
};
export default Interviewers;
