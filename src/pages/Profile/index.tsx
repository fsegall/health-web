import React from 'react';
import { Grid, Container, Header, SectionTitle } from './styles';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Profile: React.FC = () => {
  return (
    <Container>
      <Header>
        Safety <span>|</span> Profile
      </Header>
      <Grid>
        <section>
          <SectionTitle>Profile</SectionTitle>
        </section>

        <section>
          <SectionTitle>Update your Profile</SectionTitle>
        </section>
      </Grid>
    </Container>
  );
};

export default Profile;
