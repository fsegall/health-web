import React from 'react';
import { CardContainer, CardHeader, CardContent } from './styles';
import { healthOptions } from '../../pages/Interview/questions/SelectorOptions/options';
interface CardProps {
  person: {
    name: string;
    gender: string;
    date_of_birth: Date;
    health_conditions: string;
  };
}
const Card: React.FC<CardProps> = ({ person }) => {
  return (
    <CardContainer>
      <CardHeader>{person.name}</CardHeader>
      <CardContent>
        <div>
          <ul>
            <li>Gênero: {person.gender}</li>
            <li>Data de nascimento: {person.date_of_birth}</li>
          </ul>
        </div>
        <div>Situação de saúde: {person.health_conditions}</div>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
