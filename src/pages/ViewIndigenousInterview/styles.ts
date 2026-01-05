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
  flex-wrap: wrap;
  gap: 10px;

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    height: auto;
    width: auto;
    padding: 10px 16px;
    margin-top: 0;
    font-size: 14px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;

  h1 {
    color: #59748c;
    font-size: 24px;
    margin: 0;
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    order: -1;
  }
`;

export const StatusBadge = styled.span<{ isOffline: boolean }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${props => props.isOffline ? '#ff9800' : '#4caf50'};
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 9px;
    padding: 5px 10px;
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

export const MoradoresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

export const MoradorCard = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;

  ${FieldLabel} {
    font-size: 14px;
    margin-bottom: 10px;
    color: #59748c;
  }

  ${Field} {
    margin-bottom: 10px;
  }
`;

