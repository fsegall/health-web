import * as Yup from 'yup';

export const HouseholdValidation = Yup.object().shape({
  local_do_domicilio: Yup.string().required(
    'Você precisa escolher um dos campos de localização de residência',
  ),
  morador_de_rua: Yup.string(),
  povos_tradicionais: Yup.string().required(
    'Você precisa escolher um dos campos de povos tradicionais',
  ),
  qual_povo_tradicional: Yup.string(), // See how to make the field be required conditionally
  pessoa_de_referencia: Yup.string().required(
    'Você precisa escolher um dos campos de chefe de família',
  ),
  idade_pessoa_de_referencia: Yup.number(),
  sexo_pessoa_de_referencia: Yup.string(),
  raca_cor: Yup.string(),
  ler_escrever: Yup.string(),
  escolaridade: Yup.string(),
  situacao_de_trabalho: Yup.string(),
  ocupacao_profissional: Yup.string(),
  local_de_trabalho: Yup.string(),
  diagnostico_covid_positivo: Yup.string().required(
    'Você precisa escolher um dos campos de diagnóstico de covid positivo',
  ),
  sequelas_covid: Yup.string().required(
    'Você precisa escolher um dos campos de sequelas de covid',
  ),
  morte_ultimos_12_meses: Yup.string().required(
    'Você precisa escolher um dos campos de morte nos últimos 12 meses',
  ),
  causa_morte_ultimos_12_meses: Yup.string(),
  tipo_de_residencia: Yup.string().required(
    'Você precisa escolher um dos campos de tipo de residência',
  ),
  numero_de_comodos: Yup.number().required(
    'Você precisa informar o número de cômodos da residência',
  ),
  material_de_construcao: Yup.string().required(
    'Você precisa escolher um dos campos de material de construção da residência',
  ),
  agua_potavel: Yup.string().required(
    'Você precisa escolher um dos campos de abastecimento de água potável',
  ),
  agua_animais: Yup.string(),
  agua_producao_alimentos: Yup.string(),
  esgoto: Yup.string().required(
    'Você precisa escolher um dos campos de abastecimento de esgoto',
  ),
  numero_de_pessoas: Yup.number().required(
    'Você precisa informar o número de pessoas que moram na residência',
  ),
  uma_pessoa_domicilio: Yup.boolean(),
  cinco_anos_ou_mais: Yup.number(),
  entre_6_e_18: Yup.number(),
  entre_19_e_59: Yup.number(),
  sessenta_anos_ou_mais: Yup.number(),
  pessoas_convidadas: Yup.string().required(
    'Você precisa escolher um dos campos de pessoas convidadas',
  ),
  nao_sabe_renda: Yup.boolean(),
  renda_familiar: Yup.number(),
  faixa_de_renda: Yup.string().required(
    'Você precisa escolher um dos campos de faixa de renda',
  ),
  perda_de_emprego: Yup.boolean(),
  reducao_de_salario: Yup.boolean(),
  ajuda_financeira: Yup.boolean(),
  divida: Yup.boolean(),
  corte_de_gastos: Yup.boolean(),
  corte_de_gastos_nao_essenciais: Yup.boolean(),
  ns_nr: Yup.boolean(),
  menores_6_anos: Yup.string().required(
    'Você precisa escolher um dos campos de crianças menores de 6 anos',
  ),
  frequentam_creche: Yup.string(),
  cadastro_unico: Yup.string().required(
    'Você precisa escolher um dos campos do cadastro único',
  ),
  bolsa_familia: Yup.string().required(
    'Você precisa escolher um dos campos do bolsa família',
  ),
  bpc: Yup.string().required(
    'Você precisa escolher um dos campos do bpc',
  ),
  pensao: Yup.string().required(
    'Você precisa escolher um dos campos de pensão',
  ),
  auxilio_reclusao: Yup.string().required(
    'Você precisa escolher um dos campos de auxílio reclusão',
  ),
  cesta_de_alimentos: Yup.string().required(
    'Você precisa escolher um dos campos de cesta de alimentos',
  ),
  restaurantes_populares: Yup.string().required(
    'Você precisa escolher um dos campos de restaurantes populares',
  ),
  auxilio_emergencial: Yup.string().required(
    'Você precisa escolher um dos campos de auxílio emergencial',
  ),
  auxilio_vezes: Yup.string(),
  ajuda_instituicao_caridade: Yup.string().required(
    'Você precisa escolher um dos campos de ajuda recebida',
  ),
  tipo_de_ajuda: Yup.string(),
  vergonha: Yup.string().required(
    'Você precisa escolher um dos campos',
  ),
  produz_alimento: Yup.string().required(
    'Você precisa escolher um dos campos de produção de alimentos',
  ),
  alimento_para_venda: Yup.string(),
  divisao_alimento: Yup.string(),
  dificuldade_venda: Yup.string(),
  nao_vendeu: Yup.string(),
  preocupacao_alimentos: Yup.string().required(
    'Você precisa escolher um dos campos de PREOCUPAÇÃO DE QUE OS ALIMENTOS ACABASSEM',
  ),
  alimentos_acabaram: Yup.string().required(
    'Você precisa escolher um dos campos de OS ALIMENTOS ACABARAM',
  ),
  alimentos_saudaveis: Yup.string().required(
    'Você precisa escolher um dos campos de ALIMENTAÇÃO SAUDÁVEL E VARIADA',
  ),
  alimentos_poucos_tipos: Yup.string(),
  refeicoes_adulto: Yup.string(),
  adulto_comeu_menos: Yup.string(),
  adulto_fome: Yup.string(),
  adulto_uma_refeicao: Yup.string(),
  como_adquiriu_comida: Yup.string().required(
    'Você precisa escolher um dos campos de que forma você e as pessoas da sua casa estão adquirindo os alimentos',
  ),
  alteracao_preco_comida: Yup.string().required(
    'Você precisa escolher um dos campos observou alguma alteração nos preços dos alimentos',
  ),
  perfil_de_compra: Yup.string(),
  mercado: Yup.string().required(
    'Você precisa escolher um dos campos de qual foi o tipo de estabelecimento mais frequentado para compra de alimentos',
  ),
  gastos_alimentacao: Yup.string().required(
    'Você precisa escolher um dos campos sobre as despesas/gastos semanais com alimentação',
  ),
  // Alimentação
  feijao: Yup.boolean(),
  arroz: Yup.boolean(),
  carnes: Yup.boolean(),
  verduras_legumes: Yup.boolean(),
  frutas_frescas: Yup.boolean(),
  leite: Yup.boolean(),
  hamburguer_embutidos: Yup.boolean(),
  bebidas_adocadas: Yup.boolean(),
  macarrao_instantaneo_salgadinhos_de_pacote_biscoitos_salgados: Yup.boolean(),
  biscoito_recheado_doces_guloseimas: Yup.boolean(),
});
