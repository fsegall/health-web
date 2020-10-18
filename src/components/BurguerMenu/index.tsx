import React, { useState } from 'react';
import { StyledBurger } from './styles';
import MobileNav from './MobileNav';

const Burger: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <MobileNav open={open} />
    </>
  )
}
export default Burger
