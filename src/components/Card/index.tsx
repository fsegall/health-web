import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  CardContainer,
  CardHeader,
  CardContent,
  Avatar
} from './styles';

interface CardPersonProps {
  person: {
    name?: string;
    nome?: string;
    organization_name?: string;
    sexo?: string;
    idade?: number;
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
          <div>{person.nome ? person.nome : null}</div>

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
                <span>Gênero:</span> {person.sexo}
              </li>
                <li>
                  <span>Idade: </span>{person.idade || ''}
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
