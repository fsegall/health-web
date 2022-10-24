import * as Yup from 'yup';

export const InformacoesBasicasValidation = Yup.object().shape({
    municipio: Yup.string().required('Você precisa digitar um município'),
    aldeia_comunidade: Yup.string().required('Você precisa digitar uma aldeia ou comunidade'),
    terra_indigena: Yup.string().required('Você precisa digitar uma terra indígena'),
    area_retomada: Yup.string().required('Você precisa digitar uma área de retomada'),
    acampamento: Yup.string().required('Você precisa digitar um acampamento'),
    entrevistador_id: Yup.string().required('Você precisa ter um entrevistador vinculado'),
    numero_projeto: Yup.number().required('Você precisa inserir o número do projeto'),
    data_entrevista: Yup.date(),
    primeiro_contato_responsavel: Yup.string().required('Você precisa cadastrar se é o responsável'),
});