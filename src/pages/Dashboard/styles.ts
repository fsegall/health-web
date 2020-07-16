import styled from 'styled-components';

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
  margin: o auto;
  display: flex;
  align-items: center;
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
