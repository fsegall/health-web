export default interface ICreateApoioProtecaoSocialDTO extends ApoioFinanceiroDTO {
  possui_crianca_ou_jovem_que_frequenta_escola: string; //select
  criancas_comem_escola?: string; //select
  alimentacao_escolar_inclui_cultura?: string; //select
  renda_total_30_dias?: string; //select
  opcoes_renda_total_30_dias?: string; //select
  // se sim
  // ApoioFinanceiroDTO
  recebeu_cesta_alimentos?: string[]; //multi-select
  motivo_nao_recebe_cesta_alimentos?: string; //select
}

interface ApoioFinanceiroDTO {
  bolsa_familia_auxilio_brasil: string; //select
  valor_bolsa_familia_auxilio_brasil?: number | string;
  bpc: string; //select
  valor_bpc?: number | string;
  auxilio_maternidade: string; //select
  valor_auxilio_maternidade?: number | string;
  auxilio_doenca: string; //select
  valor_auxilio_doenca?: number | string;
  aposentadoria: string; //select
  valor_aposentadoria?: number | string;
  pensao_morte: string; //select
  valor_pensao_morte?: number | string;
  programa_auxilio_estadual_municipal: string; //select
  valor_programa_auxilio_estadual_municipal?: number | string
  cesta_alimentos: string; //select
}
