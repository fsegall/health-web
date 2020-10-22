import React from 'react';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import {
  Container,
  CardContainer,
  CardHeader,
  CardContent,
  Avatar
} from './styles';

interface CardPersonProps {
  person: {
    name: string;
    organization_name?: string;
    gender?: string;
    date_of_birth?: string;
    covid_diagnose?: string;
    id?: string | undefined;
    avatar_url?: string;
  };
}

const Card: React.FC<CardPersonProps> = ({ person }) => {

  return (
    <Container>
      <CardContainer>

        <CardHeader hasAvatar={!!person.avatar_url}>
          {person.avatar_url ? <Avatar src={person.avatar_url} /> : null}
          <div>{person.name}</div>

          {!person.organization_name ?
            (<div>
              <Link to={{
                pathname: '/household',
                state: person
              }}>
                Residência
              </Link>
            </div>) : null
          }
        </CardHeader>

        <CardContent>
          <div>
            <ul>
              {!person.organization_name ? (<><li>
                <span>Gênero:</span> {person.gender}
              </li>
                <li>
                  <span>Data de nascimento: </span>{format(parseISO(person.date_of_birth || ''), 'dd/MM/yyyy')}
                </li>
                <li>
                  <span>Diagnosticado(a) com COVID: </span> {person.covid_diagnose === 'true' ? 'Sim' : 'Não'}
                </li></>) :
                <li><span>Nome da organização/instituição: </span>{person.organization_name}</li>
              }
            </ul>
          </div>

        </CardContent>
      </CardContainer>
    </Container>
  );
};

export default Card;
