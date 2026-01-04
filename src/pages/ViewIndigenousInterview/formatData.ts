import {
  sexoOptions,
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

// Função para formatar etnias (busca em array de objetos)
const formatEtnias = (value: any): string => {
  if (!value) return '-';
  if (Array.isArray(value)) {
    return value
      .map((v) => {
        const option = etniasNewOptions.find((opt: any) => opt.value === v);
        return option?.label || v;
      })
      .filter(Boolean)
      .join(', ');
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((v) => {
        const option = etniasNewOptions.find((opt: any) => opt.value === v.trim());
        return option?.label || v.trim();
      })
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

// Placeholder para outros módulos - vamos expandir conforme necessário
export const formatSaudeDoencaData = (data: any) => {
  if (!data) return null;
  return data; // Retornar dados brutos por enquanto
};

export const formatAlimentacaoNutricaoData = (data: any) => {
  if (!data) return null;
  return data; // Retornar dados brutos por enquanto
};

export const formatApoioProtecaoSocialData = (data: any) => {
  if (!data) return null;
  return data; // Retornar dados brutos por enquanto
};

