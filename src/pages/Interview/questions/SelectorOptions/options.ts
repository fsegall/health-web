// First module

//06 Household
export const locationOptions = [
  { value: 'urbano', label: 'Urbano' },
  { value: 'rural', label: 'Rural' },
];

//07 Project
export const interviewTypeOptions = [
  { value: 'face-a-face', label: 'Face a face' },
  { value: 'por-telefone', label: 'Por telefone' },
];

//08 Household
export const typeOfResidenceOptions = [
  {
    value: 'casa',
    label: 'Casa',
  },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'precaria', label: ' Cômodos, barraco, cortiço etc...' }, // improvisado ?
  { value: 'ns-nr', label: 'NS/NR' },
];

//09 Household
export const homelessOptions = [
  {
    value: 'sim-fixa',
    label: 'Com permanência fixa na cidade',
  },
  { value: 'sim-em-transito', label: 'Em permanente trânsito para vários locais' },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//10 Household
export const traditionalPeoplesOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//11 Household
export const whichTraditionalPeoplesOptions = [
  { value: 'indigenas', label: 'Povos indígenas' },
  { value: 'quilombolas', label: 'Comunidades quilombolas' },
  { value: 'matriz-africana', label: 'Povos e comunidades de terreiro/povos e comunidades de matriz africana' },
  { value: 'ciganos', label: 'Povos ciganos' },
  { value: 'pescadores', label: 'Pescadores artesanais' },
  { value: 'extrativistas', label: 'Extrativistas' },
  { value: 'outros', label: 'Outros' },
  { value: 'ns-nr', label: 'NS/NR' },
];


// Second module
//15 Person
export const genderOptions = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
];

//16 Person
export const mainPersonOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//17 Person
export const referencePersonGenderOptions = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//18 Person
export const raceOptions = [
  { value: 'branca', label: 'Branca' },
  { value: 'preta', label: 'Preta' },
  { value: 'parda', label: 'Parda' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'indigena', label: 'Indígena' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//19 Person
export const LiteracyOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//20 Person
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
  { value: 'supletivo-primeiro-grau', label: 'Supletivo 1º grau' },
  { value: 'supletivo-segundo-grau', label: 'Supletivo 2º grau' },
  { value: 'superior-incompleto', label: 'Superior incompleto' },
  { value: 'superior-completo', label: 'Superior completo' },
  { value: 'nao-frequentou-escola', label: 'Não frequentou escola' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// 21 change to checkbox for multiple answers (2 maximum) - Person
export const workOptions = [
  { value: 'empregado(a)-sem-reducao', label: 'Empregado/Trabalhando como autônomo sem redução de carga horária' },
  { value: 'empregado(a)-com-reducao', label: 'Empregado/Trabalhando como autônomo com redução de carga horária' },

  { value: 'aposentado-pensionista', label: 'Aposentado/ Pensionista (viuvez/problema de saúde/ pensão alimentícia/ outras)' },
  {
    value: 'desempregado(a)',
    label: 'Desempregado(a) /Sem trabalho (autônomo/a)',
  },
  { value: 'ns-nr', label: 'NS/NR' },
];

//22 Person
export const workAfterPandemicOptions = [
  { value: 'perda-de-emprego', label: 'Perda de emprego/trabalho de algum membro da casa' },
  { value: 'reducao-da-renda', label: 'Redução da renda domiciliar (dos moradores da casa)' },
  { value: 'ajuda-financeira-parente-amigo', label: 'Necessidade de ajudar financeiramente algum parente ou amigo' },
  { value: 'endividamento', label: 'Endividamento de moradores' },
  { value: 'corte-gastos-essenciais', label: 'Corte de gastos em despesas essenciais' },
  { value: 'corte-gastos-nao-essenciais', label: 'Corte de gastos em despesas não essenciais' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//23 Person
export const covidDiagnoseOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//25


//26 Household
export const peopleInvitedToHouseholdOptions = [
  { value: 'nenhuma-pessoa-acolhidas', label: 'Essas pessoas não foram acolhidas pois todos já moravam na minha casa' },
  { value: 'acolhidas-uma-ou-duas-pessoas', label: 'Foram acolhidas de 1 a 2 pessoas' },
  { value: 'acolhidas-tres-ou-mais-pessoas', label: 'Foram acolhidas 3 ou mais pessoas' },
];

//27 income checkbox for NS/NR

//30 Household
export const buildingMaterialOptions = [
  { value: 'alvenaria-com-revestimento', label: 'Alvenaria Com Revestimento/Taipa Com Revestimento ' },
  { value: 'alvenaria-sem-revestimento', label: 'Alvenaria Sem Revestimento ' },
  { value: 'taipa-sem-revestimento', label: 'Taipa Sem Revestimento' },
  { value: 'madeira-para-construção', label: 'Madeira Apropriada Para Construção' },
  { value: 'madeira-aproveitada', label: 'Madeira Aproveitada' },
  { value: 'outro-material', label: 'Outro Material' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//31 Household
export const drinkingWaterOptions = [
  { value: 'true', label: 'Sim' },
  {
    value: 'sim-mas-falha',
    label: 'Sim, mas o fornecimento falha semanalmente',
  },
  {
    value: 'false',
    label: 'Não tem fornecimento',
  },
  { value: 'ns-nr', label: 'NS/NR' },
];

//32 Household
export const sewageOptions = [
  { value: 'rede', label: 'Rede Geral, Rede Pluvial Ou Fossa Ligada À Rede' },
  {
    value: 'fossa-sem-rede',
    label: 'Fossa Não Ligada À Rede',
  },
  {
    value: 'vala',
    label: 'Vala',
  },
  {
    value: 'rio-lago-mar',
    label: 'Rio, Lago Ou Mar ',
  },
  { value: 'ns-nr', label: 'NS/NR' },
];

// module 3

//33 Hosuehold
export const worriedWithFoodSupplyOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//34 Household
export const LackOfFoodOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//35 Household
export const cannotAffordFoodOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//36 Household
export const poorFoodChoiceOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];



//37 Household
export const adultMealsOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//38
export const adultFoodPrivationOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//39 Household
export const adultHungerOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//40 Household
export const adultOneMealOrNoneOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// module 4

//41 Household
export const governmentProgramOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'tentou', label: 'Tentou cadastrar, mas não conseguiu ' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//42 Household
export const governmentFamilyProgramOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'tentou', label: 'Tentou cadastrar, mas não conseguiu ' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//43 Household
export const governmentBPCProgramOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'tentou', label: 'Tentou cadastrar, mas não conseguiu ' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//44 Household
export const pensionOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//45 Household
export const governmentReclusaoProgramOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//46 Household
export const governmentPNAEProgramOptions = [
  { value: 'sim-escola', label: 'Sim, na própria escola ' },
  { value: 'sim-cesta', label: 'Sim, recebendo como cesta de alimentos' },
  { value: 'nao', label: 'Não ' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//47 Household
export const CestaOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];


//48 Household
export const subsidizedRestaurantsOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//49 Household
export const governmentCovidProgramOptions = [
  { value: 'recebeu', label: 'Solicitou o auxílio e recebeu ' },
  { value: 'nao-recebeu', label: 'Solicitou o auxílio e não recebeu' },
  { value: 'nao-solicitou', label: 'Não solicitou o auxílio emergencial' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//50 checkbox

//51 Household
export const recievedCharityOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//52 Household
export const typeOfrecievedCharityOptions = [
  { value: 'alimentos', label: 'Ajuda em Alimentos' },
  { value: 'dinheiro', label: 'Ajuda em Dinheiro' },
  { value: 'cuidados-deficiente', label: 'cuidado com pessoa que é dependente na família (criança, idoso; deficiente)' },
  { value: 'outros', label: 'Outro tipo de ajuda' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//53 Household
export const embarassementOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//54 Household
export const homeGrownSellingFoodOptions = [
  { value: 'consumo-venda', label: 'Consumo e venda' },
  { value: 'venda', label: 'Apenas para venda' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//55 Household
export const FoodSellingOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//56 Household
export const FoodNotSoldOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//57 Household
export const howFoodIsObtainedOptions = [
  { value: 'compra-fisica', label: 'Por meio de compra física (indo ao mercado, mercearia etc.)' },
  { value: 'telefone-aplicativos', label: 'Por meio de compra por telefone ou pedidos por aplicativos on-line' },
  { value: 'doacoes-governo', label: 'Por meio de doação de instituição do governo' },
  { value: 'doacoes-ongs', label: 'Por meio de doação de organizações sociais' },
  { value: 'doacoes-conhecidos', label: 'Por meio de doação de familiares, amigos e/ou vizinhos.' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//58 Household
export const FoodPriceOptions = [
  { value: 'sim-aumento', label: 'Sim, observei um aumento no preço dos alimentos.' },
  { value: 'sim-diminuicao', label: 'Sim, observamos uma diminuição no preço dos alimentos.' },
  { value: 'nao', label: 'Não, os alimentos mantiveram os mesmos preços.' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//59 Household
export const FoodProfileOptions = [
  { value: 'sim-mais-alimentos', label: 'Sim, a diminuição do preço possibilitou adquirir mais alimentos' },
  { value: 'sim-menos-alimentos', label: 'Sim, o aumento do preço fez diminuir a quantidade de alimentos adquiridos' },
  { value: 'sim-outros-alimentos', label: 'Sim, o aumento do preço me fez mudar os itens adquiridos' },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//60 Household
export const FoodStoreOptions = [
  { value: 'hiper-supermercados', label: 'Hipermercados e grandes redes de supermercados (Ex. Carrefour®, Extra®, Pão de Açúcar®)' },
  { value: 'supermercados-locais', label: 'Supermercados locais' },
  { value: 'mercados-mercearias', label: 'Mercados, mercearias do bairro, armazém, padaria' },
  { value: 'sacolao-hortifruti', label: 'Sacolão, hortifruti, frutaria' },
  { value: 'feira', label: 'Feira' },
  { value: 'direto-produtores', label: 'Compra direta com produtores' },
  { value: 'acougue-peixaria', label: 'Açougue, peixaria' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//61 Household
export const FoodExpenditureOptions = [
  { value: 'nao-mudaram', label: 'Não, continuam as mesmas' },
  { value: 'aumentaram-um-pouco', label: 'Sim, aumentaram um pouco' },
  { value: 'aumentaram-muito', label: 'Sim, aumentaram muito' },
  { value: 'reduziram-um-pouco', label: 'Sim, reduziram um pouco' },
  { value: 'reduziram-muito', label: 'Sim, reduziram muito' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//64 Project
export const researchStatusOptions = [
  { value: 'completo', label: 'Completo' },
  { value: 'com-pendencias', label: 'Com pendência, a ser ajustada' },
];

// Address
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

export const yesOrNoOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

export const yesOrNoPlainOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
];
