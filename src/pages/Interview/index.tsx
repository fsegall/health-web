import React, { useState, useRef, useCallback } from 'react';
import Select from '../../components/Select';
import CheckboxInput from '../../components/Checkbox';
import { FormHandles } from '@unform/core';
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
import { PersonValidation } from './validation/schemas/PersonValidation';

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
import api from '../../services/api';

interface PersonFormData {
  persons: ICreatePersonDTO;
}

interface IUser {
  [key: string]: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const Dashboard: React.FC = () => {
  const interviewer_id: IUser = JSON.parse(
    localStorage.getItem('@Safety:user') || '',
  );

  const token = localStorage.getItem('@Safety:token') || '';

  const handlePersonSubmit = useCallback(async (data: PersonFormData) => {
    console.log(interviewer_id?.id);
    try {
      const validatedData = await PersonValidation.validate(data, {
        abortEarly: false,
      });
      const person = {
        interviewer_id: interviewer_id.id,
        ...validatedData,
      };
      console.log('person', person);
      console.log('token', token);
      const response = await api.post('/person', person, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleHouseholdSubmit = useCallback(async (data: PersonFormData) => {
    console.log(interviewer_id?.id);
    try {
      const validatedData = await PersonValidation.validate(data, {
        abortEarly: false,
      });
      const person = {
        interviewer_id: interviewer_id.id,
        ...validatedData,
      };
      console.log('person', person);
      const response = await api.post('/person', person, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const checkboxUrbanOptions: CheckboxOption[] = [
    { id: 'urbano', value: 'urbano', label: 'Urbano' },
  ];

  const checkboxRuralOptions: CheckboxOption[] = [
    { id: 'rural', value: 'rural', label: 'Rural' },
  ];

  const checkboxMainPersonOptions: CheckboxOption[] = [
    { id: 'household_main_person', value: 'true', label: '' },
  ];

  const checkboxBathroomOptions: CheckboxOption[] = [
    { id: 'bathroom_inside_house', value: 'true', label: '' },
  ];

  const checkboxGarbageOptions: CheckboxOption[] = [
    { id: 'garbage_service', value: 'true', label: '' },
  ];

  const PersonFormRef = useRef<FormHandles>(null);
  const [family, setFamily] = useState(3);
  const [mainPerson, setMainPerson] = useState(false);
  const [urban, setUrban] = useState(false);
  const [person_id, setPerson_id] = useState('');
  const [household_id, setHousehold_id] = useState('');

  function handleIcrement(): void {
    if (family === 12) return;
    setFamily(family + 3);
  }

  function handleDecrement(): void {
    if (family === 0) return;
    setFamily(family - 3);
  }

  return (
    <Container>
      <Header>
        Safety <span>|</span> Interview
      </Header>
      <SectionTitle>Pessoa</SectionTitle>
      <StyledForm ref={PersonFormRef} onSubmit={handlePersonSubmit}>
        <Section>
          <Input icon={FiUser} placeholder="Nome Completo" name="name" />

          <Input name="date_of_birth" type="date" />

          <Label>Gênero</Label>

          <Select name="gender" options={genderOptions} />
          <Label>Raça ou cor</Label>
          <Select name="race_color" options={raceOptions} />
        </Section>

        <Section>
          <Label>Religião</Label>
          <Select name="religion" options={religionOptions} />

          <Label>Estado Civil</Label>
          <Select name="marital_status" options={maritalOptions} />
          <Label>
            <span>Sabe ler e escrever?</span>
            <CheckboxInput
              name="literacy"
              options={[
                {
                  id: 'literacy',
                  value: 'true',
                  label: 'literacy',
                },
              ]}
            />
          </Label>
        </Section>

        <Section>
          <Label>Escolaridade</Label>
          <Select name="education" options={educationOptions} />
          <Label>Situação de emprego</Label>
          <Select name="work_status" options={workOptions} />
          <Label>Situação de saúde</Label>
          <Select name="health_conditions" options={healthOptions} />
          <Button type="submit">Submit</Button>
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
              <CheckboxInput
                name="urbano"
                options={checkboxUrbanOptions}
                checked={urban}
                onChange={() => setUrban(!urban)}
              />
              <CheckboxInput
                name="rural"
                options={checkboxRuralOptions}
                checked={!urban}
                onChange={() => setUrban(!urban)}
              />
            </Label>
            {/*             <Label>
              <span>Rural</span>
              <input
                name="rural"
                type="radio"
                value="rural"
                id="rural"
                checked={!urban}
                onChange={() => setUrban(!urban)}
              />
            </Label> */}
          </Label>
          <Label>
            <span>É a pessoa de referência da casa (chefe da casa)?</span>
            <CheckboxInput
              name="household_main_person"
              options={checkboxMainPersonOptions}
              onChange={() => setMainPerson(!mainPerson)}
            />
          </Label>
          <Label>Se não é, qual é a relação com a pessoa de referência?</Label>
          <Select
            name="household_main_person"
            options={mainPersonOptions}
            isDisabled={mainPerson}
          />
        </Section>

        <Section>
          <Label>Tipo de residência</Label>
          <Select name="type_of_residence" options={typeOfResidenceOptions} />
          <Label>Tem acesso à água potável?</Label>
          <Select name="drinking_water" options={drinkingWaterOptions} />
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
            <CheckboxInput
              name="bathroom_inside_house"
              options={checkboxBathroomOptions}
              onChange={() => {}}
            />
          </Label>
          <Label>
            <span>Tem serviço de coleta de lixo?</span>
            <CheckboxInput
              name="garbage_service"
              options={checkboxGarbageOptions}
              onChange={() => {}}
            />
          </Label>
          <Button>Submit</Button>
        </Section>
      </StyledForm>
      <SectionTitle>Endereço</SectionTitle>
      <StyledForm onSubmit={() => {}}>
        <section>
          <Input name="post_code" placeholder="Código Postal" icon={FiMail} />
          <Label>Estado da Federação</Label>
          <Select name="state" options={brazilStatesOptions} id="state" />
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
