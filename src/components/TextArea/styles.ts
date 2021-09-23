import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
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
  ${(props) =>
    props.isFocused
      ? css`
          border: 1px solid #59748c;
        `
      : ''}
  input {
    color: #59748c;
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

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
