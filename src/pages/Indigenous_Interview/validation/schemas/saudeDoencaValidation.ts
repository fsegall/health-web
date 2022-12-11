import * as Yup from 'yup';

export const SaudeDoencaValidation = Yup.object().shape({
    tomou_vacina_covid: Yup.string().required('Você precisa preencher sobre a vacina do COVID'),
    entrevista_indigena_id: Yup.string().required('Esse módulo deve estar vinculado com uma entrevista indígena'),
    motivo_nao_tomar_vacina_covid: Yup.string().nullable().when("tomou_vacina_covid", {
        is: (val: any) => String(val) === "nao",
        then: Yup.string().nullable().required("Você precisa preencher o motivo de não ter tomado a vacina"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    condicao_de_saude: Yup.string().required('Você precisa preencher sobre a condição de saúde'),
    tekoha_mudou_condicao_de_saude: Yup.string().nullable().notRequired(),
    morador_exposto_veneno_lavoura: Yup.string().required('Você precisa preencher sobre a lavoura'),
    doencas_contato_veneno_lavoura: Yup.string().nullable().when("morador_exposto_veneno_lavoura", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher as doenças do contato com veneno"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    motivo_doencas_contato_veneno_lavoura: Yup.string().nullable().when("doencas_contato_veneno_lavoura", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre as causas da doença do contato com veneno"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    acidentes: Yup.string().required('Você precisa preencher se houveram acidentes'),
    acidentes_ocorridos: Yup.string().nullable().when("acidentes", {
        is: (val: any) => (String(val)?.includes("nao") || String(val)?.includes("ns-nr")),
        then: Yup.string().nullable().notRequired(),
        otherwise: Yup.string().nullable().required("Você precisa preencher sobre os acidentes"),
    }),
    ocorrencia_de_ameacas: Yup.string().required('Você precisa precisa preencher sobre ameaças'),
    ocorrencia_violencia_fisica: Yup.string().required('Você precisa sobre violência física'),
    local_ocorrencia_violencia_fisica: Yup.string().nullable().when("ocorrencia_violencia_fisica", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre o local de violência física"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    lista_tratamentos: Yup.array().required('Você precisa preencher sobre tratamentos'),
    tratamento_com_paje_ou_similar: Yup.string().required('Você precisa preencher sobre tratamentos'),
    tratamento_igreja: Yup.string().required('Você precisa preencher sobre cura na igreja'),
    medicacao_uso_continuo: Yup.string().required('Você precisa prencher sobre medicamentos'),
    doenca_medicacao_uso_continuo: Yup.string().nullable().when("medicacao_uso_continuo", {
        is: (val: any) => [
            "remedios",
            "ervas",
            "remedios_e_ervas",
        ].find(v => v === String(val)),
        then: Yup.string().nullable().required("Você precisa preencher sobre os motivos do medicamento"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    primeiro_recurso_ao_notar_doenca: Yup.string().required('Você precisa preencher sobre onde recorre ao notar doença'),
    morador_internado: Yup.string().required('Você precisa preencher se houve algum morador internado'),
    morador_problemas_bebidas_alcoolicas: Yup.string().required('Você precisa preencher sobre problemas com bebidas'),
    morador_problemas_uso_drogas: Yup.string().required('Você precisa preencher sobre problemas com drogas'),
    fuma_cigarro: Yup.string().required('Você precisa preencher sobre cigarro'),
    familiar_morte: Yup.string().nullable().notRequired(),
    familiar_morte_contribuia_renda_familiar: Yup.string().nullable().notRequired(),
});
