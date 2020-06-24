import styled from 'styled-components';
import { shade, lighten } from 'polished';
import notebook from '../../assets/andrew-neel-cckf4TsHAuw-unsplash.jpg';
export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;

  img {
    height: 300px;
    width: 300px;
    margin-top: 20px;
  }

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      color: #59748c;
      margin-bottom: 24px;
    }

    input {
      background: #fff;
      color: #666360;
      border-radius: 10px;
      border: 0;
      padding: 16px;
      width: 100%;
      &:focus {
        border: 1px solid ${lighten(0.3, '#59748c')};
      }
      &::placeholder {
        color: '#666360';
      }
      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: #59748c;
      height: 56px;
      border-radius: 10px;
      border: 0;
      color: #fff;
      padding: 0 16px;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#59748c')};
      }
    }

    a {
      color: #666360;
      margin-top: 10px;
      display: block;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#666360')};
      }
    }
  }

  > a {
    color: #59748c;
    display: block;
    margin: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#59748c')};
    }
  }
`;
export const Background = styled.div`
  background: url(${notebook}) no-repeat center;
  background-size: cover;
`;
