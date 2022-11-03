import React, { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';

import {
    OfflineButton,
    Container
} from './styles';
import ICreateIndigenousOfflineInterviewDTO from '../Indigenous_Interview/dtos/ICreateIndigenousOfflineInterviewDTO';


const OfflineInterviews: React.FC = () => {

    const { token } = useAuth();

    const [interviewsObject, setInterviewObject] = useState<{ [key: string]: ICreateOfflineInterviewDTO }>(JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}'))
    const [indigenousInterviewsObject, setIndigenousInterviewObject] = useState<{ [key: string]: ICreateIndigenousOfflineInterviewDTO }>(JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}'))

    async function handleOfflineInterviews() {
      const interviewsObject: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

      try {
        const response = await api.post('/interviews/handle-offline-data', [interviewsObject],
          {
            headers: {
              Authorization: `Bearer ${token}`
          }
        })
        if (response) {
          localStorage.setItem(`@Safety:offline-interviews`, JSON.stringify({...response?.data}));
          setInterviewObject({...response?.data})
        }
      } catch (err) {
        console.log('erro ', err)
      }
    }

    async function handleIndigenousOfflineInterviews() {
      const offlineData: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');

      try {
        const response = await api.post('/indigeanous-interviews/handle-offline-data', [offlineData],
          {
            headers: {
              Authorization: `Bearer ${token}`
          }
        })
        if (response) {
          localStorage.setItem(`@Safety:indigenous-offline-interviews`, JSON.stringify({...response?.data}));
          setIndigenousInterviewObject({...response?.data})
        }
      } catch (err) {
        console.log('erro ', err)
      }
    }

    return (<Container>
                <h1>Logs de Entrevistas Offline</h1>
                <OfflineButton onClick={handleOfflineInterviews}>Enviar</OfflineButton>
                <OfflineButton onClick={handleIndigenousOfflineInterviews}>Enviar Entrevistas Indígenas</OfflineButton>
                <p><strong>Entrevistas:</strong></p>
                <div>{JSON.stringify(interviewsObject)}</div>
                <p><strong>Entrevistas Indígenas:</strong></p>
                <div>{JSON.stringify(indigenousInterviewsObject)}</div>
            </Container>
            );

};

export default OfflineInterviews;
