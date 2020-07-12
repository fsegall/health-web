import * as Yup from 'yup';

export const FamilyMemberValidation = Yup.object().shape({
  age: Yup.number().required(
    'Você precisa preencher a idade do membro da família',
  ),
  gender: Yup.string().required(
    'Você precisa escolher um dos campos de gênero',
  ),
});
