import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import notebook from '../../assets/andrew-neel-cckf4TsHAuw-unsplash.jpg';
export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const Background = styled.div`
  background: url(${notebook}) no-repeat center;
  background-size: cover;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const topToBottom = keyframes`
  from {
    opacity:0;
    transform: translateY(-50px)
  } to {
    opacity:1;
    transform: translateY(0px)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${topToBottom} 1s;
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
