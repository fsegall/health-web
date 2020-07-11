import styled from 'styled-components';
import { Form } from '@unform/web';
export const StyledForm = styled(Form)`
  display: grid;
  grid-gap: 20px;
  padding: 0 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  section:nth-child(2n) {
    border-right: 1px solid #59748c;
    border-left: 1px solid #59748c;
    padding: 0 20px;
  }
  @media screen and (max-width: 600px) {
    section:nth-child(2n) {
      border-right: none;
      border-left: none;
      padding: 0;
    }
  }
`;

export const Container = styled.div`
  text-align: center;
`;

export const Header = styled.h1`
  padding: 30px 0;
  color: #59748c;
  span {
    color: #ff9000;
  }
`;

export const SectionTitle = styled.h2`
  padding: 20px 0;
`;
