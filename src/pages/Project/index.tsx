import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import {
  StyledForm,
  Label,
  Container,
  Header,
  HeaderContent,
  Profile,
  Title,
  StyledLink,
} from './styles';
import {
} from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ICreateProjectDTO from '../Interview/dtos/ICreateProjectDTO';
import { ProjectValidation } from '../Interview/validation/schemas/ProjectValidation';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import logo from '../../assets/logo_transparent.png';

import api from '../../services/api';


const ProjectForm: React.FC = (props) => {

  const { addToast } = useToast();

  const { signOut, user, token } = useAuth();

  const ProjectFormRef = useRef<FormHandles>(null);

  const handleProjectSubmit = useCallback(async (data: ICreateProjectDTO) => {
    try {
      ProjectFormRef.current?.setErrors({});
      const validatedData = await ProjectValidation.validate(data, {
        abortEarly: false,
      });

      const user_id = await JSON.parse(localStorage.getItem('@Safety:user') || '')?.id;

      const project = {
        user_id,
        ...validatedData,
      };
      console.log('Project', project);

      console.log('token', token);
      const response = await api.post('/projects', project, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response);
      addToast({
        type: 'success',
        title: 'Projeto adicionado com sucesso',
        description: 'Você agora pode criar entrevistas para esse projeto',
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        ProjectFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Erro ao adicionar projeto',
          description: 'Ocorreu um erro ao adicionar o projeto, tente novamente',
        });
      }
    }
  }, [addToast, token]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="Safety" />
          <Profile>
            <img
              src={user.avatar_url}
              alt={user.name}
            />
            <div>

              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <StyledLink to="/dashboard">Dashboard</StyledLink>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Title>Adicione um projeto de pesquisa</Title>
      <StyledForm ref={ProjectFormRef} onSubmit={handleProjectSubmit}>

        <section>
          <Label>Nome do Projeto</Label>
          <Input name="name" placeholder="Nome do Projeto" />
        </section>
        <section>
          <Label>Nome das Organizações reponsáveis</Label>
          <Input name="organizations" placeholder="Nomes separados por vírgula" />
          <Button>Submit</Button>
        </section>


      </StyledForm>
    </Container>
  );

}

export default ProjectForm;
