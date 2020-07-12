export const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const raceOptions = [
  { value: 'branca', label: 'Branca' },
  { value: 'preta', label: 'Preta' },
  { value: 'parda', label: 'Parda' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'indigena', label: 'Indígena' },
];

export const religionOptions = [
  { value: 'católico', label: 'Católico' },
  { value: 'protestante', label: 'Protestante(Não Neo Petencostal)' },
  { value: 'evangelico', label: 'Evangélico Neo Petencostal' },
  { value: 'matriz-africana', label: 'De Matriz Africana' },
  { value: 'espirita', label: 'Espírita' },
  { value: 'outra', label: 'Outra' },
];

export const maritalOptions = [
  { value: 'casado-a', label: 'Casado(a)' },
  { value: 'solteiro-a', label: 'Solteiro(a)' },
  { value: 'separado', label: 'Separado(a)' },
  { value: 'viuvo-viuva', label: 'Viúvo ou Viúva' },
  { value: 'ns-nr', label: 'NS/NR' },
];
export const educationOptions = [
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

export const workOptions = [
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

export const healthOptions = [
  { value: 'covid', label: 'Tem diagnóstico de Covid-19' },
  { value: 'coabita', label: 'Coabita com pessoa diagnosticada com Covid-19' },
  {
    value: 'sintomatico',
    label:
      'Tem sintomas de síndrome gripal (febre, coriza, dor de garganta, falta de ar), mas sem diagnóstico',
  },
  { value: 'sem-sintomas', label: 'Sem sintomas' },
];

export const mainPersonOptions = [
  { value: 'mae', label: 'Mãe da pessoa de referência' },
  { value: 'pai', label: 'Pai da pessoa de referência' },
  {
    value: 'esposo',
    label: 'Esposo da pessoa de referência',
  },
  { value: 'genro', label: 'Genro da pessoa de referência' },
  { value: 'nora', label: 'Nora da pessoa de referência' },
  { value: 'Avô', label: 'Avô da pessoa de referência' },
  {
    value: 'Avó',
    label: 'Avó da pessoa de referência',
  },
  { value: 'outro-parente', label: 'Outro grau de parentesco' },
  { value: 'outro-nao-parente', label: 'Outro sem grau de parentesco' },
  { value: 'ns-nr', label: 'NS/NR' },
];

export const typeOfResidenceOptions = [
  { value: 'permanente', label: 'Casa ou apartamento' },
  { value: 'improvisado', label: ' Barraco, cortiço etc...' },
  {
    value: 'casa',
    label: 'Casa',
  },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'comodo', label: 'Cômodo' },
  { value: 'area-rural', label: 'Area rural' },
  {
    value: 'outro',
    label: 'Avó da pessoa de referência',
  },
  { value: 'ns-nr', label: 'NS/NR' },
];

export const drinkingWaterOptions = [
  { value: 'canalisada', label: 'Sim, canalisada dentro de casa' },
  { value: 'externa-domicilio', label: 'Sim, exerna ao domicílio' },
  {
    value: 'falha-fornecimento',
    label: 'Sim, mas o fornecimento falha semanalmente',
  },
  {
    value: 'nao',
    label: 'Não tem fornecimento',
  },
  { value: 'ns-nr', label: 'NS/NR' },
];

export const brazilStatesOptions = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
  { value: 'ET', label: 'Estrangeiro' },
];
