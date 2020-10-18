import styled from 'styled-components';

export const DefaultContent = styled.div`
  color: #59748c;
  padding: 20px;
`;

export const HouseList = styled.ul`
  color: #59748c;
  line-height: 30px;

  font-weight: bold;
  font-size: 18px;
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
