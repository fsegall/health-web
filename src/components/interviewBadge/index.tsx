import React from 'react';
import { parseJSON, format } from 'date-fns';
import {
  Container
} from './styles';
import { useHistory } from 'react-router-dom';

interface InterviewProps {
  interview: {
    id?: string; // uuid from backend
    interviewer_id: string;
    project_name: string;
    project_number?: number;
    person_id?: string;
    household_id?: string;
    address_id?: string;
    is_complete?: boolean;
    is_complete_with_errors?: boolean;
    interview_type: string;
    comments?: string;
    created_at?: Date; // From backend
  }
}

const Card: React.FC<InterviewProps> = ({ interview: { project_name,
  id,
  comments,
  created_at } }) => {
    const history = useHistory()

  return (
    <Container onClick={() => history.push(`/interview/${id}`)}>
      <div><strong>Nome do projeto:</strong> {project_name}</div>
      <div><strong>Id da entrevista:</strong> {id?.split('').splice(1, 6).join('')}</div>
      <div><strong>Comentários:</strong> {comments}</div>
      <div><strong>Data de criação:</strong> {created_at ? format(parseJSON(created_at), 'dd/MM/yyyy HH:mm') : null}</div>

    </Container>
  );
};

export default Card;
