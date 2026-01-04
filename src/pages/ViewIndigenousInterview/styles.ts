import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    color: #59748c;
    font-size: 24px;
    margin: 0;
  }

  button {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  color: #59748c;
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ff9000;
`;

export const Field = styled.div`
  display: flex;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

export const FieldLabel = styled.strong`
  color: #59748c;
  min-width: 200px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

export const FieldValue = styled.span`
  color: #333;
  flex: 1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  p {
    color: #59748c;
    font-size: 18px;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 20px;

  p {
    color: #c2024b;
    font-size: 18px;
  }
`;

