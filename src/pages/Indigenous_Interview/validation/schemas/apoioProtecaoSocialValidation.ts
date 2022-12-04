import * as Yup from 'yup';

export const ApoioProtecaoSocialValidation = Yup.object().shape({
    entrevista_indigena_id: Yup.string().required('Esse módulo deve estar vinculado com uma entrevista indígena'),
    criancas_comem_na_escola: Yup.string().required('Você precisa preencher sobre a merenda escolar'),
    escola_inclui_alimentos_da_cultura: Yup.string().nullable().when("criancas_comem_na_escola", {
        is: (val: any) => (String(val) !== "nao_tem_crianca" && String(val) !== "ns-nr"),
        then: Yup.string().nullable().required("Você precisa preencher sobre os alimentos culturais na merenda"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    morador_recebe_ajuda_financeira: Yup.string().required('Você precisa preencher sobre ajuda financeira'),
    origem_cesta_de_alimentos_3m: Yup.string().nullable().when("cesta_de_alimentos", {
        is: (val: any) => String(val) === "sim",
        then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    alimentos_deveriam_estar_na_cesta_e_nao_estao: Yup.string().nullable().when("cesta_de_alimentos", {
        is: (val: any) => String(val) === "sim",
        then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    descricao_adicionar_outro: Yup.string().nullable(),
    motivo_nao_recebe_cesta_de_alimentos: Yup.string().nullable().when("cesta_de_alimentos", {
        is: (val: any) => String(val) !== "sim",
        then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    ajuda_estado_prefeitura_outros_3m: Yup.string().required('Você precisa preencher sobre ajuda do estado'),
    itens_recebidos_ajuda_estado_prefeitura_outros_3m: Yup.string().nullable().when("ajuda_estado_prefeitura_outros_3m", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre os itens recebidos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    vergonha_constrangimento_para_conseguir_alimentos_3m: Yup.string().required('Você precisa preencher sobre constrangimento para conseguir alimento'),

    bolsa_familia_auxilio_brasil: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    bpc: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    beneficio_deficientes_ou_idosos: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_maternidade: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_doenca: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_reclusao: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    aposentadoria: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    pensao_morte_conjuge: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    pronaf: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_estadual_ou_municipal: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
    cesta_de_alimentos: Yup.string().required('Você deve preencher sobre cestas de alimentos'),
});
