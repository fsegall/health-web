import React, { useRef, ChangeEvent, useCallback } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Grid, Header, Divider, AvatarInput } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
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


interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
  organization_name: string;
  telephone_number: string;
}
interface IRequest {
  user_id: string;
  name: string;
  email: string;
  organization_name: string;
  telephone_number: string;
  old_password?: string;
  password?: string;
}

const Profile: React.FC = () => {
  const { user, token, updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
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
    [addToast, updateUser, token],
  );
  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      console.log('submit');
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
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Confirmação incorreta'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), undefined],
              'A senha deve ser a mesma nos dois campos',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          organization_name,
          email,
          telephone_number,
          old_password,
          password,
        } = data;

        const requestBody: IRequest = {
          user_id: user.id,
          name,
          email,
          organization_name,
          telephone_number,
          ...(old_password ? { old_password, password } : {}),
        };

        const response = await api.put('/users', requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        updateUser(response.data);

        console.log(response.data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description: 'O seu perfil foi atualizado com sucesso!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o perfil',
          description: 'Ocorreu um erro ao atualizar o perfil, tente novamente',
        });
      }
      console.log(data);
    },
    [addToast, history, updateUser, user, token],
  );
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
            <img
              src={`http://localhost:3333/files/${user.avatar}`}
              alt="Safety logo"
            />
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
