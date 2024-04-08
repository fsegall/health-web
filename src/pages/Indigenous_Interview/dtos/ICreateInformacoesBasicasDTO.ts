export default interface ICreateInformacoesBasicasDTO {
  id?: string; //backend - generated UUID
  municipio: string;
  aldeia_comunidade: string;
  tipo_comunidade: string;
  entrevistador_id: string;
  projeto_numero: number;
  data_entrevista: string;
  responsavel_documentos: string[];
}
