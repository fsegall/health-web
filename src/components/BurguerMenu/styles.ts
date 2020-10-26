import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
// Menu hamburguer para mobile
interface MenuProps {
  open: boolean;
}

export const StyledBurger = styled.div<MenuProps>`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#ccc' : '#59748c'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

export const SlideLinkContainer = styled.div<MenuProps>`

    @media (min-width: 768px) {
      display: none;
    }

    /* first, make our dropdown cover the screen */

    /* Animate still not working */
    /* transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(100%)'}; */

    transition: transform 1s ease-in-out, opacity 1s ease-in-out;

    ${props => props.open ? css`@media (max-width: 768px) {
    z-index: 0; /* we're gonna avoid using -1 here, since it could position our navbar below other content on the page as well! */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    /* fix nav height on mobile safari, where 100vh is a little off */
    height: -webkit-fill-available;

    /* then, arrange our links top to bottom */
    display: flex;
    flex-direction: column;
    /* center links vertically, push to the right horizontally.
       this means our links will line up with the rightward hamburger button */
    justify-content: center;
    align-items: flex-end;

    /* add margins and padding to taste */
    margin: 0;
    padding-left: 7vw;
    padding-right: 7vw;
    background: #59748c;
    visibility: visible;
    opacity: 1;
    transform: translateX(0%);
    }` : css`@media (max-width: 768px) {
      visibility: hidden;
      opacity: 0;
      transform: translateX(-100%);
    }`}
`;

export const StyledLink = styled(Link)`
  margin-left: auto;
`;
