import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  Container,
  Header,
  SectionTitle,
  SubmittedContainer,
  ButtonsContainer,
  OfflineLabel,
  ResetButton,
  EditInterviewCard
} from './styles';
import { Link, useParams } from 'react-router-dom';
import Switch from "react-switch";
import logo from '../../assets/logo_transparent.png';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import ArrayForm from './Forms/ArrayForm';

const IndigenousInterview: React.FC = () => {
    //@ts-ignore
    const { id } = useParams();
    const { token } = useAuth();
    const [initialValues, setInitialValues] = useState<any>({})
    // const [formState, dispatch] = useReducer(reducer, initialState);

    const resetForms = useCallback(
        () => {
          localStorage.removeItem('@Safety:person_id');
          localStorage.removeItem('@Safety:household_id');
          localStorage.removeItem('@Safety:address_id');
          localStorage.removeItem('@Safety:current-offline-interview-id');
          window.location.reload();
        },
        [],
      )

    const [isOffline, setIsOffline] = useState(false);
    return (
        <Container offline={isOffline}>
        <Header>
            <Link to="/dashboard">
            <img src={logo} alt="Rede PenSSAN" />
            </Link>
            <div>
            PenSSAN <span>|</span> Entrevista Indígena
            </div>
            <ButtonsContainer>
            {!initialValues?.project_name && (
                <>
                <OfflineLabel offline={isOffline}>{isOffline ? 'Offline' : 'Online'}</OfflineLabel>
                <Switch onColor="#c2024b" offColor="#dedede" onChange={() => setIsOffline(!isOffline)!} checked={isOffline} />
                <ResetButton onClick={resetForms}>Reiniciar</ResetButton>
                </>
                )}
            </ButtonsContainer>
        </Header>
        <ArrayForm />

        </Container>
    )
}

export default IndigenousInterview;