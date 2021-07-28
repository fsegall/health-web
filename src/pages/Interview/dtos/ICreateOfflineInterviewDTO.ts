import ICreatePersonDTO from './ICreatePersonDTO';
import ICreateHouseholdDTO from './ICreateHouseholdDTO';
import ICreateAddressDTO from './ICreateAddressDTO';
import ICreateInterviewDTO from './ICreateInterviewDTO';

export default interface ICreateOfflineInterviewDTO {
  person: ICreatePersonDTO;
  household?: ICreateHouseholdDTO;
  address?: ICreateAddressDTO;
  interview?: ICreateInterviewDTO;
}
