export default interface ICreatePersonDTO {
  id?: string; //backend - generated UUID
  interviewer_id?: string;//backend - generated UUID - Supplied by local storage auth
  nome: string;
  idade: number;
  sexo: string;
  raca_cor: string;
  ler_escrever: string;
  escolaridade: string;
  situacao_de_trabalho: string;
  ocupacao: string;
  local_de_trabalho: string;
  diagnostico_covid: string;
  vacina?: string;
  nao_tomou_vacina?: string;
  estado_de_saude: string;
  local_de_procura_do_servico_de_saude: string[];
  motivo_procura_servico_saude: string[];
  motivo_nao_atendimento_servico_saude?: string[];
  doenca_ultimos_12_meses: string[];
  diagnostico_doenca_ultimos_12_meses: string[];
}
