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
    margin-left: 20px;
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
justify-content: space-between;
align-items: center;
h2 {
  margin: auto;
}
@media (min-width: 768px) {
  padding: 0 25px;
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
  color: #59748c;
  text-align: center;
`;

export const StyledItem = styled.ul`
  color: #59748c;
  text-align: center;
  padding: 0.2rem;
`;

export const BadgeContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
justify-items: center;
gap: 1rem;
`;

export const StyledLink = styled(Link)`
  margin-left: 40px;
`;

export const Counter = styled.div`
  color: #59748c;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    justify-content: flex-end;
    padding-right: 25px;
  }

  div{
    display: flex;
    padding: 20px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-shadow: 1px 2px 1px #ccc;
    display: inline;
    height: 65px;
    @media (max-width: 768px) {
      height: 80px;
    }
    width: fit-content;
    margin-bottom: 30px;
  }
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

export const FilterContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  h2 {
    color: #59748c;
    margin-right: 1rem;
  }
  display: flex;
  justify-content: flex-end;
  button {
    background: #999;
    border-radius: 4px;
    color: #fff;
    height: 2rem;
    padding: 5px 10px;
    border: none;
    margin: 0 2px 0 2px;
    &:hover {
    background: ${shade(0.2, '#999')};
  }
  }
`;

export const OfflineButton = styled.button`
    background: #59748c;
    border-radius: 4px;
    color: #fff;
    border: none;
    padding: 2px 4px;
    margin-left: 10px;
    @media (max-width: 768px) {
      margin-top: 6px;
    }
    &:hover {
    background: ${shade(0.2, '#59748c')};
  }
`;

export const IndigenousSection = styled.div`
  padding: 30px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const IndigenousCard = styled.div<{ isInterviewer: boolean }>`
  width: 100%;
  max-width: 400px;
  height: 100%;
  p {
    line-height: 23px;
  }
  text-align: left;
  background-color: ${props => props.isInterviewer ? 'rgb(89, 116, 140, 0.7)' : 'rgb(89, 116, 140, 0.5)'};
  padding: 10px 20px;
  border-radius: 4px;
  border-left: 6px solid gray;
  box-shadow: 1px 1px 2px 2px rgba(204, 215, 219, 0.6)
`;

export const FilterSection = styled.div`
  width: 100%;
  padding: 10px 30px;
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

