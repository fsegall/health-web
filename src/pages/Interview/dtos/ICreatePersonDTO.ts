export default interface ICreatePersonDTO {
  id?: string; //backend - generated UUID
  interviewer_id?: string;//backend - generated UUID - Supplied by local storage auth
  name: string;
  date_of_birth: Date;
  gender: string;
  race_color: string;
  literacy: string;
  education: string;
  work_status: string;
  covid_diagnose: string;

}
