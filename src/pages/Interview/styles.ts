import styled from 'styled-components';
import { shade } from 'polished';

interface containerProps {
  offline: boolean;
}
export const Container = styled.div<containerProps>`
${props => props.offline ? 'border: 3px solid red;' : ''}
  text-align: center;
`;

export const SubmittedContainer = styled.div`
  text-align: left;
  color: #59748c;
  opacity: 0.6;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
`;

export const EditInterviewCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
`;

export const Header = styled.h1`
  padding: 10px 0;
  color: #59748c;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    text-decoration: none;
    color: #59748c;
    font-weight: bold;
    &:hover {
      opacity: 0.8;
    }
  }

  @media screen and (max-width: 600px) {
    display: block;
  }

  span {
    color: #ff9000;
  }
`;

export const SectionTitle = styled.h2`
  padding: 10px 0;
  text-align: left;
  color: #59748c;
  margin-left: 30px;
  display: flex;
  align-items: center;
`;

export const SectionTitleGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center
`;

export const ResponsiveMenu = styled.div`
  display: none;
  z-index: 999;
  @media (max-width: 1026px) {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
    color: #8d8d8d;
    position: fixed;
    right: 0;
    top: 10;
  }
`;

export const ButtonsContainer = styled.div`
display: flex;
align-items: center;
  @media screen and (max-width: 600px) {
    display:flex;
    justify-content: space-between;
  }

`;

export const ResetButton = styled.button`
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
  margin-left: 2rem;
  @media screen and (max-width: 600px) {
    margin: 1.5rem;
  }

`;

export const OfflineLabel = styled.label<containerProps>`
${props => props.offline ? 'color: #c2024b' : ''};
  margin: 0.5rem;
  @media screen and (max-width: 600px) {
    margin-left: 3rem;
    margin-right:0;
  }

`;
