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
      <AnchorLink href="#person">Pessoa</AnchorLink>
      <AnchorLink href="#family">Família</AnchorLink>
      <AnchorLink href="#household">Residência</AnchorLink>
      <AnchorLink href="#address">Endereço</AnchorLink>
    </MenuSpy>
  );
};

export default ScrollSpy;
