import * as Yup from 'yup';

export const ApoioProtecaoSocialValidation = Yup.object().shape({
    entrevista_indigena_id: Yup.string().nullable().notRequired(),
    criancas_comem_escola: Yup.string().required('Você precisa preencher sobre a merenda escolar'),
    alimentacao_escolar_inclui_cultura: Yup.string().nullable().when("criancas_comem_escola", {
        is: (val: any) => (String(val) === "sim" || String(val) === "nao" || String(val) === "nem_sempre"),
        then: Yup.string().nullable().required("Você precisa preencher sobre os alimentos culturais na merenda"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    morador_recebe_ajuda_financeira: Yup.string().required('Você precisa preencher sobre ajuda financeira'),
    recebeu_cesta_alimentos: Yup.string().nullable().when("cesta_alimentos", {
        is: (val: any) => String(val) === "sim",
        then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    recebeu_cesta_alimentos_que_alimentos_deveriam_ter: Yup.string().nullable().when("cesta_alimentos", {
        is: (val: any) => String(val) === "sim",
        then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    descricao_adicionar_outro: Yup.string().nullable(),
    motivo_nao_recebe_cesta_alimentos: Yup.string().nullable().when("cesta_alimentos", {
        is: (val: any) => String(val) !== "sim",
        then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    recebeu_ajuda_3m: Yup.string().required('Você precisa preencher sobre ajuda do estado'),
    o_que_recebeu_ajuda_3m: Yup.string().nullable().when("recebeu_ajuda_3m", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre os itens recebidos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    constrangimento_pedir_ajuda_alimentos_3m: Yup.string().required('Você precisa preencher sobre constrangimento para conseguir alimento'),

    bolsa_familia_auxilio_brasil: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    bpc: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    beneficio_deficientes_idosos: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_maternidade: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_doenca: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_reclusao: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    aposentadoria: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    pensao_morte: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    pronaf: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    programa_auxilio_estadual_municipal: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    cesta_alimentos: Yup.string().required('Você deve preencher sobre cestas de alimentos'),
});
