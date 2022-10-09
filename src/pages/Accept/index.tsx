import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import useGetProjectsTypes, { ProjectType } from '../../hooks/useGetProjectsTypes';
import {
  Container,
  Aceite,
  FormContainer,
  CheckboxContainer,
  Button,
  ListTitle,
  SubHeader,
} from './styles';


const Accept: React.FC = () => {
  const { addToast } = useToast();
  const [projectType, setProjectType] = useState<ProjectType>('default')
  const { acceptInfo, interviewPath } = useGetProjectsTypes(projectType)
  const [accept, setAccept] = useState(false);
  const history = useHistory();
  function onSubmit(e: React.SyntheticEvent) {
    if (accept) {
      history.push(interviewPath)
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
      <SubHeader >
        <ListTitle>{acceptInfo.title}</ListTitle>
      </SubHeader>
      <Aceite>
        <div>
          {acceptInfo.description?.map((info, index) => (
            <p style={{ lineHeight: '30px' }} key={index}>{info}</p>
          ))}
          <div style={{ padding: '1rem' }}>
            {acceptInfo.contact}
          </div>
          <strong>Agradecemos, desde já, sua valorosa colaboração.</strong>
        </div>
      </Aceite>

      <FormContainer>
        <form onSubmit={onSubmit}>

          <CheckboxContainer>
            <label>Pesquisa Indígena</label>
            <input type="checkbox"
              name="projectType"
              onChange={() => projectType === 'default' ? setProjectType('indigenous') : setProjectType('default')}
            />
          </CheckboxContainer>
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
