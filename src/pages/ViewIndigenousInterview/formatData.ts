import {
  crencasOptions,
  grauEscolaridadeOptions,
  situacaoTrabalhoOptions,
  funcaoNaComunidadeOptions,
  yesOrNoOptions,
  simOuNao,
  etniasNewOptions,
  crencasIgrejaOptions,
  funcaoTrabalhoAldeiaOptions,
  funcaoTrabalhoForaAldeiaOptions,
  motivosNaoTrabalhaOptions,
  pisoCasaOptions,
  paredesCasaOptions,
  telhadoCasaOptions,
  utensiliosCasaOptions,
  origemAguaOptions,
  acessoAguaCasaOptions,
  banheiroCasaOptions,
  coletaEsgotoCasaOptions,
  destinoLixoOptions,
  veiculosOptions,
  ultimaMoradaOptions,
  moradaHojeOptions,
  energiaEletricaOptions,
  equipamentosDeTrabalhoRuralEmCasaOptions,
  motivoQualidadeRuimAguaOptions,
  moradiaOptions,
  plantiosHorta,
  criancasComemNaEscola,
  merendaEscolarIncluiAlimentosTradicionais,
  apoioFinanceiro,
  origemCestaAlimentos,
  coletaOptions,
  funcaoHortaOptions,
  rocaOuHortaOptions,
  motivacaoNaoProduzirHorta,
  fornecedorHorta,
  utilizaVenenoPlantio,
  dificuldadesHorta,
  criacaoAnimaisComerOuVender,
  alimentosConsumidosOntem,
  renda30dOptions,
} from '../Indigenous_Interview/questions/SelectorOptions/options';

// Função auxiliar para obter label de um valor
const getLabel = (value: any, options: { [key: string]: string }): string => {
  if (!value) return '-';
  if (Array.isArray(value)) {
    return value
      .map((v) => options[v] || v)
      .filter(Boolean)
      .join(', ');
  }
  return options[value] || value || '-';
};

// Função para formatar valores de campos multi-select (string separada por vírgula)
const formatMultiSelect = (value: any, options: { [key: string]: string }): string => {
  if (!value) return '-';
  if (Array.isArray(value)) {
    return value.map((v) => options[v] || v).filter(Boolean).join(', ');
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((v) => options[v.trim()] || v.trim())
      .filter(Boolean)
      .join(', ');
  }
  return options[value] || value || '-';
};

// Função para formatar etnias (etniasNewOptions é um objeto chave-valor)
const formatEtnias = (value: any): string => {
  if (!value) return '-';
  const etniasObj = etniasNewOptions as { [key: string]: string };
  if (Array.isArray(value)) {
    return value
      .map((v) => etniasObj[String(v)] || v)
      .filter(Boolean)
      .join(', ');
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((v) => etniasObj[v.trim()] || v.trim())
      .filter(Boolean)
      .join(', ');
  }
  return '-';
};

export const formatDemograficoData = (data: any) => {
  if (!data) return null;

  return {
    'Morador não indígena': getLabel(data.morador_nao_indigena, yesOrNoOptions),
    'Quantidade moradores não indígenas':
      data.quantidade_morador_nao_indigena || '-',
    'Etnia/Povo': formatEtnias(data.povo_etnia),
    'Série frequentada na escola': getLabel(
      data.serie_frequentada_escola,
      grauEscolaridadeOptions,
    ),
    'Crença religiosa': getLabel(data.crenca_religiao, crencasOptions),
    'Crença religiosa - Igreja': getLabel(
      data.crenca_religiao_igreja,
      crencasIgrejaOptions,
    ),
    'Situação no trabalho': formatMultiSelect(
      data.situacao_no_trabalho,
      situacaoTrabalhoOptions,
    ),
    'Remuneração trabalho na aldeia': getLabel(
      data.remuneracao_trabalho_na_aldeia,
      simOuNao,
    ),
    'Função trabalho remunerado na aldeia': getLabel(
      data.funcao_trabalho_remunerado_na_aldeia,
      funcaoTrabalhoAldeiaOptions,
    ),
    'Remuneração trabalho fora da aldeia': getLabel(
      data.remuneracao_trabalho_fora_aldeia,
      simOuNao,
    ),
    'Função trabalho remunerado fora da aldeia': getLabel(
      data.funcao_trabalho_remunerado_fora_da_aldeia,
      funcaoTrabalhoForaAldeiaOptions,
    ),
    'Função não remunerada na aldeia': getLabel(
      data.funcao_nao_remunerada_aldeia,
      funcaoNaComunidadeOptions,
    ),
    'Motivo não trabalha': getLabel(
      data.motivo_nao_trabalha,
      motivosNaoTrabalhaOptions,
    ),
    'Total de moradores': data.total_moradores || '-',
    Moradores: data.moradores || [],
  };
};

export const formatDomicilioData = (data: any) => {
  if (!data) return null;

  return {
    'Última moradia': getLabel(data.ultima_moradia, ultimaMoradaOptions),
    'Considera moradia adequada': getLabel(
      data.considera_moradia_adequada,
      moradiaOptions,
    ),
    'Tipo de moradia': formatMultiSelect(data.tipo_moradia, moradaHojeOptions),
    'Tipo de piso': getLabel(data.piso, pisoCasaOptions),
    'Material das paredes': getLabel(data.material_paredes, paredesCasaOptions),
    'Material do telhado': getLabel(
      data.material_telhado,
      telhadoCasaOptions,
    ),
    'Possui energia elétrica': getLabel(
      data.possui_energia_eletrica,
      energiaEletricaOptions,
    ),
    'Utensílios da casa': formatMultiSelect(
      data.utensilios_casa,
      utensiliosCasaOptions,
    ),
    'Utensílios de trabalho': formatMultiSelect(
      data.utensilios_de_trabalho,
      equipamentosDeTrabalhoRuralEmCasaOptions,
    ),
    'Veículos': formatMultiSelect(data.veiculos, veiculosOptions),
    'Origem da água': getLabel(data.origem_agua, origemAguaOptions),
    'Qualidade da água para beber e cozinhar': getLabel(
      data.qualidade_agua_para_beber_e_cozinhar,
      yesOrNoOptions,
    ),
    'Motivo qualidade ruim da água': getLabel(
      data.motivo_qualidade_ruim_agua_para_beber_e_cozinhar,
      motivoQualidadeRuimAguaOptions,
    ),
    'Forma de acesso à água': getLabel(
      data.forma_acesso_agua,
      acessoAguaCasaOptions,
    ),
    'Possui banheiro': getLabel(data.possui_banheiro, banheiroCasaOptions),
    'Forma de coleta de esgoto': formatMultiSelect(
      data.forma_coleta_esgoto,
      coletaEsgotoCasaOptions,
    ),
    'Destino do lixo': formatMultiSelect(
      data.destino_lixo_da_residencia,
      destinoLixoOptions,
    ),
  };
};

// Função genérica para formatar dados com labels legíveis
const formatGenericData = (
  data: any,
  fieldMapping: { [key: string]: { label: string; options?: { [key: string]: string }; isMulti?: boolean } },
): { [key: string]: any } => {
  if (!data) return {};
  
  const formatted: { [key: string]: any } = {};
  
  Object.entries(fieldMapping).forEach(([key, config]) => {
    if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
      if (config.isMulti && config.options) {
        formatted[config.label] = formatMultiSelect(data[key], config.options);
      } else if (config.options) {
        formatted[config.label] = getLabel(data[key], config.options);
      } else {
        formatted[config.label] = data[key];
      }
    }
  });
  
  return formatted;
};

export const formatSaudeDoencaData = (data: any) => {
  if (!data) return null;
  
  // Mapeamento dos principais campos
  const fieldMapping: { [key: string]: { label: string; options?: { [key: string]: string }; isMulti?: boolean } } = {
    condicao_de_saude: { label: 'Condição de saúde', options: undefined },
    morador_com_desabilidade: { label: 'Morador com deficiência', isMulti: true },
    local_permite_viver_com_saude: { label: 'Local permite viver com saúde', options: yesOrNoOptions },
    morador_exposto_veneno_lavoura: { label: 'Exposição a veneno/lavoura', isMulti: true },
    acidentes: { label: 'Acidentes', isMulti: true },
    ocorrencia_de_ameacas: { label: 'Ocorrência de ameaças', isMulti: true },
    ocorrencia_violencia_fisica: { label: 'Ocorrência de violência física', isMulti: true },
  };
  
  return formatGenericData(data, fieldMapping);
};

export const formatAlimentacaoNutricaoData = (data: any) => {
  if (!data) return null;
  
  const fieldMapping: { [key: string]: { label: string; options?: { [key: string]: string }; isMulti?: boolean } } = {
    possui_moradores_menores_de_16: { label: 'Possui moradores menores de 16 anos', options: simOuNao },
    preocupação_nao_conseguir_comida: { label: 'Preocupação em conseguir comida', options: yesOrNoOptions },
    deixaram_de_comer_comida_da_cultura: { label: 'Deixaram de comer comida da cultura', options: yesOrNoOptions },
    deixaram_de_comer_comida_saudavel: { label: 'Deixaram de comer comida saudável', options: yesOrNoOptions },
    faltou_comida_algum_dia: { label: 'Faltou comida algum dia', options: yesOrNoOptions },
    dia_todo_sem_comer: { label: 'Dia todo sem comer', options: yesOrNoOptions },
    comeu_menos_para_deixar_comida_crianca: { label: 'Comeu menos para deixar comida para crianças', options: yesOrNoOptions },
    crianca_comeu_menos: { label: 'Criança comeu menos que o necessário', options: yesOrNoOptions },
    criança_dia_todo_sem_comer: { label: 'Criança passou dia todo sem comer', options: yesOrNoOptions },
    constrangimento_pedir_ajuda_alimentos: { label: 'Constrangimento ao pedir ajuda para alimentos', options: yesOrNoOptions },
    morador_faz_horta: { label: 'Alguém faz roça ou horta', options: rocaOuHortaOptions },
    motivo_morador_nao_faz_horta: { label: 'Motivo não fazer horta', options: motivacaoNaoProduzirHorta, isMulti: true },
    alimentos_da_horta: { label: 'Alimentos da horta', options: plantiosHorta, isMulti: true },
    alimentos_da_horta_outros: { label: 'Alimentos da horta (outros)', options: undefined },
    frutiferas_nas_proximidades: { label: 'Cultiva frutíferas próximas', options: yesOrNoOptions },
    frutiferas_nas_proximidades_quais: { label: 'Quais frutíferas', options: undefined },
    coleta_castanhas_cocos_frutas: { label: 'Coleta de castanhas/cocos/frutas', options: coletaOptions, isMulti: true },
    funcao_cultivo_horta: { label: 'Função do cultivo da horta', options: funcaoHortaOptions, isMulti: true },
    origem_semente_plantio: { label: 'Origem das sementes/rama', options: fornecedorHorta, isMulti: true },
    adiciona_veneno_na_plantacao: { label: 'Adiciona veneno na plantação', options: utilizaVenenoPlantio },
    dificuldade_com_horta: { label: 'Dificuldade com horta', options: yesOrNoOptions },
    lista_dificuldades_com_horta: { label: 'Lista de dificuldades com horta', options: dificuldadesHorta, isMulti: true },
    animais_de_criacao_alimentacao_ou_venda: { label: 'Cria animais para comer/vender', options: yesOrNoOptions },
    lista_animais_de_criacao_alimentacao_ou_venda: { label: 'Animais criados', options: criacaoAnimaisComerOuVender, isMulti: true },
    realizam_caca: { label: 'Realizam caça', options: yesOrNoOptions },
    realizam_pesca: { label: 'Realizam pesca', options: yesOrNoOptions },
    possui_cultivo_plantas_medicinais: { label: 'Possui cultivo de plantas medicinais', options: yesOrNoOptions },
    alimentos_consumidos_dia_anterior: { label: 'Alimentos consumidos no dia anterior', options: alimentosConsumidosOntem, isMulti: true },
  };
  
  return formatGenericData(data, fieldMapping);
};

export const formatApoioProtecaoSocialData = (data: any) => {
  if (!data) return null;
  
  const fieldMapping: { [key: string]: { label: string; options?: { [key: string]: string }; isMulti?: boolean } } = {
    possui_crianca_ou_jovem_que_frequenta_escola: { label: 'Possui criança/jovem na escola', options: yesOrNoOptions },
    criancas_comem_escola: { label: 'Crianças comem na escola', options: criancasComemNaEscola },
    alimentacao_escolar_inclui_cultura: { label: 'Alimentação escolar inclui cultura', options: merendaEscolarIncluiAlimentosTradicionais },
    renda_total_30_dias: { label: 'Renda total últimos 30 dias', options: undefined },
    opcoes_renda_total_30_dias: { label: 'Renda total (salários mínimos)', options: renda30dOptions },
    bolsa_familia_auxilio_brasil: { label: 'Recebe Bolsa Família/Auxílio Brasil', options: apoioFinanceiro },
    valor_bolsa_familia_auxilio_brasil: { label: 'Valor Bolsa Família/Auxílio Brasil', options: undefined },
    bpc: { label: 'Recebe BPC', options: apoioFinanceiro },
    valor_bpc: { label: 'Valor BPC', options: undefined },
    auxilio_maternidade: { label: 'Recebe Auxílio Maternidade', options: apoioFinanceiro },
    valor_auxilio_maternidade: { label: 'Valor Auxílio Maternidade', options: undefined },
    auxilio_doenca: { label: 'Recebe Auxílio Doença', options: apoioFinanceiro },
    valor_auxilio_doenca: { label: 'Valor Auxílio Doença', options: undefined },
    aposentadoria: { label: 'Recebe Aposentadoria', options: apoioFinanceiro },
    valor_aposentadoria: { label: 'Valor Aposentadoria', options: undefined },
    pensao_morte: { label: 'Recebe Pensão por Morte', options: apoioFinanceiro },
    valor_pensao_morte: { label: 'Valor Pensão por Morte', options: undefined },
    programa_auxilio_estadual_municipal: { label: 'Recebe Auxílio Estadual/Municipal', options: apoioFinanceiro },
    valor_programa_auxilio_estadual_municipal: { label: 'Valor Auxílio Estadual/Municipal', options: undefined },
    cesta_alimentos: { label: 'Recebe Cesta de Alimentos', options: apoioFinanceiro },
    recebeu_cesta_alimentos: { label: 'Origem da cesta de alimentos', options: origemCestaAlimentos, isMulti: true },
    motivo_nao_recebe_cesta_alimentos: { label: 'Motivo não recebe cesta', options: undefined },
  };
  
  return formatGenericData(data, fieldMapping);
};

