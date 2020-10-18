import React from 'react';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import {
  Container,
  CardContainer,
  CardHeader,
  CardContent,
} from './styles';

interface CardProps {
  person: {
    name: string;
    gender: string;
    date_of_birth: string;
    covid_diagnose: string;
    id?: string | undefined;
  };
}
const Card: React.FC<CardProps> = ({ person }) => {

  console.log(format(parseISO(person.date_of_birth), 'dd/MM/yyyy'));

  return (
    <Container>
      <CardContainer>
        <CardHeader>
          <div>{person.name}</div>
          <div>
            <Link to={{
              pathname: '/household',
              state: person
            }}>
              Residência
              </Link>
          </div>
        </CardHeader>

        <CardContent>
          <div>
            <ul>
              <li>
                <span>Gênero:</span> {person.gender}
              </li>
              <li>
                <span>Data de nascimento: </span>{format(parseISO(person.date_of_birth), 'dd/MM/yyyy')}
              </li>
              <li>
                <span>Diagnosticado(a) com COVID: </span> {person.covid_diagnose === 'true' ? 'Sim' : 'Não'}
              </li>
            </ul>
          </div>

        </CardContent>
      </CardContainer>
    </Container>
  );
};

export default Card;
