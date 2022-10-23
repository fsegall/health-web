export default interface ICreateInformacoesBasicasDTO {
    id?: string; //backend - generated UUID
    municipio: string; //B1
    aldeia_comunidade: string; //B2
    terra_indigena: string; //B3
    area_retomada: string; //B4
    acampamento: string; //B5
    entrevistador_id: string; //B6
    numero_projeto: number;
    data_entrevista: string;

    primeiro_contato_responsavel: boolean;
  }
  