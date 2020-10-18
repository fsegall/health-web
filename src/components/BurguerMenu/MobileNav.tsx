import React from 'react';
import { SlideLinkContainer, StyledLink } from './styles'
import { useAuth } from '../../hooks/auth';

interface NavProps {
  open: boolean;
}

const MobileNav: React.FC<NavProps> = ({ open }) => {

  const { signOut } = useAuth();

  return (
    <SlideLinkContainer open={open}>
      <StyledLink to="/interview">Faça uma entrevista</StyledLink>
      <StyledLink to="/project">Adicione um projeto</StyledLink>
      <StyledLink to="/profile">Profile</StyledLink>
      <a href="/" onClick={signOut}>
        Signout
      </a>
    </SlideLinkContainer>
  );

}

export default MobileNav;
