import styled from 'styled-components';

export const CardContainer = styled.div`
  height: 200px;
  width: 400px;
  padding: 15px 20px;
  box-shadow: 2px 2px 2px 2px #ccc;
  border-radius: 4px;
  margin: auto;
  margin: 10px;
`;

export const CardHeader = styled.div`
  color: #59748c;
  font-weight: bold;
  padding 20px;
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-bottom: 20px;
    ul {
      list-style-type: none;
      li {
        padding: 5px 0;
      }
    }
  }
`;
