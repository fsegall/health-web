import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AnimationContainer, Background, SignUpRules } from './styles';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  FiSmartphone,
  FiBox,
} from 'react-icons/fi';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  organization_name: string;
  telephone_number: string;
}

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          organization_name: Yup.string(),
          telephone_number: Yup.string().required(
            'Digite o seu número de telefone',
          ),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Senhas devem ser iguais')
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        delete data.password_confirmation

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer o seu logon no Safety!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          console.log('error', error);
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          addToast({
            type: 'error',
            title: error.errors[0],
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
          });
          return;
        }
        console.log('error', error);
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Safety logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça o seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input
              name="organization_name"
              icon={FiBox}
              placeholder="Organização"
            />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="telephone_number"
              icon={FiSmartphone}
              placeholder="Telefone"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para o logon
          </Link>
        </AnimationContainer>
      </Content>
      <SignUpRules>O aplicativo é de livre acesso após cadastro. Entretanto, para utilização do app em pesquisas, é necessário estar filiado(a) à Rede PenSSAN e ter submetido projeto para análise e aprovação prévia para o email:
        <strong>rbpssan@gmail.com</strong>
      </SignUpRules>

    </Container >
  );
};

export default Signup;
