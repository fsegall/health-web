import React, { useState, useEffect } from 'react';
import ICreateInterviewDTO from '../Interview/dtos/ICreateInterviewDTO';
import { useAuth } from '../../hooks/auth';
import Paginate from '../../components/Paginate';
import hasPermission, { Actions } from '../../authorization/constants';
import {
  Container,
  Counter,
  ListTitle,
  SubHeader,
  BadgeContainer,
  FilterContainer,
  OfflineButton,
} from './styles';
import InterviewBage from '../../components/interviewBadge';
import api from '../../services/api';
import Spinner from '../../components/Spinner';
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';
// import submitOfflineInterviews from '../../services/offlineInterviewsService';
import { useToast } from '../../hooks/toast';
import { useHistory } from 'react-router-dom';

interface PaginatorPageState {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isProcessingOffline, setIsProcessingOffline] = useState(false);
  const { user, token } = useAuth();
  const [interviews, setInterviews] = useState<ICreateInterviewDTO[]>([]);
  const [filteredBy, setFilteredBy] = useState<ICreateInterviewDTO[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [offlineInterviews] = useState<{ [key: string]: ICreateOfflineInterviewDTO }>(() => {
    const interviews = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');
    return interviews;
  });
  // Error offline counter
  const [offlineInterviewsErrorsCounter] = useState(() => {
    const counter = localStorage.getItem('@Safety:errorCounter') || '0';
    return counter;
  });
  //
  const [basicFirst, setBasicFirst] = useState(0);
  const [basicRows, setBasicRows] = useState(10);
  const [, setPaginatorState] = useState({} as PaginatorPageState);
  const [paginatedInterviews, setPaginatedInterviews] = useState<ICreateInterviewDTO[]>([]);
  const [paginatedFilteredInterviews, setPaginatedFilteredInterviews] = useState<ICreateInterviewDTO[]>([]);
  const [interviewsOnPage, setInterviewsOnPage] = useState<ICreateInterviewDTO[]>([]);
  const [interviewsOnPageFiltered, setInterviewsOnPageFiltered] = useState<ICreateInterviewDTO[]>([]);

  // const { addToast } = useToast()
  const history = useHistory()

  useEffect(() => {

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

    setIsLoading(true);
    if (hasPermission(user.role, Actions.VIEW_ALL_INTERVIEWS)) {
      fetchAllInterviews()
    } else {
      fetchMyInterviews()
    }
  }, [token, user.id, user.role]);

  useEffect(() => {
    if (interviews) {
      setInterviewsOnPage([...interviews]);
    }
  }, [interviews])


  useEffect(() => {
    if (filteredBy) {
      setInterviewsOnPageFiltered([...filteredBy]);
    }
  }, [filteredBy])

  useEffect(() => {
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
    if (interviewsOnPage || interviewsOnPageFiltered) {
      paginateInterviews()
    }
  }, [interviewsOnPage, interviewsOnPageFiltered, basicFirst, basicRows, isFiltered])

  const onsubmitOfflineInterviews = () => {
    history.push('/offline')
    // const token = localStorage.getItem('@Safety:token') || "";

    // try {
    //   const checkConnection = await api.get('/interviews', {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })

    //   if (checkConnection.status === 200) {
    //     setIsProcessingOffline(true);
    //     await submitOfflineInterviews()
    //     setIsProcessingOffline(false);
    //   }
    // } catch (error) {

    //   addToast({
    //     type: 'error',
    //     title: 'Sem Conexão',
    //     description: 'Sem Internet ou o banco de dados está temporariamente inacessível.',
    //   });

    // }
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
              <div>Erros: <strong>{offlineInterviewsErrorsCounter}</strong></div>
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
        first={basicFirst}
        rows={basicRows}
        onPageChange={onPageChange}
      >
        { }
      </Paginate>
    </>
  );
};

export default Dashboard;
