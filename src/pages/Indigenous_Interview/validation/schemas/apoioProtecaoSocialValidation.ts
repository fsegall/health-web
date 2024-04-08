import * as Yup from 'yup';

export const ApoioProtecaoSocialValidation = Yup.object().shape({
  entrevista_indigena_id: Yup.string().nullable().notRequired(),
  possui_crianca_ou_jovem_que_frequenta_escola: Yup.string().required('Você precisa preencher se há crianças ou jovens que frequentam a escola'),
  criancas_comem_escola: Yup.string().nullable().when("possui_crianca_ou_jovem_que_frequenta_escola", {
    is: (val: any) => (String(val) === "true"),
    then: Yup.string().nullable().required("Você precisa preencher sobre a merenda escolar"),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  alimentacao_escolar_inclui_cultura: Yup.string().nullable().when("criancas_comem_escola", {
      is: (val: any) => (String(val) === "sim" || String(val) === "nem_sempre"),
      then: Yup.string().nullable().required("Você precisa preencher sobre os alimentos culturais na merenda"),
      otherwise: Yup.string().nullable().notRequired(),
  }),
  renda_total_30_dias: Yup.string(),
  opcoes_renda_total_30_dias: Yup.string().nullable().when("renda_total_30_dias", {
    is: (val: any) => (String(val) === ""),
    then: Yup.string().nullable().required("Você precisa informar a renda"),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  recebeu_cesta_alimentos: Yup.string().nullable().when("cesta_alimentos", {
      is: (val: any) => String(val) === "sim",
      then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
      otherwise: Yup.string().nullable().notRequired(),
  }),
  motivo_nao_recebe_cesta_alimentos: Yup.string().nullable().when("cesta_alimentos", {
      is: (val: any) => String(val) !== "sim",
      then: Yup.string().nullable().required("Você precisa preencher sobre a cesta de alimentos"),
      otherwise: Yup.string().nullable().notRequired(),
  }),

  bolsa_familia_auxilio_brasil: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
  valor_bolsa_familia_auxilio_brasil: Yup.mixed().nullable().when("bolsa_familia_auxilio_brasil", {
    is: (val: any) => String(val) === "sim",
    then: Yup.number().nullable().required("Você precisa preencher sobre o valor do auxílio recebido."),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  bpc: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
  valor_bpc: Yup.mixed().nullable().when("bpc", {
    is: (val: any) => String(val) === "sim",
    then: Yup.number().nullable().required("Você precisa preencher sobre o valor do auxílio recebido."),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  auxilio_maternidade: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
  valor_auxilio_maternidade: Yup.mixed().nullable().when("auxilio_maternidade", {
    is: (val: any) => String(val) === "sim",
    then: Yup.number().nullable().required("Você precisa preencher sobre o valor do auxílio recebido."),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  auxilio_doenca: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
  valor_auxilio_doenca: Yup.mixed().nullable().when("auxilio_doenca", {
    is: (val: any) => String(val) === "sim",
    then: Yup.number().nullable().required("Você precisa preencher sobre o valor do auxílio recebido."),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  aposentadoria: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
  valor_aposentadoria: Yup.mixed().nullable().when("aposentadoria", {
    is: (val: any) => String(val) === "sim",
    then: Yup.number().nullable().required("Você precisa preencher sobre o valor do auxílio recebido."),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  pensao_morte: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
  valor_pensao_morte: Yup.mixed().nullable().when("pensao_morte", {
    is: (val: any) => String(val) === "sim",
    then: Yup.number().nullable().required("Você precisa preencher sobre o valor do auxílio recebido."),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  programa_auxilio_estadual_municipal: Yup.string().required('Você deve preencher sobre o auxílio financeiro'),
  valor_programa_auxilio_estadual_municipal: Yup.mixed().nullable().when("programa_auxilio_estadual_municipal", {
    is: (val: any) => String(val) === "sim",
    then: Yup.number().nullable().required("Você precisa preencher sobre o valor do auxílio recebido."),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  cesta_alimentos: Yup.string().required('Você deve preencher sobre cestas de alimentos'),
});
