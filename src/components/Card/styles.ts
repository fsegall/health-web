import styled from 'styled-components';
import { darken } from 'polished';


interface HeaderProps {
  hasAvatar: boolean;
}


export const Container = styled.div`
  display: flex;
  justify-content: center;
  div {
    ul {
      list-style-type: none;
    }
  }
`;



export const CardContainer = styled.div`
  max-width: 400px;
  padding: 15px 20px;
  box-shadow: 1px 1px 2px 2px rgba(204, 215, 219, 0.6);
  border: 0;
  border-radius: 4px;
  margin: auto;
  margin: 10px;
  color: #2a2a2a;
  border-left: 4px solid #ff9000;
  span {
    font-weight: bold;
  }
`;

export const CardHeader = styled.div<HeaderProps>`
  color: #59748c;
  font-weight: bold;

  display: flex;
  justify-content: ${({ hasAvatar }) => hasAvatar ? 'flex-start' : 'space-between'};
  align-items: center;
  margin-bottom: 20px;

  a {
    color: #59748c;
    text-decoration: none;
    &:hover {
      color: ${darken(0.2, '#59748c')};
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  color: #59748c;


  div {
    margin-bottom: 20px;
    ul {
      list-style-type: none;

      li {
        padding: 5px 0;

      }
    }
  }
  a {
    color: #59748c;
    display: block;
    padding: 20px;

    &:hover {
      color: ${darken(0.2, '#59748c')};
    }
  }
`;

export const Avatar = styled.img`
    margin-right: 20px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    display: inline;

`;
