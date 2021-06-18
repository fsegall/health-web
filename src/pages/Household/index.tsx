import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { FiChevronLeft, FiHome } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import ICreateHouseholdDTO from '../../pages/Interview/dtos/ICreateHouseholdDTO';
import ICreatePersonDTO from '../../pages/Interview/dtos/ICreatePersonDTO';
import { HouseholdContainer, HouseList, Header, DefaultContent } from './styles';
import Spinner from '../../components/Spinner';

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

  const [isLoading, setIsLoading] = useState(false)

  let location = useLocation<ICreatePersonDTO>();

  const { token } = useAuth();
  const [household, setHousehold] = useState<ICreateHouseholdDTO | null>(null);
  useEffect(() => {
    setIsLoading(true);
    async function fetchHousehold() {
      const response = await api.get(`/persons/${location.state.id}/household`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setHousehold(response.data);
    }
    fetchHousehold();
  }, [token, location]);
  return (
    <>
      <Header>
        <div>
          <Link to="/dashboard">
            <FiChevronLeft size={30} />
          </Link>
        </div>
        <h1>Safety <span>|</span> Residência</h1>
      </Header>
      {isLoading ? <Spinner /> : (<div>
        { household ?
          (<HouseholdContainer>
            <div><FiHome size="40" style={{ margin: 10 }} color="#ff9000" /></div>
            <HouseList>

              <li>

                <span>Região de Localização da Casa: </span>
                {/* household?.location_of_residence */}

              </li>
              <li>

                <span>{/* `Tipo de residência: ${household?.type_of_residence}` */}</span>

              </li>
              {/*               <li>

                <span>{`Número de cômodos da residência: ${household?.number_of_rooms}`}</span>

              </li>

              <li>

                <span>{`A renda da família é de aproximadamente: R$ ${household?.family_income}`}</span>

              </li>
              <li>

                <span>{`A pessoa ${household?.household_main_person ? 'é ' : 'não é '
                  } a figura de referência da casa`}</span>

              </li>
              <li>

                <span>{`A pessoa  ${household?.government_assistance_program_bolsa_familia ? 'recebeu ' : 'não recebeu '
                  } assitência do bolsa família`}</span>

              </li> */}

            </HouseList >
          </HouseholdContainer>) : <DefaultContent>Esta pessoa ainda não tem uma residência associada a ela na pesquisa</DefaultContent>}
      </div>)}
    </>

  )

}


export default Household;
