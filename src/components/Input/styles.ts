import styled from 'styled-components';
import { lighten } from 'polished';
export const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  border: 1px solid #fff;
  padding: 16px;
  width: 100%;
  transition: 0.5s;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  input {
    color: #f4ede8;
    flex: 1;
    background: transparent;
    border: 0;
    transition: 0.3s;

    &::placeholder {
      color: '#666360';
    }
    &:focus {
      border-bottom: 1px solid ${lighten(0.3, '#59748c')};
      padding-bottom: 5px;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
