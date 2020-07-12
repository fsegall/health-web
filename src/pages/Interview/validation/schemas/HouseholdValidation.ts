import * as Yup from 'yup';

export const HouseholdValidation = Yup.object().shape({
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
});
