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
});
