import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { MenuSpy } from './styles';

// Menu hamburguer para mobile
interface ScrollProps {
  open: boolean;
}

const ScrollSpy: React.FC<ScrollProps> = ({ open }) => {
  return (
    <MenuSpy open={open}>
      <AnchorLink href="#person">Dados Pessoais</AnchorLink>
      {/* <AnchorLink href="#family">Família</AnchorLink> */}
      <AnchorLink href="#household">Domicílio</AnchorLink>
      <AnchorLink href="#address">Endereço</AnchorLink>
      <AnchorLink href="#interview">Entrevista</AnchorLink>
    </MenuSpy>
  );
};

export default ScrollSpy;
