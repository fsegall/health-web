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
        <div>

          Você está sendo convidado (a) a participar, como voluntário (a) de nossa pesquisa, por meio de entrevista. Este projeto tem por objetivo avaliar a insegurança alimentar durante a pandemia do novo coronavírus ou Covid-19, em uma pesquisa nacional. Serão algumas perguntas sobre você e seus familiares outras a casa, do trabalho, da saúde e da alimentação.

          Todas as informações que você fornecer serão confidenciais e os resultados que serão divulgados não conterão quaisquer dados pessoais de identificação. A qualquer momento você poderá solicitar maiores esclarecimentos, recusar-se a participar ou desistir da entrevista. Mas, se concordar em respondê-la, sua participação contribuirá para melhorar as ações de enfrentamento da pandemia e de seus efeitos sobre a alimentação dos brasileiros.
          <div style={{ padding: '1rem' }}>
            Em caso de dúvidas sobre a pesquisa, você poderá entrar em contato com a Rede PENSANN através do e-mail: ...@rede.com.
          </div>

          <strong>Agradecemos, desde já, sua valorosa colaboração.</strong>
        </div>
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
