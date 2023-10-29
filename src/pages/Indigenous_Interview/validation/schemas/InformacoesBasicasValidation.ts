import * as Yup from 'yup';

export const InformacoesBasicasValidation = Yup.object().shape({
    municipio: Yup.string().required('Você precisa digitar um município'),
    aldeia_comunidade: Yup.string().required('Você precisa digitar uma aldeia ou comunidade'),
    tipo_comunidade: Yup.string().required('Você precisa preencher sobre o tipo de comunidade'),
    entrevistador_id: Yup.string().required('Você precisa ter um entrevistador vinculado'),
    numero_projeto: Yup.number().required('Você precisa inserir o número do projeto'),
    data_entrevista: Yup.date(),
    responsavel_documentos: Yup.string().required('Você precisa cadastrar os documentos do responsável'),
});
