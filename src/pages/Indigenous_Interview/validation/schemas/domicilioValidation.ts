import * as Yup from 'yup';

export const DomicilioValidation = Yup.object().shape({
    morada_atual: Yup.string().required('Você preencher sobre a moradia atual'),
    ultima_moradia: Yup.string().required('Você preencher sobre a última moradia'),
    entrevista_indigena_id: Yup.string().required('Esse módulo deve estar vinculado com uma entrevista indígena'),
    piso: Yup.string().required('Você precisa digitar o material do piso'),
    material_paredes: Yup.string().required('Você precisa selecionar o material das paredes'),
    material_telhado: Yup.string().required('Você precisa selecionar o material do telhado'),
    quantidade_comodos: Yup.number().required('Você precisa digitar a quantidade de cômodos').min(0, 'O número deve ser maior que zero'),
    utensilios_casa: Yup.array().required('Você precisa listar os utensílios existentes na casa'),
    origem_agua: Yup.string().required('Você precisa selecionar a origem da água'),
    qualidade_agua_para_beber_e_cozinhar: Yup.string().required('Você precisa classificar a qualidade da água'),
    forma_acesso_agua: Yup.string().required('Você precisa selecionar a forma de acesso à água'),
    possui_banheiro: Yup.string().required('Você precisa preencher sobre os banheiros'),
    forma_coleta_esgoto: Yup.string().required('Você precisa preencher a forma de esgoto'),
    destino_lixo_da_residencia: Yup.array().required('Você precisa preencher sobre o destino do lixo'),
    veiculos: Yup.array().required('Você precisa preencher sobre os veículos'),
    renda_total_30_dias: Yup.string().required('Você precisa informar a renda'),
});
