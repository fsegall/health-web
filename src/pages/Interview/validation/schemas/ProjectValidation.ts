import * as Yup from 'yup';

export const ProjectValidation = Yup.object().shape({
  name: Yup.string().required('Você precisa informar o nome do projeto'),
  organizations: Yup.string().required('Você precisa informar as organizações'),
});


