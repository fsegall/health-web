export default interface ICreateHouseholdDTO {

  person_id?: string; // Supplied by local storage, not part of user form validation

  local_do_domicilio: string;
  morador_de_rua: string;
  povos_tradicionais: string;
  qual_povo_tradicional?: string;
  pessoa_de_referencia: string;
  idade_pessoa_de_referencia?: number;
  sexo_pessoa_de_referencia?: string;
  raca_cor?: string;
  ler_escrever?: string;
  escolaridade?: string;
  situacao_de_trabalho?: string;
  ocupacao_profissional?: string;
  local_de_trabalho?: string;
  covid_2020: string;
  covid_2021: string;
  covid_2022: string;
  covid_perda: string;
  tipo_de_residencia: string;
  numero_de_comodos: number;
  material_de_construcao: string;
  agua_potavel: string;
  agua_animais?: string;
  agua_producao_alimentos?: string;
  esgoto: string;
  numero_de_pessoas: number;
  uma_pessoa_domicilio: boolean;
  cinco_anos_ou_mais?: number;
  entre_6_e_18?: number;
  entre_19_e_59?: number;
  sessenta_anos_ou_mais?: number;
  pessoas_convidadas?: string;
  nao_sabe_renda?: boolean;
  renda_familiar?: number;
  faixa_de_renda: string;
  // multipla escolha
  perda_de_emprego?: boolean;
  reducao_de_salario?: boolean;
  ajuda_financeira?: boolean;
  divida?: boolean;
  corte_de_gastos?: boolean;
  corte_de_gastos_nao_essenciais?: boolean;
  ns_nr_trabalho?: boolean;
  //
  educacao_basica_publica: string;
  pnae?: string;
  cadastro_unico: string;
  bolsa_familia: string;
  bpc: string;
  pensao: string;
  auxilio_reclusao: string;
  cesta_de_alimentos: string;
  restaurantes_populares: string;
  auxilio_emergencial: string;
  auxilio_vezes?: string;
  ajuda_instituicao_caridade: string;
  tipo_de_ajuda?: string;
  vergonha: string;
  produz_alimento: string;
  alimento_para_venda?: string;
  divisao_alimento?: string;
  dificuldade_venda?: string;
  nao_vendeu?: string;
  preocupacao_alimentos: string;
  alimentos_acabaram: string;
  alimentos_saudaveis: string;
  alimentos_poucos_tipos?: string;
  refeicoes_adulto?: string;
  adulto_comeu_menos?: string;
  adulto_fome?: string;
  adulto_uma_refeicao?: string;
  como_adquiriu_comida: string;
  alteracao_preco_comida: string;
  perfil_de_compra?: string;
  mercado: string;
  gastos_alimentacao: string;
  // D68 - multipla escolha
  feijao?: boolean;
  arroz?: boolean;
  carnes?: boolean;
  verduras_legumes?: boolean;
  frutas_frescas?: boolean;
  leite?: boolean;
  hamburguer_embutidos?: boolean;
  bebidas_adocadas?: boolean;
  macarrao_instantaneo_salgadinhos_de_pacote_biscoitos_salgados?: boolean;
  biscoito_recheado_doces_guloseimas?: boolean;
  //
}
