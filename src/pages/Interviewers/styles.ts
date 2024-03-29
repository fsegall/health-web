import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

export const Container = styled.div``;

export const BigScreenLinkContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Header = styled.div`
  padding: 30px 0;
  text-align: center;
  color: #59748c;
  padding: 30px 0;

  background: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  h1{
    font-size: 20px
  }
  div {
    position: absolute;
    left: 0;
    svg {
    display: flex;
    justify-self: flex-start;
    align-self: center;
    color: #fff;
    margin-left: 20px;
    }
  }


  span {
    color: #ff9000;
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
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
`;

export const Profile = styled.div`

  @media (max-width: 768px) {
    display: none;
  }


  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #fff;
    }
    strong {
      color: #59748c;
    }
  }
`;

export const ListTitle = styled.h2`
  padding: 8px 0;
  color: #59748c;
  margin-left: 20px;
  span {
    color: #ff9000;
  }
  display: inline-flex;

`;

export const StyledList = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr ));
  justify-content: space-around;
`;

export const StyledLink = styled(Link)`
  margin-left: 40px;
`;

export const FilterButton = styled.button`
  padding: 5px 10px;
  margin-top: 4px;
  margin-right: 4px;
  background: #59748c;
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#59748c')};
  }
  float: right;
`;

export const Button = styled.button`
  background: #59748c;
  border-radius: 4px;
  padding: 5px 10px;
  border: 0;
  color: #fff;
  font-weight: 500;
  transition: background-color 0.2s;
  margin-right: 0.5rem;

  &:hover {
    background: ${shade(0.2, '#59748c')};
  }`;

export const FormContainer = styled.div`
  padding: 1rem;
  color: #59748c;
  font-weight: bold;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: flex-end;
  @media (max-width: 768px) {
    margin: 5px 15px;
    justify-content: space-evenly;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 210px;
`;
