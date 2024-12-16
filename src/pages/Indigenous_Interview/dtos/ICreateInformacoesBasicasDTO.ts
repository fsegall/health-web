export default interface ICreateInformacoesBasicasDTO {
  id?: string; //backend - generated UUID
  projeto_numero: number;
  distrito_sanitario_indigena: string;
  municipio: string;
  aldeia_comunidade: string;
  tipo_comunidade: string;
  entrevistador_id: string;
  data_entrevista: string;
  responsavel_documentos: string[];
}
