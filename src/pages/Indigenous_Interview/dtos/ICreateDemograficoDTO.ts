export default interface ICreateDemograficoDTO {
  entrevista_indigena_id?: string; //backend - generated UUID
  total_moradores: number;
  moradores: QuadroSocioDemograficoDTO[] // form array

  morador_nao_indigena: string;
  quantidade_morador_nao_indigena?: number;
  povo_etnia?: string[];
  serie_frequentada_escola: string;
  crenca_religiao: string;
  crenca_religiao_igreja?: string;
  situacao_no_trabalho?: string[];
  remuneracao_trabalho_na_aldeia?: string;
  funcao_trabalho_remunerado_na_aldeia?: string;
  remuneracao_trabalho_fora_aldeia?: string;
  funcao_trabalho_remunerado_fora_da_aldeia?: string;
  funcao_nao_remunerada_aldeia: string;
  motivo_nao_trabalha?: string;
}

interface QuadroSocioDemograficoDTO {
  id: number;
  nome: string;
  relacao_com_lider: string;
  maior_de_um_ano: string; // default "sim"
  idade?: number;
  idade_em_meses?: number;
  sexo: string; // select
}
