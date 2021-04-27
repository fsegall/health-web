import * as Yup from 'yup';

export const PersonValidation = Yup.object().shape({
  name: Yup.string().required('Você precisa digitar um nome'),
  age: Yup.number().required(
    'Você precisa digitar uma idade',
  ),
  gender: Yup.string().required(
    'Você precisa escolher um dos campos de gênero',
  ),
  race_color: Yup.string().required(
    'Você precisa escolher um dos campos de raça',
  ),
  literacy: Yup.string().required(
    'Você precisa escolher um dos campos de alfabetização',
  ),
  education: Yup.string().required(
    'Você precisa escolher um dos campos de educação',
  ),
  work_status: Yup.string().required(
    'Você precisa escolher um dos campos de situação de trabalho',
  ),
  work_shift_reduction: Yup.string(),
  covid_diagnose: Yup.string().required(
    'Você precisa escolher um dos campos de estado de saúde',
  ),
});
