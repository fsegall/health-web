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
  vacina: string;
  nao_tomou_vacina?: string;
}
