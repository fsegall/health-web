import React, { useRef, ChangeEvent, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Grid, Header, Divider, AvatarInput } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  FiMail,
  FiUser,
  FiLock,
  FiSmartphone,
  FiBox,
  FiCamera,
  FiChevronLeft,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  organization_name: string;
  telephone_number: string;
}

const Profile: React.FC = () => {
  const { user, token, updateUser } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const data = new FormData();
      if (e.target.files) {
        data.append('avatar', e.target.files[0]);
      }
      api
        .patch('users/avatar', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
    },
    [addToast, updateUser],
  );
  const handleSubmit = () => {}; /* useCallback(
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
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/users', data);

        console.log(response.data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer o seu logon no Safety!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'info',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
      console.log(data);
    },
    [addToast, history],
  ); */
  return (
    <>
      <Header>
        <Link to="/dashboard">
          <FiChevronLeft />
        </Link>
        Safety <span>|</span> Profile
      </Header>
      <Grid>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <AvatarInput>
            <img src={`http://localhost:3333/files/${user.avatar}`} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>{user.name}</h1>

          <Input
            name="name"
            icon={FiUser}
            placeholder="Nome"
            defaultValue={user.name}
          />
          <Input
            name="organization_name"
            icon={FiBox}
            placeholder="Organização"
            defaultValue={user.organization_name}
          />
          <Input
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            defaultValue={user.email}
          />

          <Input
            name="telephone_number"
            icon={FiSmartphone}
            placeholder="Telefone"
            defaultValue={user.telephone_number}
          />
          <Divider />
          <Input
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha antiga"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha nova"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmação da senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Grid>
    </>
  );
};

export default Profile;
