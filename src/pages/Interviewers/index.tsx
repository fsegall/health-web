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
import Paginate from '../../components/Paginate';
import Card from '../../components/Card';
import api from '../../services/api';
import Spinner from '../../components/Spinner';
import hasPermission, { Actions, Roles } from '../../authorization/constants';

interface PaginatorPageState {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}


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

  //Pagination
  const [basicFirst, setBasicFirst] = useState(0);
  const [basicRows, setBasicRows] = useState(10);
  const [, setPaginatorState] = useState({} as PaginatorPageState);
  const [paginatedUsers, setPaginatedUsers] = useState<Interviewer[]>([]);
  //

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

    window.location.reload();
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

  useEffect(() => {

    function paginateInterviews() {
      const firstCardOnPage = basicFirst;
      const lastCardOnPage = basicFirst + basicRows;
      const paginatedUsers = users.slice(firstCardOnPage, lastCardOnPage);
      setPaginatedUsers(paginatedUsers);

    }
    paginateInterviews()
  }, [basicFirst, basicRows, paginatedUsers, users]);

  const onPageChange = (e: PaginatorPageState) => {
    setPaginatorState(e)
    setBasicFirst(e.first)
    setBasicRows(e.rows)
  }

  return (
    <Container>
      <Header>
        <div>
          <Link to="/dashboard">
            <FiChevronLeft size={30} />
          </Link>
        </div>
        <h1>Rede <span>|</span> Pesquisadores</h1>
      </Header>
      <div>
        <ListTitle>Equipe</ListTitle>
        {isLoading ? <Spinner /> : <StyledList>
          {paginatedUsers.map((interviewer) => {
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
      <Paginate
        totalCards={users.length}
        onPageChange={onPageChange}
      >
        { }
      </Paginate>
    </Container>
  );
};
export default Interviewers;
