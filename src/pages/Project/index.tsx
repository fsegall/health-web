import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import {
  StyledForm,
  Label,
  Container,
  Header,
  Title,
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

import api from '../../services/api';


const ProjectForm: React.FC = (props) => {

  const { addToast } = useToast();

  const { token } = useAuth();

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

      await api.post('/projects', project, {
        headers: { Authorization: `Bearer ${token}` },
      });


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
      } else {
        addToast({
          type: 'error',
          title: error.data.message,
          description: 'Ocorreu um erro ao adicionar o projeto, tente novamente',
        });
      }
    }
  }, [addToast, token]);

  return (
    <Container>
      <Header>
        <div>
          <Link to="/dashboard">
            <FiChevronLeft size={30} />
          </Link>
        </div>
        <h1>Safety <span>|</span> Projeto</h1>
      </Header>
      <Title>Adicione um projeto de pesquisa</Title>
      <StyledForm ref={ProjectFormRef} onSubmit={handleProjectSubmit}>

        <section>
          <Label>Nome do Projeto</Label>
          <Input name="name" placeholder="Nome do Projeto" />
        </section>
        <section>
          <Label>Número do Projeto</Label>
          <Input name="project_number" placeholder="Número do Projeto" type="number" />
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
