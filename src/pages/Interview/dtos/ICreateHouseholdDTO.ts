export default interface ICreateHouseholdDTO {
  person_id?: string;
  household_main_person?: boolean;
  relationship_to_main_person?: string;
  location_of_residence: string;
  type_of_residence: string;
  number_of_rooms: number;
  number_of_people_household: number;
  family_income: number;
  drinking_water: string;
  bathroom_inside_house: boolean;
  garbage_service: boolean;
}
