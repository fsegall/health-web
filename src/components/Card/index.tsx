import React, { useState } from 'react';
import {
  Container,
  CardContainer,
  CardHeader,
  CardContent,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import ICreateHousehold from '../../pages/Interview/dtos/ICreateHouseholdDTO';
interface CardProps {
  person: {
    name: string;
    gender: string;
    date_of_birth: Date;
    covid_diagnose: string;
    id?: string | undefined;
  };
}
const Card: React.FC<CardProps> = ({ person }) => {
  const { token } = useAuth();
  /* const [house, setHouse] = useState<ICreateHousehold | null>(null); */

  async function fetchHousehold(id: string | undefined): Promise<void> {
    const house = await api.get<ICreateHousehold>(`/persons/${id}/household`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (house) {
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
            <span>Situação de saúde:</span> {person.covid_diagnose}
            <div>
              <button onClick={() => fetchHousehold(person.id)}>Residência</button>
            </div>
          </div>
        </CardContent>
      </CardContainer>
      {/*       <div>
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
                <span>{`A pessoa ${house?.household_main_person ? 'é ' : 'não é '
                  } a figura de referência da casa`}</span>
              </div>
            </li>
            <li></li>
          </HouseList>
        )}
      </div> */}
    </Container>
  );
};

export default Card;
