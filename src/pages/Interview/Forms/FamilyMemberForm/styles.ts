import styled from 'styled-components';
import { Form } from '@unform/web';

export const StyledFamilyForm = styled(Form)`
  display: grid;
  justify-items: center;
  grid-gap: 20px;
  padding: 0 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 20px;
  border-top: 1px solid #dedede;

  section {
    border-top: 1px solid #ff9000;
    padding: 5px;
    max-width: 360px;
  }
  @media screen and (max-width: 600px) {
    section: {
      margin: 0 15px;
    }
    section:nth-child(2n) {
      border-right: none;
      border-left: none;
      padding: 0;
    }
  }
`;

export const Label = styled.label`
  text-align: left;
  display: block;
  margin-bottom: 10px;
  color: #59748c;
  margin-top: 20px;

  strong {
    display: block;
    border-bottom: 1px solid #dedede;
  }

  span {
    margin-right: 10px;
  }
`;

export const Section = styled.section``;
