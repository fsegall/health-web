import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import useGetProjectsTypes, { InterviewerAgeType, ProjectType } from '../../hooks/useGetProjectsTypes';
import {
  Container,
  Aceite,
  FormContainer,
  CheckboxContainer,
  Button,
  ListTitle,
  SubHeader,
  Select,
} from './styles';


const Accept: React.FC = () => {
  const { addToast } = useToast();
  const [projectType, setProjectType] = useState<ProjectType>('default')
  const [interviewedPersonAge, setInterviewedPersonAge] = useState<InterviewerAgeType>('greater-than-18')
  const { acceptInfo, interviewPath } = useGetProjectsTypes(projectType, interviewedPersonAge)
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
        <p><strong>Assinale se é pesquisa nacional ou pesquisa indígena abaixo:</strong></p><br />
        <Select onChange={(event) => setProjectType(event.target.value as ProjectType)}>
          <option value={"default"}>Pesquisa Geral</option>
          <option value={"indigenous"}>Pesquisa Indígena</option>
        </Select>
        {projectType === 'indigenous' && (
          <CheckboxContainer>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="radio"
                name="interviewed_person_age"
                checked={interviewedPersonAge === 'greater-than-18'}
                onChange={() => setInterviewedPersonAge('greater-than-18')}
              />
              <p>A pessoa entrevistada tem mais de 18 anos de idade</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="radio"
                name="interviewed_person_age"
                checked={interviewedPersonAge === 'between-14-and-18'}
                onChange={() => setInterviewedPersonAge('between-14-and-18')}
              />
              <p>A pessoa entrevistada tem entre 14 e 18 anos de idade</p>
            </div>
          </CheckboxContainer>
        )}
          <CheckboxContainer>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="checkbox"
                name="Accept"
                onChange={() => setAccept(!accept)}
                />
              <label>Eu aceito os termos da pesquisa</label>
            </div>
          </CheckboxContainer>

          <Button type="submit">Prosseguir</Button>
        </form>
      </FormContainer>
    </Container >
  );

};

export default Accept;
