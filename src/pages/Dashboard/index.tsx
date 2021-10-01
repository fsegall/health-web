import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ICreateInterviewDTO from '../Interview/dtos/ICreateInterviewDTO';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import Paginate from '../../components/Paginate';
import hasPermission, { Actions } from '../../authorization/constants';
import {
  Container,
  Counter,
  Header,
  HeaderContent,
  Profile,
  ListTitle,
  SubHeader,
  BigScreenLinkContainer,
  StyledLink,
  BadgeContainer,
  FilterContainer,
  OfflineButton,
} from './styles';
import BurguerMenu from '../../components/BurguerMenu';
import InterviewBage from '../../components/interviewBadge';
import logo from '../../assets/logo_transparent.png';
import api from '../../services/api';
import Spinner from '../../components/Spinner';
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';
import submitOfflineInterviews from '../../services/offlineInterviewsService';
import { useToast } from '../../hooks/toast';

interface PaginatorPageState {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { signOut, user, token } = useAuth();
  const [interviews, setInterviews] = useState<ICreateInterviewDTO[]>([]);
  const [filteredBy, setFilteredBy] = useState<ICreateInterviewDTO[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [offlineInterviews] = useState<{ [key: string]: ICreateOfflineInterviewDTO }>(() => {
    const interviews = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');
    return interviews;
  });
  const [basicFirst, setBasicFirst] = useState(0);
  const [basicRows, setBasicRows] = useState(10);
  const [, setPaginatorState] = useState({} as PaginatorPageState);
  const [paginatedInterviews, setPaginatedInterviews] = useState<ICreateInterviewDTO[]>([]);
  const [paginatedFilteredInterviews, setPaginatedFilteredInterviews] = useState<ICreateInterviewDTO[]>([]);
  const [interviewsOnPage, setInterviewsOnPage] = useState<ICreateInterviewDTO[]>([]);
  const [interviewsOnPageFiltered, setInterviewsOnPageFiltered] = useState<ICreateInterviewDTO[]>([]);

  const { addToast } = useToast()

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllInterviews() {
      const interviews = await api.get('/interviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setInterviews(interviews.data);
    }
    async function fetchMyInterviews() {
      const interviews = await api.get(`/interviews/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setInterviews(interviews.data);
      setInterviewsOnPage(interviews.data);
    }
    if (hasPermission(user.role, Actions.VIEW_ALL_INTERVIEWS)) {
      fetchAllInterviews()
    } else {
      fetchMyInterviews()
    }

  }, [token, user.id, user.role]);

  useEffect(() => {
    setInterviewsOnPage([...interviews]);
    setInterviewsOnPageFiltered([...filteredBy]);
    function paginateInterviews() {
      if (!isFiltered) {
        const firstCardOnPage = basicFirst;
        const lastCardOnPage = basicFirst + basicRows;
        const paginatedCards: ICreateInterviewDTO[] = interviewsOnPage.slice(firstCardOnPage, lastCardOnPage);
        setPaginatedInterviews(paginatedCards);
      } else {
        const firstCardOnPage = basicFirst;
        const lastCardOnPage = basicFirst + basicRows;
        const paginatedCards: ICreateInterviewDTO[] = interviewsOnPageFiltered.slice(firstCardOnPage, lastCardOnPage);
        setPaginatedFilteredInterviews(paginatedCards);
      }
    }
    paginateInterviews()
  }, [interviews, interviewsOnPage, interviewsOnPageFiltered, filteredBy, basicFirst, basicRows, isFiltered]);

  const onsubmitOfflineInterviews = async () => {
    const token = localStorage.getItem('@Safety:token') || "";

    try {
      const checkConnection = await api.get('/interviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (checkConnection.status === 200) {
        submitOfflineInterviews()
      }
    } catch (error) {

      addToast({
        type: 'error',
        title: 'Sem Conexão',
        description: 'Sem Internet ou o banco de dados está temporariamente inacessível.',
      });

    }
  }


  const onPageChange = (e: PaginatorPageState) => {
    setPaginatorState(e)
    setBasicFirst(e.first)
    setBasicRows(e.rows)
  }


  const selectInterviewPerProject = function (name: string) {
    return perProject[name];
  }

  function onClick(project: string) {
    if (project === 'all') {
      setIsFiltered(false);
    } else {
      const selected = selectInterviewPerProject(project);
      setFilteredBy(selected)
      setIsFiltered(true);
    }
  }

  const perProject = interviews.reduce((acc, obj) => {

    let project_name_capitalize = (str: string): string => {
      return str
        .split(' ')
        .map(word => word
          .split('')
          .map((letter, index) => {
            if (index === 0) {
              return letter.toUpperCase();
            } else {
              return letter.toLowerCase();
            }
          })
          .join('')
        )
        .join(' ')
    }

    let capitalized = project_name_capitalize(obj.project_name);

    if (!Object.keys(acc).includes(capitalized)) {
      acc[capitalized] = [obj]
    } else {
      acc[capitalized].push(obj)
    }
    return acc;
  }, {} as { [key: string]: ICreateInterviewDTO[] });

  return (
    <>
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
              {hasPermission(user.role, Actions.CREATE_INTERVIEW) ?
                <StyledLink to="/accept">Entrevista</StyledLink>
                : null}
              {hasPermission(user.role, Actions.CREATE_PROJECT) ?
                <StyledLink to="/project">Projeto</StyledLink>
                : null}
              <StyledLink to="/interviewers">Pesquisadores</StyledLink>
            </BigScreenLinkContainer>

            <BurguerMenu />

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </HeaderContent>
        </Header>

        <SubHeader>
          {hasPermission(user.role, Actions.VIEW_ALL_INTERVIEWS) ? <ListTitle>Entrevistas</ListTitle> : <ListTitle>Minhas Entrevistas</ListTitle>}

          <FilterContainer>
            <h2>Projetos</h2>
            <button onClick={() => onClick("all")}>Todos</button>
            <ul>{Object.keys(perProject).map(project => <button key={project} onClick={() => onClick(project)}>{project}</button>)}
            </ul>
          </FilterContainer>

        </SubHeader>

        {hasPermission(user.role, Actions.VIEW_ALL_INTERVIEWS) && (
          <>
            <Counter>
              <div>Entrevistas realizadas: <strong>{isFiltered ? filteredBy.length : interviews.length}</strong></div>
              <div>Entrevistas <strong>offline</strong> realizadas: <strong>{Object.keys(offlineInterviews).length}</strong><OfflineButton onClick={onsubmitOfflineInterviews}>Enviar</OfflineButton></div>
            </Counter>
          </>
        )}

        {!hasPermission(user.role, Actions.VIEW_ALL_INTERVIEWS) && (
          <>

            <Counter>
              <div>Você já realizou <strong>{isFiltered ? filteredBy.length : interviews.length}</strong> {interviews.length === 1 ? 'entrevista' : 'entrevistas'}
              </div>
              <div>Entrevistas <strong>offline</strong> realizadas: <strong>{Object.keys(offlineInterviews).length}</strong><OfflineButton onClick={onsubmitOfflineInterviews}>Enviar</OfflineButton></div>
            </Counter>

          </>
        )}

        <BadgeContainer>
          {isLoading ?
            <Spinner /> :
            isFiltered ?
              paginatedFilteredInterviews.map((interview) => {

                return <InterviewBage key={interview.id} interview={interview} />;
              }) :

              paginatedInterviews.map((interview) => {

                return <InterviewBage key={interview.id} interview={interview} />;
              })}
        </BadgeContainer>

      </Container>
      <Paginate
        totalCards={isFiltered ? filteredBy.length : interviews.length}
        onPageChange={onPageChange}
      >
        { }
      </Paginate>
    </>
  );
};

export default Dashboard;
