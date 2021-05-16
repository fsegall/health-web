export default interface IUpdatePersonDTO {
  interviewer_id?: string;
  person_id?: string;
  P1_nome: string;
  P2_idade: number;
  P3_sexo: string;
  P4_raca_cor: string;
  P5_ler_escrever: string;
  P6_escolaridade: string;
  P7_situacao_de_trabalho: string;
  P8_ocupacao?: string;
  P9_local_de_trabalho?: string;
  P10_diagnostico_covid: string;
}
