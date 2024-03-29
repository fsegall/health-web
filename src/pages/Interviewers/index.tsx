import React, { useState, useEffect } from 'react';
/* import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi'; */
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import {
  Container,
/*   Header, */
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
    async function fetchUsers() {
      setIsLoading(true);
      const users = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.data);
      setIsLoading(false);
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
  }, [basicFirst, basicRows, users]);

  const onPageChange = (e: PaginatorPageState) => {
    setPaginatorState(e)
    setBasicFirst(e.first)
    setBasicRows(e.rows)
  }

  return (
    <Container>
      <div>
        <ListTitle>Pessoas</ListTitle>
        {isLoading ? <Spinner /> : <StyledList>
          {!isLoading && paginatedUsers?.map((interviewer) => {
            return (
              <UserContainer key={interviewer.id}>
                <FormContainer>
                  <Card key={interviewer.id} person={interviewer} />
                  {hasPermission(user.role, Actions.ASSIGN_INTERVIEWER_ROLE) && interviewer.role === Roles.VISITOR && <form onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    return onSubmit(user.id, interviewer.id)
                  }}>
                    <CheckboxContainer>
                      <label>Permissão de Entrevistador</label>
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
        first={basicFirst}
        rows={basicRows}
      >
        { }
      </Paginate>
    </Container>
  );
};
export default Interviewers;
