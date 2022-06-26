import styled from 'styled-components';
import { shade } from 'polished';
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;

  section:first-child {
    padding: 30px 0;
    height: 100%;
    margin: 20px;
    display: flex;
    border-radius: 4px;
    display: grid;
    justify-items: center;
  }

  section:nth-child(2n) {
    padding: 30px 0;
    height: 100%;
    margin-right: 20px;
    display: flex;
    justify-content: center;
  }
  form {
    width: 340px;
    text-align: center;

    h1 {
      color: #59748c;
      margin-bottom: 24px;
      display: grid;
      justify-content: start;
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

export const AvatarInput = styled.div`
  position: relative;
  img {
    border-radius: 50%;
    height: 100px;
    width: 100px;
    margin-bottom: 20px;
  }

  label {
    position: absolute;
    width: 33px;
    height: 33px;
    background: #ff9000;
    border-radius: 50%;
    border: 0;
    bottom: 24px;
    right: 32%;
    transition: background-color 0.2s;
    display: grid;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #59748c;
      cursor: pointer;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Divider = styled.div`
  height: 40px;
`;
