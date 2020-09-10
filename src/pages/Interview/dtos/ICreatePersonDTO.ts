export default interface ICreatePersonDTO {
  id?: string; //backend - generated UUID
  interviewer_id?: string;//backend - generated UUID - Supplied by local storage auth
  name: string;
  date_of_birth: Date;
  gender: string;
  race_color: string;
  literacy: string;
  education: string;

  unemployed?: boolean;
  employed_normal_salary?: boolean;
  employed_salary_reduced?: boolean;
  employed_vacations?: boolean;
  employed_on_leave_salary_reduced?: boolean;
  employed_on_leave_normal_salary?: boolean;
  employed_on_leave_no_salary?: boolean;
  retired?: boolean;
  self_employed_legally?: boolean;
  odd_jobs?: boolean;
  revenue?: boolean;
  employer?: boolean;

  work_status: string;
  covid_diagnose: string;

}
