import * as Yup from 'yup';

export const InformacoesBasicasValidation = Yup.object().shape({
    municipio: Yup.string().required('Você precisa digitar um município'),
    aldeia_comunidade: Yup.string().required('Você precisa digitar uma aldeia ou comunidade'),
    terra_indigena: Yup.string().required('Você precisa digitar uma terra indígena'),
    area_de_retomada: Yup.string().required('Você precisa digitar uma área de retomada'),
    acampamento: Yup.string().required('Você precisa digitar um acampamento'),
    entrevistador: Yup.string().required('Você precisa ter um entrevistador vinculado'),
    data_da_entrevista: Yup.date(),
    primeiro_contato_responsavel: Yup.string().required('Você precisa cadastrar se é o responsável'),
});