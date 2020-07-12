import React from 'react';
import Select from 'react-select';
import {
  StyledForm,
  Container,
  Header,
  SectionTitle,
  SelectorContainer,
  Section,
  Label,
} from './styles';
import { FiUser, FiPhone } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ICreatePersonDTO from './dtos/ICreatePersonDTO';
import ICreateFamilyMemberDTO from './dtos/ICreateFamilyMemberDTO';
import ICreateHouseholdDTO from './dtos/ICreateHouseholdDTO';
import ICreateAddressDTO from './dtos/ICreateAddressDTO';

interface InterviewFormData {
  persons: {
    personInterviewed: ICreatePersonDTO;
    familyMembers: ICreateFamilyMemberDTO[];
  };
  household: ICreateHouseholdDTO;
  address: ICreateAddressDTO;
}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const raceOptions = [
  { value: 'branca', label: 'Branca' },
  { value: 'preta', label: 'Preta' },
  { value: 'parda', label: 'Parda' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'indigena', label: 'Indígena' },
];

const religionOptions = [
  { value: 'católico', label: 'Católico' },
  { value: 'protestante', label: 'Protestante(Não Neo Petencostal)' },
  { value: 'evangelico', label: 'Evangélico Neo Petencostal' },
  { value: 'matriz-africana', label: 'De Matriz Africana' },
  { value: 'espirita', label: 'Espírita' },
  { value: 'outra', label: 'Outra' },
];

const maritalOptions = [
  { value: 'casado-a', label: 'Casado(a)' },
  { value: 'solteiro-a', label: 'Solteiro(a)' },
  { value: 'separado', label: 'Separado(a)' },
  { value: 'viuvo-viuva', label: 'Viúvo ou Viúva' },
  { value: 'ns-nr', label: 'NS/NR' },
];
const educationOptions = [
  {
    value: 'fundamental-incompleto',
    label: 'Ensino fundamental (1º grau) incompleto',
  },
  {
    value: 'fundamental-completo',
    label: 'Ensino fundamental (1º grau) completo',
  },
  { value: 'medio-incompleto', label: 'Ensino médio (2º grau) incompleto' },
  { value: 'medio-completo', label: 'Ensino médio (2º grau) completo' },
  { value: 'supletivo-1', label: 'Supletivo 1º grau' },
  { value: 'supletivo-2', label: 'Supletivo 2º grau' },
  { value: 'superior-incompleto', label: 'Superior incompleto' },
  { value: 'superior-completo', label: 'Superior completo' },
  { value: 'nao-frequentou-escola', label: 'Não frequentou escola' },
];

const workOptions = [
  { value: 'trabalhando', label: 'Atualmente está trabalhando' },
  { value: 'desempregado', label: 'Atualmente está desempregado' },
  { value: 'ferias', label: 'Emprego em afastamento por férias' },
  {
    value: 'afastado-covid-remuneracao-parcial',
    label:
      'Empregado em afastamento pelo contexto da COVID-19 - com remuneração PARCIAL',
  },
  {
    value: 'afastado-covid-remuneracao-total',
    label:
      'Empregado em afastamento pelo contexto da COVID-19 - com remuneração TOTAL',
  },
  {
    value: 'afastado-covid-sem-remuneracao',
    label:
      'Empregado em afastamento pelo contexto da COVID-19 – SEM remuneração',
  },
  { value: 'empregado', label: 'Empregado e continua trabalhando normalmente' },
  { value: 'aposentado', label: 'Aposentado' },
  {
    value: 'pensionista',
    label: 'Pensionista (viuvez- problema de saúde-pensão alimentícia, outras)',
  },

  {
    value: 'autonomo-formal',
    label: 'Trabalho por conta própria – Autônomo (formal)',
  },
  {
    value: 'autonomo informal',
    label: 'Trabalho por conta própria- Precário - Bico - informal',
  },
  {
    value: 'rendimentos',
    label: 'Recebe rendimento de várias fontes (aluguel e outras)',
  },
  { value: 'empregador', label: 'Empregador' },
  { value: 'ns-nr', label: 'NS/NR' },
];

const healthOptions = [
  { value: 'covid', label: 'Tem diagnóstico de Covid-19' },
  { value: 'coabita', label: 'Coabita com pessoa diagnosticada com Covid-19' },
  {
    value: 'sintomatico',
    label:
      'Tem sintomas de síndrome gripal (febre, coriza, dor de garganta, falta de ar), mas sem diagnóstico',
  },
  { value: 'sem-sintomas', label: 'Sem sintomas' },
];

const Dashboard: React.FC = () => {
  /* const handleFormSubmit = useCallback(async (data: InterviewFormData) => {}, [
  input,
]); */
  return (
    <Container>
      <Header>
        Safety <span>|</span> Interview
      </Header>
      <SectionTitle>Pessoas</SectionTitle>
      <StyledForm onSubmit={() => {}}>
        <Section>
          <Input
            icon={FiUser}
            placeholder="Nome Completo"
            name="nome_completo"
          />
          <Input icon={FiPhone} placeholder="Telefone" name="Telefone" />

          <Input placeholder="Nome Completo" name="nome_completo" type="date" />

          <Label>Gênero</Label>

          <Select options={genderOptions} />
        </Section>

        <Section>
          <Label>Raça ou cor</Label>
          <Select options={raceOptions} />
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

      <SectionTitle>Residência</SectionTitle>

      <StyledForm onSubmit={() => {}}>
        <section>
          <Input name="test1" />
        </section>

        <section>
          <Input name="test2" />
        </section>

        <section>
          <Input name="test3" />
          <Button>Submit</Button>
        </section>
      </StyledForm>
      <SectionTitle>Endereço</SectionTitle>
      <StyledForm onSubmit={() => {}}>
        <section>
          <Input name="test1" />
        </section>

        <section>
          <Input name="test2" />
        </section>

        <section>
          <Input name="test3" />
          <Button>Submit</Button>
        </section>
      </StyledForm>
    </Container>
  );
};

export default Dashboard;
