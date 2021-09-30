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

      {hasPermission(user.role, Actions.CREATE_PROJECT) && (<>
        <StyledLink to="/accept">Entrevista</StyledLink>
        <StyledLink to="/project">Projeto</StyledLink>
      </>
      )}
      <StyledLink to="/interviewers">Pesquisadores</StyledLink>
      <StyledLink to="/profile">Perfil</StyledLink>
      <a href="/" onClick={signOut}>
        Sair
      </a>
    </SlideLinkContainer>
  );

}

export default MobileNav;
