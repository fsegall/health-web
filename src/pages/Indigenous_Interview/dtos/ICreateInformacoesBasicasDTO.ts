export default interface ICreateInformacoesBasicasDTO {
    id?: string; //backend - generated UUID
    municipio: string;
    aldeia_comunidade: string;
    tipo_comunidade: string;
    entrevistador_id: string;
    numero_projeto: number;
    data_entrevista: string;

    responsavel_domicilio: boolean;
  }
