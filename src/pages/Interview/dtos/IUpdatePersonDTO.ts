export default interface IUpdatePersonDTO {
  interviewer_id?: string;
  person_id?: string;
  name: string;
  date_of_birth: Date;
  gender: string;
  race_color: string;
  literacy: string;
  education: string;
  work_status: string;
  covid_diagnose: string;
}
