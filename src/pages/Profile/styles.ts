import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
  grid-auto-rows: auto;
  justify-items: stretch;

  section:first-child {
    border: 1px solid #59748c;
    padding: 30px 0;
    height: 400px;
    margin: 20px;
    display: flex;
    border-radius: 4px;
    display: grid;
    justify-items: center;
  }

  section:nth-child(2n) {
    padding: 30px 0;
    height: 400px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
  }
`;

export const Container = styled.div`
  color: #59748c;
`;

export const Header = styled.h1`
  padding: 30px 0;
  text-align: center;
  span {
    color: #ff9000;
  }
`;

export const SectionTitle = styled.h2``;
