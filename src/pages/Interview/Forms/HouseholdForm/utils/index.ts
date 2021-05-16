import ICreateHouseholdDTO from '../../../dtos/ICreateHouseholdDTO';

export const parseHouseholdData = (data: ICreateHouseholdDTO) => {
  return {
    ...data,
    cinco_anos_ou_mais: data.cinco_anos_ou_mais/*  || 0 */, // comments - person can or can't leave input empty
    entre_6_e_18: data.entre_6_e_18/*  || 0 */,
    entre_19_e_59: data.entre_19_e_59/*  || 0 */,
    sessenta_anos_ou_mais: data.sessenta_anos_ou_mais/*  || 0 */,
    pessoas_convidadas: data.pessoas_convidadas || 'ns-nr',
    nao_sabe_renda: validateCheckbox(data.nao_sabe_renda),
    renda_familiar: data.renda_familiar || 0,
    auxilio_vezes: data.auxilio_vezes || 0,
    uma_pessoa_domicilio: validateCheckbox(data.uma_pessoa_domicilio),
    perda_de_emprego: validateCheckbox(data.perda_de_emprego),
    reducao_de_salario: validateCheckbox(data.reducao_de_salario),
    ajuda_financeira: validateCheckbox(data.ajuda_financeira),
    divida: validateCheckbox(data.divida),
    corte_de_gastos: validateCheckbox(data.corte_de_gastos),
    corte_de_gastos_nao_essenciais: validateCheckbox(data.corte_de_gastos_nao_essenciais),
    ns_nr: validateCheckbox(data.ns_nr),
    // Alimentação
    feijao: validateCheckbox(data.feijao),
    arroz: validateCheckbox(data.arroz),
    carnes: validateCheckbox(data.carnes),
    verduras_legumes: validateCheckbox(data.verduras_legumes),
    frutas_frescas: validateCheckbox(data.frutas_frescas),
    leite: validateCheckbox(data.leite),
    hamburguer_embutidos: validateCheckbox(data.hamburguer_embutidos),
    bebidas_adocadas: validateCheckbox(data.bebidas_adocadas),
    macarrao_instantaneo_salgadinhos_de_pacote_biscoitos_salgados: validateCheckbox(data.macarrao_instantaneo_salgadinhos_de_pacote_biscoitos_salgados),
    biscoito_recheado_doces_guloseimas: validateCheckbox(data.biscoito_recheado_doces_guloseimas),
  }
};

export const validateCheckbox = (checkArray: any): string[] | boolean | undefined => checkArray && checkArray.length === 0 ? false : checkArray;
