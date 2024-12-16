import * as Yup from 'yup';

export const DomicilioValidation = Yup.object().shape({
    tipo_moradia: Yup.array().required('Você preencher sobre a moradia atual'),
    considera_moradia_adequada: Yup.string().required('Você preencher se considera sua moradia adequada para viver'),
    ultima_moradia: Yup.string().required('Você preencher sobre a última moradia'),
    entrevista_indigena_id: Yup.string().nullable().notRequired(),
    piso: Yup.string().required('Você precisa digitar o material do piso'),
    material_paredes: Yup.string().required('Você precisa selecionar o material das paredes'),
    material_telhado: Yup.string().required('Você precisa selecionar o material do telhado'),
    possui_energia_eletrica: Yup.string().required('Você precisa selecionar sobre energia elétrica'),
    utensilios_casa: Yup.array().required('Você precisa listar os utensílios existentes na casa'),
    utensilios_de_trabalho: Yup.array().required('Você precisa listar os equipamentos de trabalho rural existentes na sua casa'),
    veiculos: Yup.array().required('Você precisa preencher sobre os veículos'),
    origem_agua: Yup.string().required('Você precisa selecionar a origem da água'),
    qualidade_agua_para_beber_e_cozinhar: Yup.string().required('Você precisa classificar a qualidade da água'),
    motivo_qualidade_ruim_agua_para_beber_e_cozinhar: Yup.string().nullable().when("qualidade_agua_para_beber_e_cozinhar", {
      is: (val: any) => String(val) === "false",
      then: Yup.string().nullable().required("Você precisa preencher sobre os motivos da qualidade ruim da água"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    forma_acesso_agua: Yup.string().required('Você precisa selecionar a forma de acesso à água'),
    possui_banheiro: Yup.string().required('Você precisa preencher sobre os banheiros'),
    forma_coleta_esgoto: Yup.array().required('Você precisa preencher a forma de esgoto'),
    destino_lixo_da_residencia: Yup.array().required('Você precisa preencher sobre o destino do lixo'),
});
