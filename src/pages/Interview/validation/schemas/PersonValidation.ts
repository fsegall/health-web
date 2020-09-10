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
  literacy: Yup.string().required(
    'Você precisa escolher um dos campos de alfabetização',
  ),
  education: Yup.string().required(
    'Você precisa escolher um dos campos de educação',
  ),
  unemployed: Yup.boolean(),
  employed_normal_salary: Yup.boolean(),
  employed_salary_reduced: Yup.boolean(),
  employed_vacations: Yup.boolean(),
  employed_on_leave_salary_reduced: Yup.boolean(),
  employed_on_leave_normal_salary: Yup.boolean(),
  employed_on_leave_no_salary: Yup.boolean(),
  retired: Yup.boolean(),
  self_employed_legally: Yup.boolean(),
  odd_jobs: Yup.boolean(),
  revenue: Yup.boolean(),
  employer: Yup.boolean(),
  work_status: Yup.string().required(
    'Você precisa escolher um dos campos de situação de trabalho',
  ),
  covid_diagnose: Yup.string().required(
    'Você precisa escolher um dos campos de estado de saúde',
  ),
});
