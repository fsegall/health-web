import * as Yup from 'yup';

export const AddressValidation = Yup.object().shape({
  state: Yup.string().required('Você precisa informar o estado'),
  city: Yup.string().required('Você precisa informar a cidade'),
  post_code: Yup.string().required('Você precisa digitar o código postal'),
  street_or_location: Yup.string().required(
    'Você precisa informar a rua ou localização',
  ),
  neighborhood: Yup.string().required('Você precisa informar o bairro'),
  house_number: Yup.number().required(
    'Você precisa informar o número da residência',
  ),
  telephone_number: Yup.string().required(
    'Você precisa informar o número de telefone',
  ),
});
