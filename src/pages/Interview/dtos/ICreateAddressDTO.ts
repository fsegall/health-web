export default interface ICreateAddressDTO {
  household_id?: string;
  state: string;
  city: string;
  post_code?: string;
  neighborhood: string;
  street_or_location: string;
  house_number: string;
  telephone_number: string;
}
