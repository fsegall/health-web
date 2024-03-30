import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles, Scope } from '@unform/core';
import {
  StyledForm,
  Label
} from '../form-styles';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';


import { FormHelperType, extraDemograficoHelper, quadroDemograficoHelper } from './helper';
import { DemograficoValidation } from '../../validation/schemas/demograficoValidation';
import Input from '../../../../components/Input';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import ICreateDemograficoDTO from '../../dtos/ICreateDemograficoDTO';
import ICreateIndigenousOfflineInterviewDTO from '../../dtos/ICreateIndigenousOfflineInterviewDTO';



interface DemograficoFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
  hasPreviousStepCompleted?: boolean
}

const DemograficoForm: React.FC<DemograficoFormProps> = ({ dispatch, offline, initialValues, isEditForm = false, hasPreviousStepCompleted = false }) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const DemograficoFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounterUpToLength (length: number):void {
    if(counter === length) {
      counter = 1
      return
    }
    counter += 1;
  }

  let regularCounter = 0;

  function incrementCounter () {
    regularCounter += 1;
  }

  const handleSubmit = useCallback(async (data: ICreateDemograficoDTO) => {

    if (!hasPreviousStepCompleted) {
      addToast({
        type: 'error',
        title: 'Atenção!',
        description: 'É necessário preencher o(s) módulo(s) anteriores',
      });
      return
    }
    try {
      DemograficoFormRef.current?.setErrors({});

      const values = {
        ...data,
        moradores: data?.moradores,
        entrevista_indigena_id: initialValues?.entrevista_indigena_id,
      }

      const validatedData = await DemograficoValidation.validate(values, {
        abortEarly: false,
      });

      const indigenous_demografico = {
        ...values,
        ...validatedData,
      };

      if (!offline) {
        const response = await api.post('/indigenous-interviews/v2/demography', indigenous_demografico, {
          headers: { Authorization: `Bearer ${token}` },
        })
        localStorage.setItem('@Safety:indigenous_demografico', response.data.id);

        dispatch({ type: 'DEMOGRAFICO', payload: { id: response.data.id, isOffline: false } })

        addToast({
          type: 'success',
          title: 'Módulo Demográfico adicionado com sucesso',
          description: 'Você já pode prosseguir para o módulo domicílio',
        });
      } else {
        const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-indigenous-offline-interview-id') || "");

        const offlineInterviews: { [key: string]: ICreateIndigenousOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:indigenous-offline-interviews') || '{}');

        const addData = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], indigenous_demografico } } : false;

        if (addData) {
          localStorage.setItem(`@Safety:indigenous-offline-interviews`, JSON.stringify(addData));

          dispatch({ type: 'DEMOGRAFICO', payload: { id: uniqueId, isOffline: true } })

          addToast({
            type: 'success',
            title: 'Módulo Demográfico adicionado com sucesso',
            description: 'Você já pode prosseguir para o módulo domicílio',
          });
        } else {
          throw new Error('Você precisa adicionar adicionar o módulo anterior antes no modo offline');
        }
      }
    } catch (error) {
      //@ts-ignore
      const message = error?.data?.message
      if (message) {

        addToast({
          type: 'error',
          title: message,
          description: '',
        });
      }
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        const errors = getValidationErrors(error);

        DemograficoFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    }
  }, [addToast, offline, initialValues, token, dispatch, hasPreviousStepCompleted]);

    if (isEditForm) {
        DemograficoFormRef.current?.setData({
            //TODO: FAZER EDIT FORM
        })
    }
    const baseForm = (id: number) => {
        return {
            id: id,
        }
    }
    const [residentsGrid, setResidentsGrid] = useState<any[]>([]);
    const addForm = () => {
        const id = Math.floor(Math.random() * 1000)
        setResidentsGrid((prev: any) => [...prev, baseForm(id)])
    };
    // const removeForm = (id: number) => {
    //     setResidentsGrid((prev: any) => prev.filter((p: any) => p.id !== id));
    // };
    const [baseArraySize, setBaseArraySize] = useState<number>(0)
    function handleArrayForm(e: any) {
        e.preventDefault()
        const arraySize = baseArraySize
        setResidentsGrid([])
        for (let i = 0; i < arraySize; i++) {
            addForm()
        }
    }


  const [formDependencies, setFormDependencies] = useState<any>({})

  function handleDependencies(element: FormHelperType, index: number, value: any) {
    let currentForm: any = {
      ...formDependencies,
      [index]: {
        ...formDependencies[index],
        [element.props.name]: value
      }
    }
    setFormDependencies(currentForm)
  }

  function handleDisabled(element: FormHelperType, index: number): boolean {
    const dependencies: { [key: string]: string[] } | any = element?.dependencies
    const allDisabledValidations = Object.entries(dependencies)?.map((obj: any) => {
      let isDisabled = true
      const found = formDependencies?.[index]?.[obj?.[0]]
      if (found) {
        if (obj?.[1]?.find((v: any) => (v === found || found?.includes(v)))) {
          isDisabled = false
        }
      }
      return isDisabled
    })
    if (allDisabledValidations?.every(v => v === false)) {
      return false
    } else {
      return true
    }
  }

  function handleRegularDisabled(element: FormHelperType): boolean {
      const dependencies: { [key: string]: string[] } | any = element?.dependencies
      const allDisabledValidations = Object.entries(dependencies)?.map((obj: any) => {
        let isDisabled = true
        const found = formDependencies[obj?.[0]]
        if (found) {
          if (obj?.[1]?.find((v: any) => (v === found || found?.includes(v)))) {
            isDisabled = false
          }
        }
        return isDisabled
      })
      if (allDisabledValidations?.every(v => v === false)) {
        return false
      } else {
        return true
      }
    }

  function handleRegularDependencies(element: FormHelperType, value: any) {
    let currentForm: any = {
      ...formDependencies,
      [element.props.name]: value
    }
    setFormDependencies(currentForm)
  }

  function handleArrayDependencies(element: FormHelperType, value: any) {
    const arrayOfOptions = value?.map((v: any) => v?.value)
    let currentForm: any = {
      ...formDependencies,
      [element.props.name]: arrayOfOptions
    }
    setFormDependencies(currentForm)
  }

  return (
    <StyledForm
      ref={DemograficoFormRef}
      onSubmit={handleSubmit}
    >
      <section>
        <Label>Quantas pessoas são moradores permanentes desta casa? (excluir pessoas de passagem, visitantes parentes ou não)</Label>
        <Input name="total_moradores" type="number" onChange={(e) => setBaseArraySize(Number(e.target.value))} />
        <Button type="button" onClick={handleArrayForm}>Gerar tabela</Button>
        {residentsGrid?.length > 0 && (
          <Label>
              ATENÇÃO: Primeiro preencha o nome de cada morador. O primeiro sempre será o entrevistado e os seguintes estarão na ordem do mais velho ao mais novo. Conferir com o número de moradores referidos antes e perguntar se falta alguém. Todas as perguntas do quadro devem ser preenchidas para cada morador, ao terminar o primeiro morador, passe para o próximo.
          </Label>
        )}
        </section>
        {residentsGrid?.map((item: any, index: number) => (
          <Scope path={`moradores[${index}]`} key={item.id}>
            <section>
              <span style={{ visibility: 'hidden' }}>
                <Input name="id" value={index+1} type="number" />
              </span>
              {quadroDemograficoHelper?.map((element: FormHelperType, elementIndex: number) => (
                <span key={`${elementIndex}:${element.label}`}>
                  {incrementCounterUpToLength(quadroDemograficoHelper.length)}
                  <Label>{`${counter}. ${element.label} ${index === 0 ? '(pessoa entrevistada)' : ''}`}</Label>
                  <element.type
                    {...element.props}
                    isDisabled={element?.dependencies && handleDisabled(element, index+1)}
                    onChange={(e: any) => element?.hasDependencies && handleDependencies(element, index+1, e?.value)}
                    />
                </span>
                )
              )}
            </section>
          </Scope>
        ))}

        {extraDemograficoHelper?.map((s: FormHelperType[], sectionIndex: number) => (
          <section key={sectionIndex}>
            {s?.map((element: FormHelperType, elementIndex: number) => (
              <span key={elementIndex}>
                {elementIndex === 0 && <Label>Seção apenas para o respondente/chefe</Label>}
                {incrementCounter()}
                <Label>{`${regularCounter}. ${element.label}`}</Label>
                <element.type
                  {...element.props}
                  isDisabled={element?.dependencies && handleRegularDisabled(element)}
                  onChange={(e: any) => {
                    if (element?.props?.isMulti !== true) {
                      element?.hasDependencies && handleRegularDependencies(element, e?.value)
                    } else {
                      element?.hasDependencies && handleArrayDependencies(element, e)
                    }
                  }}
                />
              </span>
            ))}
            {extraDemograficoHelper.length === sectionIndex + 1 && (
              <Button type="submit">Enviar</Button>
            )}
          </section>
        ))}
    </StyledForm>
  );
}

export default DemograficoForm;
