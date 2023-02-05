import styled from 'styled-components';
import { colors } from '../../utils/colors/theme';

export const PaginationButton = styled.button.attrs((props: { current: boolean }) => props)`
  border: none;
  padding: 5px 10px;
  opacity: ${props => props.disabled ? '0.5' : '1'};
  cursor: ${props => props.disabled ? 'auto' : 'pointer'};
  background-color: ${props => props.current ? colors?.secundary : '#FAFAFA'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #D8D8D8;
`;

export const SelectPagination = styled.select`
  border: none;
  padding: 5px 10px;
  display: flex;
  min-height: 38px;
  font-size: 14px;
  background-color: #FAFAFA;
  border: 1px solid #D8D8D8;
`;
