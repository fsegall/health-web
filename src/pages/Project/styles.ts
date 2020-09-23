import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';

export const Container = styled.div``;
export const Title = styled.h2`
  color: #59748c;
  padding: 20px;
  font-size: 24px;
  text-align: center;
`
export const StyledForm = styled(Form)`
  display: grid;
  grid-gap: 20px;
  padding: 0 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 20px;
  border-top: 1px solid #dedede;
  section:nth-child(2n) {
    border-right: 1px solid #ff9000;
    border-left: 1px solid #ff9000;
    padding: 0 20px;
  }
  @media screen and (max-width: 600px) {
    section: {
      margin: 0 15px;
    }
    section:nth-child(2n) {
      border-right: none;
      border-left: none;
      padding: 0;
    }
  }
`;


export const Label = styled.label`
  text-align: left;
  display: block;
  margin-bottom: 10px;
  color: #59748c;
  margin-top: 20px;

  strong {
    display: block;
    border-bottom: 1px solid #dedede;
  }

  span {
    margin-right: 10px;
  }
`;

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
