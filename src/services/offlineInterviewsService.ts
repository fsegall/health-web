import api from './api';
import { uuid } from 'uuidv4';
import { parseJSON, format } from 'date-fns';
import ICreateOfflineInterviewDTO from '../pages/Interview/dtos/ICreateOfflineInterviewDTO';

async function SubmitOfflineInterviews(): Promise<void> {

  const token = localStorage.getItem('@Safety:token') || "";
  const interviewer_id = JSON.parse(localStorage.getItem('@Safety:user') || '{}')?.id;
  const interviews: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

  if (interviews) {

    localStorage.setItem(`@Safety:offlineBackup - ${format(parseJSON(Date.now()), 'dd/MM/yyyy HH:mm:ss')}`, JSON.stringify(interviews));

    if (interviewer_id && token) {

      for (let interview in interviews) {
        console.log('entrevista', interview)
        if (Object.keys(interviews[interview]).length === 4) {
          try {

            console.log('aqui');

            const person = {
              interviewer_id,
              ...interviews[interview].person
            }

            const personResponse = await api.post('/persons', person, {
              headers: { Authorization: `Bearer ${token}` },
            })

            const person_id = personResponse.data.id;

            const household = {
              person_id,
              ...interviews[interview].household,
            };

            const householdResponse = await api.post('/households', household, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const household_id = householdResponse.data.id;

            const address = {
              household_id,
              ...interviews[interview].address,
            };

            const addressResponse = await api.post('/addresses', address, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const address_id = addressResponse.data.id;

            const interviewComplete = {
              interviewer_id,
              household_id,
              person_id,
              address_id,
              ...interviews[interview].interview,
            };

            const InterviewResponse = await api.post('/interviews', interviewComplete, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (InterviewResponse.status === 201) {
              console.log(`You have created an interview: ${InterviewResponse.data}`)
            }

          } catch (error) {
            console.log(error.data.message, interview)
            localStorage.setItem(`@Safety:offlineError${error.data.message}:${uuid()}`, JSON.stringify(interviews[interview]));
          }
        } else {
          console.log('Essa entrevista não estava completa');
          localStorage.setItem(`@Safety:InterviewNotComplete:${uuid()}`, JSON.stringify(interviews[interview]));
        }

      }
      localStorage.removeItem('@Safety:offline-interviews');
      window.location.reload();
    }

  }
}

export default SubmitOfflineInterviews;
