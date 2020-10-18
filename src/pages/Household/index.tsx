import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import ICreateHouseholdDTO from '../../pages/Interview/dtos/ICreateHouseholdDTO';
import ICreatePersonDTO from '../../pages/Interview/dtos/ICreatePersonDTO';
import { HouseList } from './styles';

/* const { token } = useAuth(); */
/* const [house, setHouse] = useState<ICreateHousehold | null>(null); */

/*   async function fetchHousehold(id: string | undefined): Promise<void> {
    const house = await api.get<ICreateHousehold>(`/persons/${id}/household`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (house) {
      setHouse((state) => ({ ...house.data }));
    }
  } */


const Household: React.FC = () => {

  let location = useLocation<ICreatePersonDTO>();

  console.log(location.state.id);

  const { token } = useAuth();
  const [household, setHousehold] = useState<ICreateHouseholdDTO | null>(null);
  useEffect(() => {
    async function fetchHousehold() {
      console.log('inside useEffect', location.state)
      const response = await api.get(`/persons/${location.state.id}/household`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data)
      setHousehold(response.data);
    }
    fetchHousehold();
  }, [token, location]);
  return (
    <>
      { household ?
        (<HouseList>
          <li>
            <div>
              <span>Região de Localização da Casa: </span>
              {household?.location_of_residence}
            </div>
          </li>
          <li>
            <div>
              <span>{`A pessoa ${household?.household_main_person ? 'é ' : 'não é '
                } a figura de referência da casa`}</span>
            </div>
          </li>
          <li></li>
        </HouseList >) : <div>Esta pessoa ainda não tem uma residência associada a ela na pesquisa</div>}
    </>

  )

}


export default Household;
