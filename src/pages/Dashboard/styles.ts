import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

export const Container = styled.div``;

export const BigScreenLinkContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

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

export const SubHeader = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
@media (min-width: 768px) {
  padding: 0 20px;
  }

`;

export const ListTitle = styled.h2`
  padding: 8px 0;
  color: #59748c;
  span {
    color: #ff9000;
  }

`;

export const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr ));
  justify-content: space-around;
`;

export const StyledLink = styled(Link)`
  margin-left: 40px;
`;

export const FilterButton = styled.button`
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
  @media (min-width: 768px) {
    margin-left: auto;
  }


`;

