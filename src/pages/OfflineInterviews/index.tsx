import React from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

/* import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO'; */

import {
    OfflineButton,
    Container
} from './styles';


const OfflineInterviews: React.FC = () => {

    const { token } = useAuth();

    /* const interviewsObject: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}'); */
    const interviews: string = localStorage.getItem('@Safety:offline-interviews') || '';

    async function OnClick() {
        await api.post('/offline', {interviews}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    }

    return (<Container>
                <h1>Interviews</h1>
                <OfflineButton onClick={OnClick}>Send</OfflineButton>
                <div>{interviews}</div>
            </Container>
            );

};

export default OfflineInterviews;
