import React from 'react';
import { SlideLinkContainer, StyledLink } from './styles'
import { useAuth } from '../../hooks/auth';
import hasPermission, { Actions } from '../../authorization/constants';

interface NavProps {
  open: boolean;
}

const MobileNav: React.FC<NavProps> = ({ open }) => {

  const { signOut, user } = useAuth();

  return (
    <SlideLinkContainer open={open}>
      <StyledLink to="/accept">Faça uma entrevista</StyledLink>
      {hasPermission(user.role, Actions.CREATE_PROJECT) && <StyledLink to="/project">Adicione um projeto</StyledLink>}
      <StyledLink to="/interviewers">Pesquisadores</StyledLink>
      <StyledLink to="/profile">Profile</StyledLink>
      <a href="/" onClick={signOut}>
        Signout
      </a>
    </SlideLinkContainer>
  );

}

export default MobileNav;
