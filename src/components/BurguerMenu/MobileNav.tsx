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

        <StyledLink to="/accept">Entrevista</StyledLink>


      {hasPermission(user.role, Actions.CREATE_PROJECT) ?
        <StyledLink to="/project">Projeto</StyledLink>
        :
        null}
      <StyledLink to="/interviewers">Pesquisadores</StyledLink>
      <StyledLink to="/profile">Perfil</StyledLink>
      <StyledLink to="/" onClick={signOut}>
        Sair
      </StyledLink>
    </SlideLinkContainer>
  );

}

export default MobileNav;
