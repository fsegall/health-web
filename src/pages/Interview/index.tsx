import React from 'react';
import { StyledForm, Container, Header, SectionTitle } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        Safety <span>|</span> Interview
      </Header>
      <StyledForm onSubmit={() => {}}>
        <section>
          <SectionTitle>Section 1</SectionTitle>

          <Input name="test1" />
        </section>

        <section>
          <SectionTitle>Section 2</SectionTitle>
          <Input name="test2" />
        </section>

        <section>
          <SectionTitle>Section 3</SectionTitle>

          <Input name="test3" />
          <Button>Submit</Button>
        </section>
      </StyledForm>
    </Container>
  );
};

export default Dashboard;
