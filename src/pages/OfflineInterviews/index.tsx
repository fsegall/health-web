import React, { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import ICreateOfflineInterviewDTO from '../Interview/dtos/ICreateOfflineInterviewDTO';

import {
    OfflineButton,
    Container,
    CardSection,
    SectionTitle
} from './styles';
import ICreateIndigenousOfflineInterviewDTO from '../Indigenous_Interview/dtos/ICreateIndigenousOfflineInterviewDTO';
import IndigenousCard from './IndigenousCard';
import { useToast } from '../../hooks/toast';


const OfflineInterviews: React.FC = () => {

    const { token } = useAuth();
    const { addToast } = useToast()
    const [loading, setLoading] = useState(false)

    const [interviewsObject, setInterviewObject] = useState<{ [key: string]: ICreateOfflineInterviewDTO }>(JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}'))
    const [indigenousInterviewsObject, setIndigenousInterviewObject] = useState<{ [key: string]: ICreateIndigenousOfflineInterviewDTO }>(JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}'))

    async function handleOfflineInterviews() {
      const interviewsObject: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

      try {
        setLoading(true)
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
        addToast({
          type: 'error',
          title: 'Sem Conexão',
          description: 'Sem Internet ou o banco de dados está temporariamente inacessível.',
        });
      } finally {
        setLoading(false)
      }
    }

    async function handleIndigenousOfflineInterviews() {
      const offlineData: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');

      try {
        setLoading(true)
        const response = await api.post('/indigenous-interviews/handle-offline-data', [offlineData],
          {
            headers: {
              Authorization: `Bearer ${token}`
          }
        })
        if (response) {
          localStorage.setItem(`@Safety:indigenous-offline-interviews`, JSON.stringify(response?.data));
          setIndigenousInterviewObject(response?.data)
        }
        console.log(response?.data)
        addToast({
          type: response?.data !== '{}' ? 'error' : 'success',
          title: 'Envio realizado com sucesso',
          description: response?.data !== '{}' ? 'Não foi possível salvar as entrevistas listadas' : '',
        });
      } catch (err) {
        console.log('erro ', err)
        addToast({
          type: 'error',
          title: 'Sem Conexão',
          description: 'Sem Internet ou o banco de dados está temporariamente inacessível.',
        });
      } finally {
        setLoading(false)
      }
    }

    function handleData(data: any) {
      return Object.entries(data)
    }

    return (<Container>
                <h1>Logs de Entrevistas Offline</h1>
                <OfflineButton onClick={handleOfflineInterviews} disabled={loading}>Enviar</OfflineButton>
                <OfflineButton onClick={handleIndigenousOfflineInterviews} disabled={loading}>Enviar Entrevistas Indígenas</OfflineButton>
                <SectionTitle>Entrevistas Indígenas:</SectionTitle>
                <CardSection>
                  {handleData(indigenousInterviewsObject)?.map(([id, ind]: [string, any], index) => (
                    <IndigenousCard key={index} data={ind} index={index+1} id={id} />
                  ))}
                </CardSection>
                <SectionTitle>Entrevistas Padrões:</SectionTitle>
                <div>{JSON.stringify(interviewsObject)}</div>
            </Container>
            );

};

export default OfflineInterviews;
