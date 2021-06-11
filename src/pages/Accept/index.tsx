import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import {
  Container,
  Header,
  HeaderContent,
  Aceite,
  FormContainer,
  CheckboxContainer,
  Button,
  ListTitle,
  SubHeader,
} from './styles';

import logo from '../../assets/logo_transparent.png';
import CheckboxInput from '../../components/Checkbox';

const Accept: React.FC = () => {
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const [accept, setAccept] = useState(false);
  const history = useHistory();
  function onSubmit(e: React.SyntheticEvent) {
    if (accept) {
      history.push('interview')
    } else {
      e.preventDefault();
      addToast({
        type: 'error',
        title: 'Você deve aceitar os termos de privacidade da pesquisa para continuar.',
        description:
          'Você deve aceitar os termos de privacidade da pesquisa para continuar.',
      })
    }
  }
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="Safety" />

          <button type="button" onClick={signOut} >
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      < SubHeader >
        <ListTitle>Termo de Aceite</ListTitle>
      </SubHeader>
      <Aceite>
        <p>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit mollis eleifend. Phasellus vitae ipsum elementum, interdum quam ac, congue dui. Aliquam eget sodales lectus, vel aliquam massa. Proin non porta urna, ac rhoncus quam. Duis non hendrerit ex. Fusce porttitor consequat interdum. Aenean nec mi id lacus mollis efficitur nec vitae nunc. Morbi nec nunc quis ante aliquam fermentum. Proin sit amet lacus eget odio tempus semper sed sit amet elit.

          Nullam mattis velit vitae mattis vehicula. Curabitur rutrum cursus erat, sed faucibus nibh egestas eu. Vivamus est massa, viverra ut cursus eget, mollis quis dolor. Nam ac scelerisque odio. Sed malesuada massa eu odio molestie, eu lobortis ante aliquet. Nam sit amet felis sed metus sodales porta. Ut iaculis, dolor quis sodales dapibus, erat felis ullamcorper nibh, at dapibus leo felis eu tellus. Maecenas sit amet odio at mi luctus malesuada sed ac velit. Aliquam malesuada quam eget erat porta vehicula. Donec sed malesuada augue. Nam non ligula sed eros malesuada rhoncus in non erat. Nam bibendum lacus nec leo dignissim posuere. Fusce id consectetur est.
        </p>
      </Aceite>
      <FormContainer>

        <form onSubmit={onSubmit}>
          <CheckboxContainer>
            <label>Eu aceito os termos da pesquisa</label>
            <input type="checkbox"
              name="Accept"
              onChange={() => setAccept(!accept)}
            />
          </CheckboxContainer>
          <Button type="submit">Prosseguir</Button>
        </form>
      </FormContainer>
    </Container >
  );

};

export default Accept;
