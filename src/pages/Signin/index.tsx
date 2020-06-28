import React from 'react';
import { Container, Content, Background } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Signin: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Safety logo" />
        <form>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci a minha senha</a>
        </form>
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default Signin;
