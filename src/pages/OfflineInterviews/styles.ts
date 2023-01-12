import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    text-align: center;
    padding: 30px;
`;
export const OfflineButton = styled.button`
    background: #59748c;
    border-radius: 4px;
    color: #fff;
    border: none;
    padding: 10px 15px;
    margin: 10px;
    @media (max-width: 768px) {
      margin-top: 6px;
    }
    &:hover {
    background: ${shade(0.2, '#59748c')};
  }
`;

export const CardSection = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  height: 100%;
  text-align: left;
  background-color: rgb(89, 116, 140, 0.7);
  padding: 10px 20px;
  border-radius: 4px;
  border-left: 6px solid gray;
  box-shadow: 1px 1px 2px 2px rgba(204, 215, 219, 0.6)
`;

export const SectionTitle = styled.h2`
  margin-top: 30px;
  text-align: left;
`;
