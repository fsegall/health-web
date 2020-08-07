import React, { useState } from 'react';
import {
  Container,
  CardContainer,
  CardHeader,
  CardContent,
  HouseList,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import ICreateHousehold from '../../pages/Interview/dtos/ICreateHouseholdDTO';
interface CardProps {
  person: {
    name: string;
    gender: string;
    date_of_birth: Date;
    health_conditions: string;
    id?: string | undefined;
  };
}
const Card: React.FC<CardProps> = ({ person }) => {
  const { token } = useAuth();
  const [house, setHouse] = useState<ICreateHousehold | null>(null);

  async function fetchHousehold(id: string | undefined): Promise<void> {
    const house = await api.get<ICreateHousehold>(`/person/${id}/household`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (house) {
      console.log('Casa', house.data);
      setHouse((state) => ({ ...house.data }));
    }
  }
  return (
    <Container>
      <CardContainer>
        <CardHeader>{person.name}</CardHeader>
        <CardContent>
          <div>
            <ul>
              <li>
                <span>Gênero:</span> {person.gender}
              </li>
              <li>
                <span>Data de nascimento:</span> {person.date_of_birth}
              </li>
            </ul>
          </div>
          <div>
            <span>Situação de saúde:</span> {person.health_conditions}
            <div>
              <a href="#" onClick={() => fetchHousehold(person.id)}>Residência</a>
            </div>
          </div>
        </CardContent>
      </CardContainer>
      <div>
        {house && (
          <HouseList>
            <li>
              <div>
                <span>Região de Localização da Casa: </span>
                {house?.location_of_residence}
              </div>
            </li>
            <li>
              <div>
                <span>{`A pessoa ${
                  house?.household_main_person ? 'é ' : 'não é '
                  } a figura de referência da casa`}</span>
              </div>
            </li>
            <li></li>
          </HouseList>
        )}
      </div>
    </Container>
  );
};

export default Card;
