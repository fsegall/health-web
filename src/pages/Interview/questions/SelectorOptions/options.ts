// Dados Pessoais

// P3 sexo

export const genero = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
];

// P4 raca_cor

export const raca_cor = [
  { value: 'branca', label: 'Branca' },
  { value: 'preta', label: 'Preta' },
  { value: 'parda', label: 'Parda' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'indigena', label: 'Indígena' },
  { value: 'outra', label: 'Outra' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// P5 ler_escrever

export const ler_ecrever = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// P6 escolaridade

export const escolaridade = [
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

// P7 situacao_de_trabalho

export const situacao_de_trabalho = [
  {
    value: 'trabalho remunerado',
    label: 'Trabalho remunerado',
  },
  {
    value: 'desempregado(a) em 2022',
    label: 'Desempregado(a) em 2022',
  },
  {
    value: 'desempregado(a) em 2021',
    label: 'Desempregado(a) em 2021',
  },
  {
    value: 'desempregado(a) desde 2020',
    label: 'Desempregado(a) desde 2020',
  },
  {
    value: 'desempregado(a) desde antes de 2020',
    label: 'Desempregado(a) desde antes de 2020',
  },
  {
    value: 'aposentado(a) por tempo de serviço',
    label: 'Aposentado(a) por tempo de serviço',
  },
  {
    value: 'aposentado(a) por doença',
    label: 'Aposentado(a) por doença',
  },
  {
    value: 'aposentado(a), mas ainda trabalha',
    label: 'Aposentado(a), mas ainda trabalha',
  },
  {
    value: 'estudante',
    label: 'Estudante',
  },
  {
    value: 'dona de casa',
    label: 'Dona de casa',
  },
];

// P8 ocupacao

export const ocupacao_profissional = [
  {
    value: 'agricultor(a) familiar ou produtor(a) rural',
    label: 'Agricultor(a) familiar ou produtor(a) rural',
  },
  {
    value: 'trabalhador(a) rural temporário (diarista, safrista etc.)',
    label: 'Trabalhador(a) rural temporário (diarista, safrista etc.)',
  },
  {
    value: 'trabalhador(a) em emprego com carteira assinada (inclui empregada (o) doméstica(o))',
    label: 'Trabalhador(a) em emprego com carteira assinada (inclui empregada (o) doméstica(o))',
  },
  {
    value: 'funcionário(a) público',
    label: 'Funcionário(a) público',
  },
  {
    value: 'trabalhador(a) em emprego sem carteira assinada (inclui empregada (o) doméstica(o))',
    label: 'Trabalhador(a) em emprego sem carteira assinada (inclui empregada (o) doméstica(o))',
  },
  {
    value: 'estagiário(a) (remunerado)',
    label: 'Estagiário(a) (remunerado)',
  },
  {
    value: 'autônomo(a) regular/empreendedor(a) individual (paga INSS)',
    label: 'Autônomo(a) regular/empreendedor(a) individual (paga INSS)',
  },
  {
    value: 'profissional liberal (nível superior)',
    label: 'Profissional liberal (nível superior)',
  },
  {
    value: 'trabalhador(a) informal, bico, free lancer, outros',
    label: 'Trabalhador(a) informal, bico, free lancer, outros',
  },
  {
    value: 'empresário(a)  ',
    label: 'Empresário(a)',
  },
  { value: 'ns-nr', label: 'NS/NR' },
];

// P9 local_de_trabalho

export const local_de_trabalho = [
  {
    value: 'trabalha em casa',
    label: 'Trabalha em casa',
  },
  {
    value: 'frequenta normalmente o local de trabalho',
    label: 'Frequenta normalmente o local de trabalho',
  },
  {
    value: 'trabalha em casa e também frequenta o local de trabalho',
    label: 'Trabalha em casa e também frequenta o local de trabalho',
  },
  { value: 'ns-nr', label: 'NS/NR' },
];

// P10 diagnostico_covid

export const diagnostico_covid = [
  {
    value: 'Sim, mas sem problemas de saúde após a doença',
    label: 'Sim, mas sem problemas de saúde após a doença',
  },
  {
    value: 'Sim, mas com problemas de saúde após a doença, que não atrapalham minha rotina de trabalho',
    label: 'Sim, mas com problemas de saúde após a doença, que não atrapalham minha rotina de trabalho',
  },
  {
    value: 'Sim, mas com problemas de saúde após a doença, que atrapalham minha rotina de trabalho',
    label: 'Sim, mas com problemas de saúde após a doença, que atrapalham minha rotina de trabalho',
  },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];



// Domicílio

// D1 local_do_domicilio

export const local_do_domicilio = [
  { value: 'urbano', label: 'Urbano' },
  { value: 'rural', label: 'Rural' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D2 morador_de_rua

export const morador_de_rua = [
  {
    value: 'sim-fixa',
    label: 'Com permanência fixa na cidade',
  },
  { value: 'sim-em-transito', label: 'Em permanente trânsito para vários locais' },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D4 qual_povo_tradicional

export const qual_povo_tradicional = [
  { value: 'indigenas', label: 'Povos indígenas' },
  { value: 'quilombolas', label: 'Comunidades quilombolas' },
  { value: 'matriz-africana', label: 'Povos e comunidades de terreiro/povos e comunidades de matriz africana' },
  { value: 'ciganos', label: 'Povos ciganos' },
  { value: 'pescadores', label: 'Pescadores artesanais' },
  { value: 'extrativistas', label: 'Extrativistas' },
  { value: 'outros', label: 'Outros' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//D15 covid_perda_2020 e D17 covid_perda_2021
export const covid_perda = [
  {
    value: 'nao',
    label: 'Não',
  },
  {
    value: 'Sim, no ano de 2020',
    label: 'Sim, no ano de 2020',
  },
  {
    value: 'Sim, no ano de 2021',
    label: 'Sim, no ano de 2021',
  },
  {
    value: 'Sim, neste ano de 2022',
    label: 'Sim, neste ano de 2022',
  },
  {
    value: 'Sim, no ano de 2020 e 2021',
    label: 'Sim, no ano de 2020 e 2021',
  },
  {
    value: 'Sim, no ano de 2021 e 2022',
    label: 'Sim, no ano de 2021 e 2022',
  },
  {
    value: 'Sim, nos três anos',
    label: 'Sim, nos três anos',
  },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D18 tipo_de_residencia

export const tipo_de_residencia = [
  {
    value: 'casa',
    label: 'Casa',
  },
  { value: 'apartamento', label: 'Apartamento' },
  {
    value: 'casa-de-vila',
    label: 'Casa de vila ou condomínio',
  },
  { value: 'oca-maloca', label: 'Oca ou  maloca' },
  { value: 'precaria', label: ' Cômodos, barraco, cortiço ou cabeça de porco' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D20 material_de_construcao

export const material_de_construcao = [
  { value: 'alvenaria com revestimento', label: 'Alvenaria com revestimento' },
  { value: 'alvenaria sem revestimento', label: 'Alvenaria sem revestimento' },
  { value: 'taipa com revestimento', label: 'Taipa com revestimento' },
  { value: 'taipa sem revestimento', label: 'Taipa sem revestimento' },
  { value: 'madeira para construção', label: 'Madeira apropriada para construção' },
  { value: 'madeira aproveitada', label: 'Madeira aproveitada' },
  { value: 'outro material', label: 'Outro material' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D21 agua_potavel

export const agua_potavel = [
  { value: 'sim', label: 'Sim' },
  {
    value: 'sim, mas o fornecimento falha semanalmente',
    label: 'Sim, mas o fornecimento falha semanalmente',
  },
  {
    value: 'sim, mas a água é de baixa qualidade',
    label: 'Sim, mas a água é de baixa qualidade',
  },
  {
    value: 'nao',
    label: 'Não',
  },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D22 esgoto

export const esgoto = [
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

// D29 pessoas_convidadas

export const pessoas_convidadas = [
  { value: 'Todos já moravam', label: 'Todos já moravam' },
  { value: '1-2', label: '1-2' },
  { value: '>3', label: '>3' },
];

// D32 faixa_de_renda

export const faixa_de_renda = [
  { value: 'não teve renda', label: 'Não teve renda' },
  { value: 'menos R$ 275,00 (menos de ¼ de  SM)', label: 'Menos R$ 275,00 (menos de ¼ de  SM)' },
  { value: 'de R$ 275,00 a R$550,00 (entre ¼ e  ½  SM)', label: 'De R$ 275,00 a R$550, (entre ¼ e  ½  SM)' },
  { value: 'de R$ 551,00 a R$ 1100,00 (mais de 1/2 até 1 SM)', label: 'De R$ 551,00 a R$ 1100,00 (mais de 1/2 até 1 SM)' },
  { value: 'mais de 1100,00 a 2200,00 (mais de 1 até 2 SM)', label: 'Mais de 1100,00 a 2200,00 (mais de 1 até 2 SM)' },
  { value: 'mais de  R$ 2200,00 a R$ 5.500,00 (mais de 2 até 5SM)', label: 'Mais de  R$ 2200,00 a R$ 5.500,00 (mais de 2 até 5SM)' },
  { value: 'mais 5.500,00 a R$ 11.000,00 (mais de 5 até 10 SM)', label: 'Mais 5.500,00 a R$ 11.000,00 (mais de 5 até 10 SM)' },
  { value: 'mais de 11.000,00(mais de 10 SM)', label: 'Mais de 11.000,00 (mais de 10 SM)' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D35 pnae

export const pnae = [
  { value: 'sim, recebi como merenda na própria escola', label: 'Sim, recebi como merenda na própria escola' },
  { value: 'sim, recebi como cesta de alimentos (na própria escola ou em casa)', label: 'Sim, recebi como cesta de alimentos (na própria escola ou em casa)' },
  { value: 'sim, como cesta de alimentos, mas a família não foi buscar', label: 'Sim, como cesta de alimentos, mas a família não foi buscar' },
  { value: 'sim, recebi em dinheiro	ou Cartão Alimentação', label: 'Sim, recebi em dinheiro	ou Cartão Alimentação' },
  { value: 'sim, recebi cesta básica e Cartão Alimentação', label: 'Sim, recebi cesta básica e Cartão Alimentação' },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D36 cadastro_unico
export const programas_de_assistencia = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'tentou cadastrar, mas não conseguiu', label: 'Tentou cadastrar, mas não conseguiu' },
  { value: 'ns-nr', label: 'NS/NR' },
];



// D44 auxilio_vezes

export const auxilio_vezes = [
  { value: 'uma vez', label: 'Uma vez' },
  { value: 'duas vezes', label: 'Duas vezes' },
  { value: 'três vezes', label: 'Três vezes' },
  { value: 'três vezes', label: 'Três vezes' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D45 ajuda_instituicao_caridade

export const ajuda_instituicao_caridade = [
  { value: 'Sim, do governo do estado', label: 'Sim, do governo do estado' },
  { value: 'Sim, da prefeitura', label: 'Sim, da prefeitura' },
  { value: 'Sim, de outras instituições', label: 'Sim, de outras instituições' },
  { value: 'Sim, de amigos ou parentes', label: 'Sim, de amigos ou parentes' },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D46 tipo_de_ajuda

export const tipo_de_ajuda = [
  { value: 'ajuda em Alimentos', label: 'Ajuda em Alimentos' },
  { value: 'ajuda em Dinheiro', label: 'Ajuda em Dinheiro' },
  { value: 'cuidado com pessoa que é dependente na família (criança, idoso; deficiente) ', label: 'Cuidado com pessoa que é dependente na família (criança, idoso; deficiente) ' },
  { value: 'outros', label: 'Outro  tipo de ajuda' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D52 divisao_alimento

export const divisao_alimento = [
  { value: 'consumo-venda', label: 'Parte da produção é para consumo e outra parte é para venda' },
  { value: 'venda', label: 'Só produzo para venda' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D63 como_adquiriu_comida

export const como_adquiriu_comida = [
  { value: 'compra-fisica', label: 'Por meio de compra física (indo ao mercado, mercearia etc.)' },
  { value: 'telefone-aplicativos', label: 'Por meio de compra por telefone ou pedidos por aplicativos on-line' },
  { value: 'doacoes-governo', label: 'Por meio de doação de instituição do governo' },
  { value: 'doacoes-ongs', label: 'Por meio de doação de organizações sociais' },
  { value: 'doacoes-conhecidos', label: 'Por meio de doação de familiares, amigos, vizinhos ou outras pessoas.' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D64 alteracao_preco_comida

export const alteracao_preco_comida = [
  { value: 'sim-aumento', label: 'Sim, observei um aumento no preço dos alimentos.' },
  { value: 'sim-diminuicao', label: 'Sim, observei uma diminuição no preço dos alimentos.' },
  { value: 'nao', label: 'Não, os alimentos mantiveram os mesmos preços.' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D65 perfil_de_compra

export const perfil_de_compra = [
  { value: 'sim-mais-alimentos', label: 'Sim, a diminuição do preço possibilitou adquirir mais alimentos' },
  { value: 'sim-menos-alimentos', label: 'Sim, o aumento do preço fez diminuir a quantidade de alimentos adquiridos' },
  { value: 'sim-outros-alimentos', label: 'Sim, o aumento do preço me fez mudar os itens adquiridos' },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// D66 mercado

export const mercado = [
  { value: 'hiper-supermercados', label: 'Hipermercados e grandes redes de supermercados (Ex. Carrefour®, Extra®, Pão de Açúcar®)' },
  { value: 'supermercados-locais', label: 'Supermercados locais' },
  { value: 'mercados-mercearias', label: 'Mercados, mercearias do bairro, armazém, padaria' },
  { value: 'sacolao-hortifruti', label: 'Sacolão, hortifruti, frutaria' },
  { value: 'feira', label: 'Feira' },
  { value: 'direto-produtores', label: 'Compra direta com produtores' },
  { value: 'acougue-peixaria', label: 'Açougue, peixaria' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//D67 gastos_alimentacao

export const gastos_alimentacao = [
  { value: 'nao-mudaram', label: 'Não, continuam as mesmas' },
  { value: 'aumentaram-um-pouco', label: 'Sim, aumentaram um pouco' },
  { value: 'aumentaram-muito', label: 'Sim, aumentaram muito' },
  { value: 'reduziram-um-pouco', label: 'Sim, reduziram um pouco' },
  { value: 'reduziram-muito', label: 'Sim, reduziram muito' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//P11 vacina

export const vacina = [
  { value: 'Sim, apenas a 1ª dose', label: 'Sim, apenas a 1ª dose' },
  { value: 'Sim, as duas doses', label: 'Sim, as duas doses' },
  { value: 'Sim as duas doses mais o reforço', label: 'Sim as duas doses mais o reforço' },
  { value: 'Sim, a vacina de dose única', label: 'Sim, a vacina de dose única' },
  { value: 'Não tomei nenhuma dose da vacina', label: 'Não tomei nenhuma dose da vacina' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//D70 nao_tomou_vacina

export const nao_tomou_vacina = [
  { value: 'Não tomei a vacina pois não tem a que eu quero tomar', label: 'Não tomei a vacina pois não tem a que eu quero tomar' },
  { value: 'Não tomei a vacina pois não quis', label: 'Não tomei a vacina pois não quis' },
  { value: 'Não tomei, pois meu médico disse que não posso tomar (gestantes, por doença crônica e outras)', label: 'Não tomei, pois meu médico disse que não posso tomar (gestantes, por doença crônica e outras)' },
  { value: 'não tomei por orientação de outra pessoa (padre, pastor, líder comunitário, outros)', label: 'Não tomei por orientação de outra pessoa (padre, pastor, líder comunitário, outros)' },
  { value: 'não tomei porque já tive Covid', label: 'Não tomei porque já tive Covid' },
  { value: 'não tomei porque não confio na vacina', label: 'Não tomei porque não confio na vacina' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// Project

export const interviewTypeOptions = [
  { value: 'face-a-face', label: 'Face a face' },
  { value: 'por-telefone', label: 'Por telefone' },
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

// Sim,não ns-nr

export const yesOrNoOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];
