import React, { useState } from 'react';
import Select from 'react-select';
import {
  StyledForm,
  Container,
  Header,
  SectionTitle,
  Counters,
  StyledFamilyForm,
  Section,
  CounterButton,
  Label,
} from './styles';
import {
  FiUser,
  FiPhone,
  FiUsers,
  FiDollarSign,
  FiMail,
  FiMap,
  FiSquare,
  FiCornerDownLeft,
  FiHome,
  FiPhoneCall,
} from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ICreatePersonDTO from './dtos/ICreatePersonDTO';
import ICreateFamilyMemberDTO from './dtos/ICreateFamilyMemberDTO';
import ICreateHouseholdDTO from './dtos/ICreateHouseholdDTO';
import ICreateAddressDTO from './dtos/ICreateAddressDTO';

import {
  genderOptions,
  raceOptions,
  maritalOptions,
  educationOptions,
  healthOptions,
  religionOptions,
  workOptions,
  drinkingWaterOptions,
  mainPersonOptions,
  typeOfResidenceOptions,
  brazilStatesOptions,
} from './questions/SelectorOptions/options';

interface InterviewFormData {
  persons: {
    personInterviewed: ICreatePersonDTO;
    familyMembers: ICreateFamilyMemberDTO[];
  };
  household: ICreateHouseholdDTO;
  address: ICreateAddressDTO;
}

const Dashboard: React.FC = () => {
  /* const handleFormSubmit = useCallback(async (data: InterviewFormData) => {}, [
  input,
]); */

  const [family, setFamily] = useState(3);
  const [mainPerson, setMainPerson] = useState(false);
  const [urban, setUrban] = useState(false);

  function handleIcrement(e: any): void {
    if (family === 12) return;
    setFamily(family + 3);
  }

  function handleDecrement(e: any): void {
    if (family === 0) return;
    setFamily(family - 3);
  }

  return (
    <Container>
      <Header>
        Safety <span>|</span> Interview
      </Header>
      <SectionTitle>Pessoa</SectionTitle>
      <StyledForm onSubmit={() => {}}>
        <Section>
          <Input icon={FiUser} placeholder="Nome Completo" name="name" />

          <Input name="date_of_birth" type="date" />

          <Label>Gênero</Label>

          <Select options={genderOptions} />
          <Label>Raça ou cor</Label>
          <Select options={raceOptions} />
        </Section>

        <Section>
          <Label>Religião</Label>
          <Select options={religionOptions} />

          <Label>Estado Civil</Label>
          <Select options={maritalOptions} />
          <Label>
            <span>Sabe ler e escrever?</span>
            <input name="literacy" type="checkbox" />
          </Label>
        </Section>

        <Section>
          <Label>Escolaridade</Label>
          <Select options={educationOptions} />
          <Label>Situação de emprego</Label>
          <Select options={workOptions} />
          <Label>Situação de saúde</Label>
          <Select options={healthOptions} />
          <Button>Submit</Button>
        </Section>
      </StyledForm>
      <SectionTitle>
        Membros da Família{' '}
        <Counters>
          <CounterButton onClick={handleIcrement}>+</CounterButton>
          <CounterButton onClick={handleDecrement}>-</CounterButton>
        </Counters>
      </SectionTitle>

      <StyledFamilyForm onSubmit={() => {}}>
        {family >= 3 && (
          <>
            <section>
              <Label>
                <strong>Pessoa 1:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_1"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_1" options={genderOptions} />
            </section>

            <section>
              <Label>
                <strong>Pessoa 2:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_2"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_2" options={genderOptions} />
            </section>
            <section>
              <Label>
                <strong>Pessoa 3:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_3"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_3" options={genderOptions} />
              {family === 3 && <Button>Submit</Button>}
            </section>
          </>
        )}
        {family >= 6 && (
          <>
            <section>
              <Label>
                <strong>Pessoa 4:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_4"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_4" options={genderOptions} />
            </section>
            <section>
              <Label>
                <strong>Pessoa 5:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_5"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_5" options={genderOptions} />
            </section>
            <section>
              <Label>
                <strong>Pessoa 6:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_6"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_6" options={genderOptions} />
              {family > 3 && family < 7 && <Button>Submit</Button>}
            </section>{' '}
          </>
        )}
        {family >= 7 && (
          <>
            <section>
              <Label>
                <strong>Pessoa 7:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_7"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_7" options={genderOptions} />
            </section>
            <section>
              <Label>
                <strong>Pessoa 8:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_8"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_8" options={genderOptions} />
            </section>
            <section>
              <Label>
                <strong>Pessoa 9:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_9"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_9" options={genderOptions} />
              {family > 3 && family < 10 && <Button>Submit</Button>}
            </section>{' '}
          </>
        )}
        {family >= 10 && (
          <>
            <section>
              <Label>
                <strong>Pessoa 10:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_10"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_10" options={genderOptions} />
            </section>
            <section>
              <Label>
                <strong>Pessoa 11:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_11"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_11" options={genderOptions} />
            </section>
            <section>
              <Label>
                <strong>Pessoa 12:</strong>
              </Label>
              <Input
                icon={FiUsers}
                placeholder="Idade do familiar"
                name="pessoa_12"
                type="number"
              />
              <Label>Gênero</Label>

              <Select name="pessoa_12" options={genderOptions} />
              {family > 9 && <Button>Submit</Button>}
            </section>
          </>
        )}
      </StyledFamilyForm>

      <SectionTitle>Residência</SectionTitle>

      <StyledForm onSubmit={() => {}}>
        <Section>
          <Label>
            <span>Localização do domicílio</span>
            <Label>
              <span>Urbano</span>
              <input
                name="urbano"
                type="radio"
                value="urbano"
                id="urbano"
                checked={urban}
                onChange={() => setUrban(!urban)}
              />
            </Label>
            <Label>
              <span>Rural</span>
              <input
                name="rural"
                type="radio"
                value="rural"
                id="rural"
                checked={!urban}
                onChange={() => setUrban(!urban)}
              />
            </Label>
          </Label>
          <Label>
            <span>É a pessoa de referência da casa (chefe da casa)?</span>
            <input
              name="literacy"
              type="checkbox"
              onChange={() => setMainPerson(!mainPerson)}
            />
          </Label>
          <Label>Se não é, qual é a relação com a pessoa de referência?</Label>
          <Select options={mainPersonOptions} isDisabled={mainPerson} />
        </Section>

        <Section>
          <Label>Tipo de residência</Label>
          <Select options={typeOfResidenceOptions} />
          <Label>Tem acesso à água potável?</Label>
          <Select options={drinkingWaterOptions} />
          <Label></Label>
          <Input
            placeholder="Número de pessoas no domicílio"
            type="number"
            min="0"
            max="12"
            name="number_of_people_household"
          />
        </Section>

        <Section>
          <Input
            placeholder="Número de cômodos na casa"
            type="number"
            min="0"
            max="6"
            name="number_of_people_household"
          />

          <Input
            icon={FiDollarSign}
            placeholder="Renda familiar"
            name="pessoa_1"
            type="number"
          />
          <Label>
            <span>Tem banheiro dentro de casa?</span>
            <input
              name="bathroom_inside_house"
              type="checkbox"
              onChange={() => {}}
            />
          </Label>
          <Label>
            <span>Tem serviço de coleta de lixo?</span>
            <input name="garbage_service" type="checkbox" onChange={() => {}} />
          </Label>
          <Button>Submit</Button>
        </Section>
      </StyledForm>
      <SectionTitle>Endereço</SectionTitle>
      <StyledForm onSubmit={() => {}}>
        <section>
          <Input name="post_code" placeholder="Código Postal" icon={FiMail} />
          <Label>Estado da Federação</Label>
          <Select options={brazilStatesOptions} id="state" name="state" />
        </section>
        <section>
          <Input name="city" placeholder="Cidade" icon={FiMap} />
          <Input name="neighborhood" placeholder="Bairro" icon={FiSquare} />
          <Input
            name="street_or_location"
            placeholder="Rua ou localização"
            icon={FiCornerDownLeft}
          />
        </section>
        <section>
          <Input
            icon={FiHome}
            placeholder="Número da casa"
            name="house_number"
            type="number"
          />
          <Input
            icon={FiPhoneCall}
            placeholder="Número de telefone"
            name="telephone_number"
          />
          <Button>Submit</Button>
        </section>
      </StyledForm>
    </Container>
  );
};

export default Dashboard;
