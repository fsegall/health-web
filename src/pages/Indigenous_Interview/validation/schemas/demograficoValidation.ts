import * as Yup from 'yup';

export const DemograficoValidation = Yup.object().shape({
    total_moradores: Yup.number()
    .test('validate-moradores', 'Você deve gerar a grade com o número correto de moradores', function(value){
      return this.parent.moradores.length === value
    }),
    entrevista_indigena_id: Yup.string().nullable().notRequired(),

    morador_nao_indigena: Yup.string().required('Você precisa preencher sobre a existência de morador não indígena'),
    quantidade_morador_nao_indigena: Yup.mixed().nullable().when("morador_nao_indigena", {
      is: (val: any) => val === "true",
      then: Yup.number().required('Você precisa digitar a quantidade de morador não indígena').min(1, 'A quantidade não pode ser menor que um'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    povo_etnia: Yup.array().required('Você precisa preencher sobre a etnia'),
    serie_frequentada_escola: Yup.string().required('Você precisa preencher sobre a escolaridade'),
    crenca_religiao: Yup.string().required('Você precisa preencher sobre a crença religiosa'),
    crenca_religiao_igreja: Yup.string().nullable().when("crenca_religiao", {
      is: (val: any) => [
        "igreja_e_paje", "igreja"
      ].find(v => v === String(val)),
      then: Yup.string().nullable().required("Você precisa preencher sobre a crença na igreja"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    situacao_no_trabalho: Yup.array().min(1, 'Você precisa preencher sobre a situação atual de trabalho').required('Você precisa preencher sobre a situação atual de trabalho'),
    remuneracao_trabalho_na_aldeia: Yup.string().nullable().when("situacao_no_trabalho", {
      is: (val: any) => Array.isArray(val) && val.includes("sim_aldeia"),
      then: Yup.string().nullable().required("Você precisa preencher sobre a remuneração do trabalho na aldeia"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    funcao_trabalho_remunerado_na_aldeia: Yup.string().nullable().when("remuneracao_trabalho_na_aldeia", {
      is: (val: any) => String(val) === "sim",
      then: Yup.string().nullable().required("Você precisa preencher sobre a função do trabalho na aldeia"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    remuneracao_trabalho_fora_aldeia: Yup.string().nullable().when("situacao_no_trabalho", {
      is: (val: any) => Array.isArray(val) && val.includes("sim_fora_da_aldeia"),
      then: Yup.string().nullable().required("Você precisa preencher sobre a remuneração do trabalho fora da aldeia"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    funcao_trabalho_remunerado_fora_da_aldeia: Yup.string().nullable().when("remuneracao_trabalho_fora_aldeia", {
      is: (val: any) => String(val) === "sim",
      then: Yup.string().nullable().required("Você precisa preencher sobre a função do trabalho fora da aldeia"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    funcao_nao_remunerada_aldeia: Yup.string().nullable().required("Você precisa preencher sobre função não remunerada na aldeia"),
    motivo_nao_trabalha: Yup.string().nullable().when("situacao_no_trabalho", {
      is: (val: any) => Array.isArray(val) && val.includes("nao"),
      then: Yup.string().nullable().required("Você precisa preencher sobre a o motivo de não trabalhar"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    moradores: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required('ID obrigatório'),
        nome: Yup.string().required('Você precisa digitar o nome'),
        data_nascimento: Yup.string().notRequired(),
        idade: Yup.mixed().nullable().when("data_nascimento", {
          is: (val: any) => val === "",
          then: Yup.number().required('Você precisa digitar uma idade').min(1, 'A idade não pode ser menor que um').max(100, 'A idade não pode ser menor que cem anos'),
          otherwise: Yup.string().nullable().notRequired(),
        }),
        sexo: Yup.string().required('Você precisa digitar o sexo'),
      })
    ).required('Você precisa preencher as informações dos moradores'),
});
