import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const Container = styled.div``;

export const Header = styled.header`
  padding: 30px 0;
  text-align: center;
  color: #fff;
  padding: 32px 0;
  background: #999;
`;

export const HeaderContent = styled.div`
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

  > img {
    height: 120px;
  }
  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #fff;
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
`;

export const Profile = styled.div`
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
  padding: 30px 0;
  color: #59748c;
  margin-left: 20px;
  span {
    color: #ff9000;
  }
`;

export const StyledLink = styled(Link)`
  margin-left: auto;
`;
