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
  BadgeContainer
} from './styles';
import BurguerMenu from '../../components/BurguerMenu';
import InterviewBage from '../../components/interviewBadge';
import logo from '../../assets/logo_transparent.png';
import api from '../../services/api';
import Spinner from '../../components/Spinner';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { signOut, user, token } = useAuth();
  const [interviews, setInterviews] = useState<ICreateInterviewDTO[]>([]);

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

  }, [token, user.id]);

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
        <ListTitle>Minhas Entrevistas</ListTitle>
      </SubHeader>

      <Counter><div>Você já realizou <strong>{interviews.length}</strong> {interviews.length === 1 ? 'entrevista' : 'entrevistas'}</div></Counter>
      <BadgeContainer>
        {isLoading ? <Spinner /> : interviews.map((interview) => {
          return <InterviewBage key={interview.id} interview={interview} />;
        })}
      </BadgeContainer>
    </Container>
  );
};
export default Dashboard;
