export default interface ICreatePersonDTO {
  interviewer_id?: string;
  name: string;
  date_of_birth: Date;
  gender: string;
  race_color: string;
  religion: string;
  marital_status: string;
  literacy: boolean;
  education: string;
  work_status: string;
  health_conditions: string;
}
