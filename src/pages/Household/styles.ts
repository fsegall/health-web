import styled from 'styled-components';

export const HouseholdContainer = styled.div`
display: grid;
grid-template-columns: 1fr 3fr;
`;

export const DefaultContent = styled.div`
  color: #59748c;
  padding: 20px;
`;

export const HouseList = styled.ul`

  padding-top: 10px;
  list-style-type: none;
  color: #59748c;
  line-height: 30px;

  font-weight: bold;
  font-size: 18px;
  li {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    margin-right: 20px;
    span {margin-left: 10px;}
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
