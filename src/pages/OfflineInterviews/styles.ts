import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    text-align: center;
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