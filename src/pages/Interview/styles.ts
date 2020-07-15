import styled from 'styled-components';
import { Form } from '@unform/web';
import { shade } from 'polished';
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
  padding: 10px 0;
  text-align: left;
  color: #59748c;
  margin-left: 30px;
  display: flex;
  align-items: center;
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

export const SelectorContainer = styled.section`
  margin-bottom: 20px;
`;

export const Counters = styled.div`
  display: flex;
  justify-self: flex-start;
  margin-left: 20px;
`;

export const CounterButton = styled.button`
  background: #59748c;
  width: 25px;
  border-radius: 10px;
  margin: 10px 5px;
  border: 0;
  color: #fff;
  padding: 4px;
  font-weight: 700;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#59748c')};
  }
`;
