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
    value: 'desempregado há um ano',
    label: 'Desempregado há um ano',
  },
  {
    value: 'desempregado entre 1 ano e 2 anos',
    label: 'Desempregado entre 1 ano e 2 anos',
  },
  {
    value: 'desempregado há mais de 2 anos',
    label: 'Desempregado há mais de 2 anos',
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
  {
    value: 'nao trabalha e nao procura emprego',
    label: 'Não trabalha e não procura emprego',
  },
];

// P8 ocupacao

export const ocupacao_profissional = [
  {
    value: 'agricultor(a) familiar ou produtor(a) rural',
    label: 'Agricultor(a) familiar ou produtor(a) rural',
  },
  {
    value: 'trabalhador(a) rural COM carteira assinada',
    label: 'Trabalhador(a) rural COM carteira assinada',
  },
  {
    value: 'trabalhador(a) em emprego COM carteira assinada no comércio',
    label: 'Trabalhador(a) em emprego COM carteira assinada no comércio',
  },
  {
    value: 'trabalhador(a) em emprego COM carteira assinada no indústria',
    label: 'Trabalhador(a) em emprego COM carteira assinada na indústria',
  },
  {
    value: 'trabalhador(a) em emprego COM carteira assinada em outro serviço',
    label: 'Trabalhador(a) em emprego COM carteira assinada em outro serviço',
  },
  {
    value: 'trabalhador(a) em emprego COM carteira assinada como empregado(a) doméstica',
    label: 'Trabalhador(a) em emprego COM carteira assinada como empregado(a) doméstica',
  },
  {
    value: 'funcionario(a) publico(a)',
    label: 'Funcionário(a) público(a)',
  },
  {
    value: 'trabalhador(a) rural temporario (diarista, safrista etc.)',
    label: 'Trabalhador(a) rural temporário SEM carteira assinada (diarista, safrista etc.)',
  },
  {
    value: 'trabalhador(a) em emprego SEM carteira assinada no comércio',
    label: 'Trabalhador(a) em emprego SEM carteira assinada no comércio',
  },
  {
    value: 'trabalhador(a) em emprego SEM carteira assinada no indústria',
    label: 'Trabalhador(a) em emprego SEM carteira assinada na indústria',
  },
  {
    value: 'trabalhador(a) em emprego SEM carteira assinada em outro serviço',
    label: 'Trabalhador(a) em emprego SEM carteira assinada em outro serviço',
  },
  {
    value: 'trabalhador(a) em emprego SEM carteira assinada como empregado(a) doméstica',
    label: 'Trabalhador(a) em emprego SEM carteira assinada como empregado(a) doméstica',
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
    value: 'presencial',
    label: 'Presencial',
  },
  {
    value: 'hibrido',
    label: 'Híbrido (em casa / home office)',
  },
  {
    value: 'ambos',
    label: 'Ambos',
  },
  {
    value: 'nenhum',
    label: 'Nenhum',
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
  { value: 'periurbana', label: 'Periurbana' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// qual_povo_tradicional

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

//covid_perda_2020 e D17 covid_perda_2021
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

//Causa da morte
export const causa_morte_ultimos_12m = [
  {
    value: 'morte natural',
    label: 'Morte natural',
  },
  {
    value: 'morte por acidente',
    label: 'Morte por acidente',
  },
  {
    value: 'morte por suicídio',
    label: 'Morte por suicício',
  },
  {
    value: 'morte por homocídio',
    label: 'Morte por homocídio',
  },
  {
    value: 'outra causa',
    label: 'Outra causa',
  },
]

//Causa da morte
export const contribuicao_morte_ultimos_12m = [
  {
    value: 'sim',
    label: 'Sim',
  },
  {
    value: 'não',
    label: 'Não',
  },
  {
    value: 'ns-nr',
    label: 'NS/NR',
  },
]


// tipo_de_residencia

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
  { value: 'comodos', label: ' Cômodoso' },
  { value: 'barraco', label: 'Barraco' },
  { value: 'cortico', label: 'Cortiço' },
  { value: 'cabeca_de_porco', label: 'Cabeça de porco' },
  { value: 'sobrado', label: 'Sobrado / sobreposta' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// material_de_construcao

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

// agua_potavel

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

// esgoto

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

// pessoas_convidadas

export const pessoas_convidadas = [
  { value: 'Todos já moravam', label: 'Todos já moravam' },
  { value: '1-2', label: '1-2' },
  { value: '>3', label: '>3' },
];

// faixa_de_renda

export const faixa_de_renda = [
  { value: 'não teve renda', label: 'Não teve renda' },
  { value: 'menos R$ 353,00 (menos de ¼ de  SM)', label: 'Menos R$ 353,00 (menos de ¼ de  SM)' },
  { value: 'de R$ 354,00 a R$ 706,00 (entre ¼ e  ½  SM)', label: 'De R$ 354,00 a R$ 706,00 (entre ¼ e  ½  SM)' },
  { value: 'de R$ 707,00 a R$ 1.412,00 (mais de 1/2 até 1 SM)', label: 'De R$ 707,00 a R$ 1.412,00 (mais de 1/2 até 1 SM)' },
  { value: 'mais de R$ 1.412,00 a 2.824,00 (mais de 1 até 2 SM)', label: 'Mais de R$ 1.412,00 a 2.824,00 (mais de 1 até 2 SM)' },
  { value: 'mais de  R$ 2.824,00 a R$ 7.060,00 (mais de 2 até 5SM)', label: 'Mais de  R$ 2.824,00 a R$ 7.060,00 (mais de 2 até 5SM)' },
  { value: 'mais R$ 7.060,00 a R$ 14.120,00 (mais de 5 até 10 SM)', label: 'Mais R$ 7.060,00 a R$ 14.120,00 (mais de 5 até 10 SM)' },
  { value: 'mais de R$ 14.120,00 (mais de 10 SM)', label: 'Mais de R$ 14.120,00 (mais de 10 SM)' },
  { value: 'ns-nr', label: 'NS/NR' },
];

export const situacao_de_emprego_e_renda = [
  { value: 'Houve perda de emprego/trabalho de algum membro da casa', label: 'Houve perda de emprego/trabalho de algum membro da casa' },
  { value: 'Houve redução da renda domiciliar (dos moradores da casa)', label: 'Houve redução da renda domiciliar (dos moradores da casa)' },
  { value: 'Houve necessidade de ajudar financeiramente algum parente ou amigo', label: 'Houve necessidade de ajudar financeiramente algum parente ou amigo' },
  { value: 'Houve endividamento de moradores', label: 'Houve endividamento de moradores' },
  { value: 'Precisou fazer corte de gastos com despesas essenciais', label: 'Precisou fazer corte de gastos com despesas essenciais' },
  { value: 'Precisou fazer corte de gastos em despesas não essenciais', label: 'Precisou fazer corte de gastos em despesas não essenciais' },
  { value: 'ns-nr', label: 'NS/NR' },
]

// pnaeOptions

export const pnaeOptinos = [
  { value: 'sim, recebi como merenda na própria escola', label: 'Sim, recebi como merenda na própria escola' },
  { value: 'sim, recebi como cesta de alimentos (na própria escola ou em casa)', label: 'Sim, recebi como cesta de alimentos (na própria escola ou em casa)' },
  { value: 'sim, como cesta de alimentos, mas a família não foi buscar', label: 'Sim, como cesta de alimentos, mas a família não foi buscar' },
  { value: 'sim, recebi em dinheiro	ou Cartão Alimentação', label: 'Sim, recebi em dinheiro	ou Cartão Alimentação' },
  { value: 'sim, recebi cesta básica e Cartão Alimentação', label: 'Sim, recebi cesta básica e Cartão Alimentação' },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//creche
export const frequentam_creche = [
  {
    value: 'sim',
    label: 'Sim',
  },
  {
    value: 'não, por opção',
    label: 'Não, por opção',
  },
  {
    value: 'não, por falta de vaga',
    label: 'Não, por falta de vaga',
  },
  {
    value: 'Não, por outro motivo',
    label: 'Não, por outro motivo',
  },
  {
    value: 'ns-nr',
    label: 'NS/NR',
  },
]

// cadastro_unico
export const programas_de_assistencia = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  { value: 'tentou cadastrar, mas não conseguiu', label: 'Tentou cadastrar, mas não conseguiu' },
  { value: 'ns-nr', label: 'NS/NR' },
];



// auxilio_vezes

export const auxilio_vezes = [
  { value: 'uma vez', label: 'Uma vez' },
  { value: 'duas vezes', label: 'Duas vezes' },
  { value: 'três vezes', label: 'Três vezes' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// ajuda_instituicao_caridade

export const ajuda_instituicao_caridade = [
  { value: 'Sim, do governo do estado', label: 'Sim, do governo do estado' },
  { value: 'Sim, da prefeitura', label: 'Sim, da prefeitura' },
  { value: 'Sim, de outras instituições', label: 'Sim, de outras instituições' },
  { value: 'Sim, de amigos ou parentes', label: 'Sim, de amigos ou parentes' },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// tipo_de_ajuda

export const tipo_de_ajuda = [
  { value: 'ajuda em Alimentos', label: 'Ajuda em Alimentos' },
  { value: 'ajuda em Dinheiro', label: 'Ajuda em Dinheiro' },
  { value: 'cuidado com pessoa que é dependente na família (criança, idoso; deficiente) ', label: 'Cuidado com pessoa que é dependente na família (criança, idoso; deficiente) ' },
  { value: 'outros', label: 'Outro  tipo de ajuda' },
  { value: 'ns-nr', label: 'NS/NR' },
];

export const produz_alimento = [
  { value: 'sim_horta', label: 'Sim, horta/roça' },
  { value: 'sim_animais', label: 'Sim, crio animais' },
  { value: 'os_dois', label: 'Sim, os dois' },
  { value: 'nenhum', label: 'Não, nenhum' },
  { value: 'ns-nr', label: 'NS/NR' },
]

// divisao_alimento

export const divisao_alimento = [
  { value: 'consumo-venda', label: 'Parte da produção é para consumo e outra parte é para venda' },
  { value: 'venda', label: 'Só produzo para venda' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// como_adquiriu_comida

export const como_adquiriu_comida = [
  { value: 'compra-fisica', label: 'Por meio de compra física (indo ao mercado, mercearia etc.)' },
  { value: 'telefone-aplicativos', label: 'Por meio de compra por telefone ou pedidos por aplicativos on-line' },
  { value: 'doacoes-governo', label: 'Por meio de doação de instituição do governo' },
  { value: 'doacoes-ongs', label: 'Por meio de doação de organizações sociais' },
  { value: 'doacoes-conhecidos', label: 'Por meio de doação de familiares, amigos, vizinhos ou outras pessoas.' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// alteracao_preco_comida

export const alteracao_preco_comida = [
  { value: 'sim-aumento', label: 'Sim, observei um aumento no preço dos alimentos.' },
  { value: 'sim-diminuicao', label: 'Sim, observei uma diminuição no preço dos alimentos.' },
  { value: 'nao', label: 'Não, os alimentos mantiveram os mesmos preços.' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// perfil_de_compra

export const perfil_de_compra = [
  { value: 'sim-mais-alimentos', label: 'Sim, a diminuição do preço possibilitou adquirir mais alimentos' },
  { value: 'sim-menos-alimentos', label: 'Sim, o aumento do preço fez diminuir a quantidade de alimentos adquiridos' },
  { value: 'sim-outros-alimentos', label: 'Sim, o aumento do preço me fez mudar os itens adquiridos' },
  { value: 'nao', label: 'Não' },
  { value: 'ns-nr', label: 'NS/NR' },
];

// mercado

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

//gastos_alimentacao

export const gastos_alimentacao = [
  { value: 'nao-mudaram', label: 'Não, continuam as mesmas' },
  { value: 'aumentaram-um-pouco', label: 'Sim, aumentaram um pouco' },
  { value: 'aumentaram-muito', label: 'Sim, aumentaram muito' },
  { value: 'reduziram-um-pouco', label: 'Sim, reduziram um pouco' },
  { value: 'reduziram-muito', label: 'Sim, reduziram muito' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//vacina

export const vacina = [
  { value: 'Sim, apenas a 1ª dose', label: 'Sim, apenas a 1ª dose' },
  { value: 'Sim, 2 ou mais doses', label: 'Sim, 2 ou mais doses' },
  { value: 'Sim, mas não me lembro quantas doses', label: 'Sim, mas não me lembro quantas doses' },
  { value: 'Não tomei nenhuma dose', label: 'Não tomei nenhuma dose' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//P12 nao_tomou_vacina

export const nao_tomou_vacina = [
  { value: 'Não tomei a vacina pois não tinha a que eu queria tomar', label: 'Não tomei a vacina pois não tinha a que eu queria tomar' },
  { value: 'Não tomei a vacina pois não quis', label: 'Não tomei a vacina pois não quis' },
  { value: 'Não tomei, pois meu médico disse que não posso tomar (gestantes, por doença crônica e outras)', label: 'Não tomei, pois meu médico disse que não posso tomar (gestantes, por doença crônica e outras)' },
  { value: 'não tomei por orientação de outra pessoa (padre, pastor, líder comunitário, outros)', label: 'Não tomei por orientação de outra pessoa (padre, pastor, líder comunitário, outros)' },
  { value: 'não tomei porque já tive Covid', label: 'Não tomei porque já tive Covid' },
  { value: 'não tomei porque não confio na vacina', label: 'Não tomei porque não confio na vacina' },
  { value: 'ns-nr', label: 'NS/NR' },
];

//P13 estado_de_saude

export const estado_de_saude = [
  { label: 'Muito bom', value: 'muito_bom' },
  { label: 'Bom', value: 'bom' },
  { label: 'Regular', value: 'regular' },
  { label: 'Ruim', value: 'ruim' },
  { label: 'Muito ruim', value: 'muito_ruim' },
]

//P14 local_de_procura_do_servico_de_saude

export const local_de_procura_do_servico_de_saude = [
  { label: 'Farmácia', value: 'farmacia' },
  { label: 'Unidade básica de saúde UBS (posto ou centro de saúde ou unidade de saúde da família)', value: 'ubs_ou_posto_de_saude' },
  { label: 'Policlínica pública, PAM (Posto de Assistência Médica) ou Centro de Especialidades público', value: 'pam_ou_centro_de_especialidades_publico' },
  { label: 'UPA (Unidade de Pronto Atendimento), outro tipo de pronto atendimento público (24 horas), pronto socorro ou emergência de hospital público', value: 'upa_ou_ps' },
  { label: 'Ambulatório de hospital público', value: 'ambulatorio_publico' },
  { label: 'Consultório particular, clínica privada ou ambulatório de hospital privado', value: 'consultorio_clinica__ou_hospital_privado' },
  { label: 'Pronto atendimento ou emergência de hospital privado ou residencial ', value: 'pronto_atendimento_de_hospital_privado_ou_residencial' },
  { label: 'Outro serviços', value: 'outros_servicos' },
]

//P15 - motivo_procura_servico_saude

export const motivo_procura_servico_saude = [
  { label: 'Foi atendido', value: 'foi_atendido' },
  { label: 'Foi agendado para outro dia / outro local', value: 'agendado_para_outro_dia_ou_local' },
  { label: 'Não foi atendido', value: 'nao_foi_atendido' },
  { value: 'ns-nr', label: 'NS/NR' },
]

//P16 - motivo_nao_atendimento_servico_saude

export const motivo_nao_atendimento_servico_saude = [
  { label: 'Não conseguiu vaga nem pegar senha', value: 'nao_conseguiu_vaga_ou_senha' },
  { label: 'Não tinha médico ou dentista atendendo', value: 'nao_havia_medico_ou_dentista_atendendo' },
  { label: 'Não havia serviço ou profissional de saúde especializado para atender', value: 'nao_havia_servico_ou_profissional' },
  { label: 'Esperou muito e desistiu', value: 'esperou_muito_e_desistiu' },
  { label: 'Os equipamentos do serviço de saúde não estavam funcionando ou disponíveis para uso', value: 'equipamentos_nao_funcionando_ou_indisponiveis' },
  { label: 'Não podia pagar pela consulta com especialista para atender', value: 'nao_podia_pagar_pela_consulta_com_especialista' },
  { label: 'Outros', value: 'outros' }
]

//P17 - doenca_ultimos_12_meses

export const doenca_ultimos_12_meses = [
  { label: 'Problemas nos ossos e articulações (Dor nas costas, problema no pescoço ou na nuca/Dor nos braços ou nas mãos/Artrite ou reumatismo)', value: 'problema_ossos_ou_articulacoes' },
  { label: 'Dor de cabeça ou enxaqueca', value: 'dor_de_cabeca_ou_enxaqueca' },
  { label: 'Problemas gineco-obstétricos (Problemas menstruais ou da gravidez e parto)', value: 'problemas_gineco_obstetricos' },
  { label: 'Problemas odontológico / Dor de dente', value: 'problemas_odontologicos' },
  { label: 'Problemas respiratórios (Resfriado / gripe / sinusite / asma / bronquite / pneumonia)', value: 'problemas_respiratorios' },
  { label: 'Problemas cardiovasculares ( Pressão alta / doença do coração / AVC ou derrame)', value: 'problema_cardiovasculares' },
  { label: 'Saúde mental (Depressão / bipolaridade /esquizofrenia / Transtorno de ansiedade / outro problema de saúde mental', value: 'problemas_de_saude_mental' },
  { label: 'Nenhuma', value: 'nenhuma' },
  { label: 'Outro', value: 'outro' },
]

//P18 - diagnostico_doenca_ultimos_12_meses

export const diagnostico_doenca_ultimos_12_meses = [
  { label: 'Anemia Falciforme', value: 'anemia_falciforme' },
  { label: 'Doença de Chagas', v: 'doenca_de_chagas' },
  { label: 'Problemas gineco-obstétricos (Problemas menstruais ou da gravidez e parto)', value: 'problemas_gineco_obstetricos' },
  { label: 'Problemas cardiovasculares ( Pressão alta / doença do coração / AVC ou derrame)', value: 'problemas_cardiovasculares' },
  { label: 'Diabetes', value: 'diabetes' },
  { label: 'Câncer (inclusive quimioterapia / radioterapia)', value: 'cancer' },
  { label: 'Saúde mental (Depressão / bipolaridade /esquizofrenia / Transtorno de ansiedade / outro problema de saúde mental)', value: '' },
  { label: 'Nenhuma', value: 'nenhuma' },
  { label: 'Outro', value: 'outro' },
]

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
