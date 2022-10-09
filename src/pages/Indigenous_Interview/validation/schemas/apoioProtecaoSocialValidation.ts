import * as Yup from 'yup';

export const ApoioProtecaoSocialValidation = Yup.object().shape({
    morador_matriculado_na_educacao_basica_publica: Yup.string().required('Você precisa preencher sobre a educação básica'),
    quantidade_morador_matriculado_na_educacao_basica_publica: Yup.string().nullable().when("morador_matriculado_na_educacao_basica_publica", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("O número deve ser maior que zero").test('validate-moradores', 'Você precisa preencher um número maior que zero', function(value){
            return Number(value) > 0
          }),
        otherwise: Yup.string().nullable().notRequired(),
      }),
    criancas_comem_na_escola: Yup.string().nullable().when("morador_matriculado_na_educacao_basica_publica", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre as crianças comerem na escola"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    escola_inclui_alimentos_da_cultura: Yup.string().nullable().when("morador_matriculado_na_educacao_basica_publica", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre os alimentos culturais na merenda"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    morador_recebe_ajuda_financeira: Yup.string().required('Você precisa preencher sobre ajuda financeira'),
    quantidade_cesta_de_alimentos_3m: Yup.string().nullable().when("cesta_de_alimentos", {
        is: (val: any) => String(val) === "sim",
        then: Yup.string().nullable().required("O número deve ser maior que zero").test('validate-cestas', 'Você precisa preencher um número maior que zero', function(value){
            return Number(value) > 0
          }),
        otherwise: Yup.string().nullable().notRequired(),
    }),
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
    alimentos_que_nao_deveriam_estar_na_cesta: Yup.string().nullable().when("cesta_de_alimentos", {
        is: (val: any) => String(val) === "sim",
        then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    descricao_adicionar_outro: Yup.string().nullable(),
    descricao_remover_outro: Yup.string().nullable(),
    motivo_nao_recebe_cesta_de_alimentos: Yup.string().nullable().when("cesta_de_alimentos", {
        is: (val: any) => String(val) !== "sim",
        then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    quem_pega_dinheiro_bolsa_familia: Yup.string().nullable().when("bolsa_familia_auxilio_brasil", {
        is: (val: any) => String(val) === "sim",
        then: Yup.string().nullable().required("Você precisa preencher sobre o auxílio"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    auxilio_emergencial_na_pandemia: Yup.string().required('Você precisa preencher sobre auxílio emergencial na pandemia'),
    quantidade_vezes_auxilio_emergencial_na_pandemia: Yup.string().nullable().when("auxilio_emergencial_na_pandemia", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre o auxílio"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    ajuda_estado_prefeitura_outros_3m: Yup.string().required('Você precisa preencher sobre ajuda do estado'),
    itens_recebidos_ajuda_estado_prefeitura_outros_3m: Yup.string().nullable().when("ajuda_estado_prefeitura_outros_3m", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre os itens recebidos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    vergonha_constrangimento_para_conseguir_alimentos_3m: Yup.string().required('Você precisa preencher sobre constrangimento para conseguir alimento'),

    bolsa_familia_auxilio_brasil: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    bpc: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    beneficio_deficientes_ou_idosos: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_maternidade: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_doenca: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_reclusao: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    aposentadoria: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    pensao_morte_conjuge: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    pronaf: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    auxilio_estadual_ou_municipal: Yup.string().nullable().required('Você deve preencher sobre o auxílio financeiro'),
    cesta_de_alimentos: Yup.string().nullable().required('Você deve preencher sobre cestas de alimentos'),
});