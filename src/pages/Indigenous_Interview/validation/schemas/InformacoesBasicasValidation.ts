import * as Yup from 'yup';

export const InformacoesBasicasValidation = Yup.object().shape({
    projeto_numero: Yup.number().required('Você precisa inserir o número do projeto'),
    distrito_sanitario_indigena: Yup.string().required('Você precisa preencher o DSI'),
    municipio: Yup.string().required('Você precisa preencher o município'),
    aldeia_comunidade: Yup.string().required('Você precisa preencher aldeia ou comunidade'),
    tipo_comunidade: Yup.string().required('Você precisa preencher sobre o tipo de comunidade'),
    entrevistador_id: Yup.string().required('Você precisa ter um entrevistador vinculado'),
    data_entrevista: Yup.date(),
    responsavel_documentos: Yup.array().required('Você precisa cadastrar os documentos do responsável'),
});
