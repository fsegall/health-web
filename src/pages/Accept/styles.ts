import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 30px 0;
  text-align: center;
  color: #fff;
  padding: 32px 0;
  background: #999;
  button {
    z-index: 3;
  }
`;

export const HeaderContent = styled.div`
  z-index: 1;
  max-width: 1120px;
  max-height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: #59748c;
    font-weight: bold;
    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    margin-top: 10px;
    &:hover {
      opacity: 0.3;
    }
  }
  }

  > img {
    z-index: 2;
    height: 120px;
  }

  > button {
    z-index: 2;
    margin-left: auto;
    background: transparent;
    border: 0;
   @media (max-width: 768px) {
    display: none;
  }
  }

  svg {
    color: #fff;
    margin-left: 20px;
    display: flex;
    justify-self: flex-start;
    align-self: center;
  }
`;

export const SubHeader = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
@media (min-width: 768px) {
  padding: 0 25px;
  }

`;

export const ListTitle = styled.h2`
  padding: 8px 0;
  color: #59748c;
  margin-left: 20px;
`;



export const Button = styled.button`
  background: #59748c;
  height: 56px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  max-width: 500px;
  float: right;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#59748c')};
  }`;

export const Aceite = styled.div`
padding-left: 2rem;
padding-right: 2rem;
color: #59748c
`;

export const FormContainer = styled.div`
padding: 2rem;
color: #59748c;
font-weight: bold;
font-size: 1.2rem;
`;

export const CheckboxContainer = styled.div`
display: flex;
align-items: center;
gap: 2rem;
margin-bottom: 1rem
`;
