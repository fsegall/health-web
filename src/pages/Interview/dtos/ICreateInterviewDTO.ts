export default interface ICreateInterviewDTO {
  interviewer_id: string;
  project_name: string; // incluir no backend
  project_number: number;
  person_id: string;
  household_id: string;
  address_id: string;
  is_complete?: boolean;
  interview_type: string;
  comments?: string;
}
