import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ICreateInterviewDTO from '../Interview/dtos/ICreateInterviewDTO';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
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
  FilterContainer
} from './styles';
import BurguerMenu from '../../components/BurguerMenu';
import InterviewBage from '../../components/interviewBadge';
import logo from '../../assets/logo_transparent.png';
import api from '../../services/api';
import Spinner from '../../components/Spinner';
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { signOut, user, token } = useAuth();
  const [interviews, setInterviews] = useState<ICreateInterviewDTO[]>([]);
  const [filteredBy, setFilteredBy] = useState<ICreateInterviewDTO[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [offlineInterviews, setOfflineInterviews] = useState<{ [key: string]: ICreateOfflineInterviewDTO }>(() => {
    const interviews = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');
    return interviews;
  });

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
    }
    if (hasPermission(user.role, Actions.VIEW_ALL_INTERVIEWS)) {
      fetchAllInterviews()
    } else {
      fetchMyInterviews()
    }

  }, [token, user.id, user.role]);

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
            <StyledLink to="/accept">Faça uma entrevista</StyledLink>
            {hasPermission(user.role, Actions.CREATE_PROJECT) ? <StyledLink to="/project">Adicione um projeto</StyledLink> : null}
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
            <div>Entrevistas <strong>offline</strong> realizadas: <strong>{Object.keys(offlineInterviews).length}</strong></div>
          </Counter>
        </>
      )}

      {!hasPermission(user.role, Actions.VIEW_ALL_INTERVIEWS) && (
        <>

          <Counter>
            <div>Você já realizou <strong>{isFiltered ? filteredBy.length : interviews.length}</strong> {interviews.length === 1 ? 'entrevista' : 'entrevistas'}
            </div>
            <div>Entrevistas <strong>offline</strong> realizadas: <strong>{Object.keys(offlineInterviews).length}</strong></div>
          </Counter>

        </>
      )}

      <BadgeContainer>
        {isLoading ?
          <Spinner /> :
          isFiltered ?
            filteredBy.map((interview) => {
              return <InterviewBage key={interview.id} interview={interview} />;
            }) :
            interviews.map((interview) => {
              return <InterviewBage key={interview.id} interview={interview} />;
            })}
      </BadgeContainer>
    </Container>
  );
};
export default Dashboard;
