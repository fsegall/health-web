import * as Yup from 'yup';

export const InterviewValidation = Yup.object().shape({

  project_name: Yup.string().required('Você precisa informar um nome de projeto'),
  is_complete: Yup.boolean().required(
    'Você precisa informar se a entrevista está completa',
  ),
  interview_type: Yup.string().required(
    'Você precisa informar a modalidade de entrevista',
  ),
  comments: Yup.string(),
});
