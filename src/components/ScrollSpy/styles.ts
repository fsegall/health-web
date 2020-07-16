import styled from 'styled-components';

interface MenuSpyProps {
  open: boolean;
}

export const MenuSpy = styled.ul<MenuSpyProps>`
  display: none;

  @media (max-width: 1026px) {
    display: block;
    position: fixed;
    top: 10;
    right: 0;
    background-color: #fff;
    width: inherit;
    margin-top: 2rem;
    a {
      display: ${(props) => (props.open ? 'block' : 'none')};
      padding: 0.2rem 0.4rem;
      text-decoration: none;
      color: #59748c;
      &:nth-child(even) {
        background-color: #f5f5f5;
      }
    }
  }
`;
