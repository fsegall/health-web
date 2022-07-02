import React, { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';

import {
    OfflineButton,
    Container
} from './styles';


const OfflineInterviews: React.FC = () => {

    const { token } = useAuth();

    const [interviewsObject, setInterviewObject] = useState<{ [key: string]: ICreateOfflineInterviewDTO }>(JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}'))

    // async function OnClick() {
    //     await api.post('/offline', {interviews: interviewsObject}, {
    //         headers: {
    //           Authorization: `Bearer ${token}`
    //         },
    //       });
    // }

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

    return (<Container>
                <h1>Interviews 2</h1>
                <OfflineButton onClick={handleOfflineInterviews}>Enviar</OfflineButton>
                <div>{JSON.stringify(interviewsObject)}</div>
            </Container>
            );

};

export default OfflineInterviews;
