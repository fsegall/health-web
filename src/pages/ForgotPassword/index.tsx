import React, { useState, useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link /* , useHistory */ } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import { Container, Content, AnimationContainer, Background } from './styles';
import { FiLogIn, FiMail } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  // const history = useHistory();

  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        // recuperação de senha

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Email de recuperação de senha enviado',
          description:
            'Enviamos um email para confirmar a recuperação de senha, cheque a sua caixa de mensagens',
        });

      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'info',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar recuperar a senha, tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Safety logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar a senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
