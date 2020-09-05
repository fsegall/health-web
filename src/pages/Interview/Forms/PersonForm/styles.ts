import styled from 'styled-components';
import { Form } from '@unform/web';

export const StyledForm = styled(Form)`
  display: grid;
  grid-gap: 20px;
  padding: 0 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 20px;
  border-top: 1px solid #dedede;
  section:nth-child(2n) {
    border-right: 1px solid #ff9000;
    border-left: 1px solid #ff9000;
    padding: 0 20px;
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

export const CheckBoxContainer = styled.div`
  text-align: left;
  input {
    margin-right: 10px;
  }
  label {
    color: #59748c;
    display: block;
    padding: 10px;
  }
`;
