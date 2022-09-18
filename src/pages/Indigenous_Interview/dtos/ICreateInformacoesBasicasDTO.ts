export default interface ICreateInformacoesBasicasDTO {
    id?: string; //backend - generated UUID
    municipio: string; //B1
    aldeia_comunidade: string; //B2
    terra_indigena: string; //B3
    area_de_retomada: string; //B4
    acampamento: string; //B5
    entrevistador: string; //B6
    data_da_entrevista: string; // created_at?

    primeiro_contato_responsavel: boolean;
  }
  