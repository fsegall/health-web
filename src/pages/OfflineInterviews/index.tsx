import React from 'react';



import {

} from './styles';




const OfflineInterviews: React.FC = () => {

/*     const interviews: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}'); */
const interviews: string = localStorage.getItem('@Safety:offline-interviews') || '';

    return (<div>
                <h1>Interviews</h1>
                <div>{interviews}</div>
            </div>
            );

};

export default OfflineInterviews;
