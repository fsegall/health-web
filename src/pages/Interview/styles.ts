import styled from 'styled-components';
import { shade } from 'polished';
export const Container = styled.div`
  text-align: center;
`;

export const SubmittedContainer = styled.div`
  text-align: left;
  color: #59748c;
  opacity: 0.6;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
`;

export const Header = styled.h1`
  padding: 30px 0;
  color: #59748c;
  display: flex;
  justify-content: space-around;

  a {
    text-decoration: none;
    color: #59748c;
    font-weight: bold;
    &:hover {
      opacity: 0.8;
    }
  }

  @media screen and (max-width: 600px) {
    display: block;
  }

  span {
    color: #ff9000;
  }
`;

export const SectionTitle = styled.h2`
  padding: 10px 0;
  text-align: left;
  color: #59748c;
  margin-left: 30px;
  display: flex;
  align-items: center;
`;

export const ResponsiveMenu = styled.div`
  display: none;
  z-index: 999;
  @media (max-width: 1026px) {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
    color: #8d8d8d;
    position: fixed;
    right: 0;
    top: 10;
  }
`;

export const ResetButton = styled.button`
  padding: 5px 10px;
  background: #59748c;
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#59748c')};
  }

`;
