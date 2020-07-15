import * as Yup from 'yup';

export const HouseholdValidation = Yup.object().shape({
  household_main_person: Yup.boolean(),
  relationship_to_main_person: Yup.string(),
  location_of_residence: Yup.string().required(
    'Você precisa escolher um dos campos de localização de residência',
  ),
  type_of_residence: Yup.string().required(
    'Você precisa escolher um dos campos de tipo de residência',
  ),
  number_of_rooms: Yup.number().required(
    'Você precisa informar o número de cômodos da residência',
  ),
  number_of_people_household: Yup.number().required(
    'Você precisa informar o número de pessoas que moram na residência',
  ),
  family_income: Yup.number().required(
    'Você precisa informar a renda familiar',
  ),
  drinking_water: Yup.string().required(
    'Você precisa escolher um dos campos de abastecimento de água potável',
  ),
  bathroom_inside_house: Yup.boolean().required(
    'Você precisa escolher um dos campos de abastecimento de água potável',
  ),
  garbage_service: Yup.boolean().required(
    'Você precisa escolher um dos campos de abastecimento de água potável',
  ),
});
