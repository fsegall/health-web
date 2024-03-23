import * as Yup from 'yup';

export const PersonValidation = Yup.object().shape({
  nome: Yup.string().required('Você precisa digitar um nome'),
  idade: Yup.number().required(
    'Você precisa digitar uma idade',
  ),
  sexo: Yup.string().required(
    'Você precisa escolher um dos campos de gênero',
  ),
  raca_cor: Yup.string().required(
    'Você precisa escolher um dos campos de raça',
  ),
  ler_escrever: Yup.string().required(
    'Você precisa escolher um dos campos de alfabetização',
  ),
  escolaridade: Yup.string().required(
    'Você precisa escolher um dos campos de educação',
  ),
  situacao_de_trabalho: Yup.string().required(
    'Você precisa escolher um dos campos de situação de trabalho',
  ),
  ocupacao: Yup.string(),
  local_de_trabalho: Yup.string(),
  diagnostico_covid: Yup.string().required(
    'Você precisa escolher um dos campos de diagnóstico de Covid',
  ),
  vacina: Yup.string(),
  nao_tomou_vacina: Yup.string(),

  estado_de_saude: Yup.string().required(
    'Você precisa preencher sobre o estado de saúde',
  ),
  local_de_procura_do_servico_de_saude: Yup.array().nullable().required("Você precisa preencher sobre os locais de atendimento"),
  motivo_procura_servico_saude: Yup.array().nullable().required("Você precis preencher sobre quando busca atendimento"),

  motivo_nao_atendimento_servico_saude: Yup.array().nullable().when("motivo_procura_servico_saude", {
    is: (val: any[]) => val.includes('nao_foi_atendido'),
    then: Yup.array().nullable().required("Você precisa preencher sobre quando não foi atendido"),
    otherwise: Yup.array().nullable().notRequired(),
  }),
  doenca_ultimos_12_meses: Yup.array().nullable().required("Você precisa preencher sobre doenças nos últimos 12 meses"),
  diagnostico_doenca_ultimos_12_meses: Yup.array().nullable().required("Você precisa preencher sobre doenças diagnósticadas nos últimos 12 meses"),
});

