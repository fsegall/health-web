import styled from 'styled-components';
import { shade } from 'polished';
export const Container = styled.button`
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
`;
