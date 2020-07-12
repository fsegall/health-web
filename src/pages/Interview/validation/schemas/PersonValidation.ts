import * as Yup from 'yup';

export const PersonValidation = Yup.object().shape({
  name: Yup.string().required('Você precisa digitar um nome'),
  date_of_birth: Yup.date().required(
    'Você precisa digitar uma data de nascimento',
  ),
  gender: Yup.string().required(
    'Você precisa escolher um dos campos de gênero',
  ),
  race_color: Yup.string().required(
    'Você precisa escolher um dos campos de raça',
  ),
  religion: Yup.string().required(
    'Você precisa escolher um dos campos de religião',
  ),
  marital_status: Yup.string().required(
    'Você precisa escolher um dos campos de estado civil',
  ),
  literacy: Yup.boolean().required(
    'Você precisa escolher um dos campos de alfabetização',
  ),
  education: Yup.string().required(
    'Você precisa escolher um dos campos de educação',
  ),
  work_status: Yup.string().required(
    'Você precisa escolher um dos campos de situação de trabalho',
  ),
  health_conditions: Yup.string().required(
    'Você precisa escolher um dos campos de estado de saúde',
  ),
});
