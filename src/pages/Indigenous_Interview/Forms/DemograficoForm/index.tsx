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
import { maskDate } from '../../../../utils/maskDate';

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

      // Converte situacao_no_trabalho de array para string (backend espera string)
      const situacaoTrabalho = validatedData && Array.isArray(validatedData.situacao_no_trabalho) 
        ? validatedData.situacao_no_trabalho.join(',') 
        : validatedData?.situacao_no_trabalho;

      const indigenous_demografico = {
        ...values,
        ...validatedData,
        situacao_no_trabalho: situacaoTrabalho,
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
      console.error('Erro no submit:', error);
      //@ts-ignore
      const message = error?.data?.message || error?.response?.data?.message
      if (message) {
        addToast({
          type: 'error',
          title: message,
          description: '',
        });
      }
      if (error instanceof Yup.ValidationError) {
        console.log('Erro de validação:', error);
        const errors = getValidationErrors(error);

        DemograficoFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      } else if (!message) {
        addToast({
          type: 'error',
          title: 'Erro ao enviar formulário',
          description: 'Ocorreu um erro inesperado. Verifique o console para mais detalhes.',
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

    const [baseArraySize, setBaseArraySize] = useState<number>()
    function handleArrayForm(e: any) {
        e.preventDefault()
        if (!baseArraySize) {
          return
        }
        const arraySize = baseArraySize
        setResidentsGrid([])
        for (let i = 0; i < arraySize; i++) {
            addForm()
        }
    }


  const [formDependencies, setFormDependencies] = useState<any>({})

  function handleDependencies(element: FormHelperType, index: number, value: any) {
    console.log('[handleDependencies] Morador index:', index, 'Campo:', element.props.name, 'Valor:', value);
    let currentForm: any = {
      ...formDependencies,
      [index]: {
        ...formDependencies[index],
        [element.props.name]: value
      }
    }
    console.log('[handleDependencies] formDependencies atualizado:', currentForm);
    setFormDependencies(currentForm)
  }

  function handleDisabled(element: FormHelperType, index: number): boolean {
    const dependencies: { [key: string]: string[] } | any = element?.dependencies
    const allDisabledValidations = Object.entries(dependencies)?.map((obj: any) => {
      let isDisabled = true
      const found = formDependencies?.[index]?.[obj?.[0]]
      if (found !== undefined && found !== null) {
        obj?.[1]?.forEach((v: any) => {
          if (v === '') {
            if (found === '') {
              isDisabled = false
            }
          } else if (v === found || found?.includes(v)) {
            isDisabled = false
          }
        })
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
      if (!dependencies) {
        return false
      }
      const allDisabledValidations = Object.entries(dependencies)?.map((obj: any) => {
        let isDisabled = true
        const found = formDependencies[obj?.[0]]
        if (found !== undefined && found !== null && found !== '') {
          // Se found é um array (campo multi-select), verifica se algum valor do array está na lista permitida
          if (Array.isArray(found)) {
            if (found.length > 0 && obj?.[1]?.some((v: any) => found.includes(String(v)))) {
              isDisabled = false
            }
          } else {
            // Se found é um valor simples, verifica se está na lista permitida
            if (obj?.[1]?.some((v: any) => String(v) === String(found))) {
              isDisabled = false
            }
          }
        }
        return isDisabled
      })
      const finalResult = allDisabledValidations?.every(v => v === false) ? false : true
      return finalResult
    }

  function handleRegularDependencies(element: FormHelperType, value: any) {
    console.log('[handleRegularDependencies] Campo:', element.props.name, 'Valor:', value);
    let currentForm: any = {
      ...formDependencies,
      [element.props.name]: value
    }
    console.log('[handleRegularDependencies] formDependencies atualizado:', currentForm);
    setFormDependencies(currentForm)
  }

  function handleArrayDependencies(element: FormHelperType, value: any) {
    const arrayOfOptions = value?.map((v: any) => v?.value)
    console.log('[handleArrayDependencies] Campo:', element.props.name, 'Valor original:', value, 'Array extraído:', arrayOfOptions);
    let currentForm: any = {
      ...formDependencies,
      [element.props.name]: arrayOfOptions
    }
    console.log('[handleArrayDependencies] formDependencies atualizado:', currentForm);
    setFormDependencies(currentForm)
  }

  function updateBaseArraySize(value: any) {
    let selectedValue = value?.replace(/[^0-9]/g, "")
    if (selectedValue > 20) {
      selectedValue = 20
    }
    setBaseArraySize(selectedValue)
  }

  function handleDemograficoFormLabel(index: number, element: FormHelperType): string {
    const counterInfo = `Morador ${index+1}: ${counter}`
    let label = element.label
    if (index === 1) {
      label = (element?.alternative_label || element.label)
    } else if (index > 1) {
      label = (element?.second_alternative_label || element?.alternative_label || element.label)
    }
    
    const interviewerOnlyAditionalText = `${index === 0 ? '(pessoa entrevistada)' : ''}`
    return `${counterInfo}. ${label} ${interviewerOnlyAditionalText}`
  }

  return (
    <StyledForm
      ref={DemograficoFormRef}
      onSubmit={handleSubmit}
    >
      <section>
        <Label>Quantas pessoas são moradoras permanentes desta casa? (excluir pessoas que estão apenas de passagem ou visitando, parentes ou não)</Label>
        <Input name="total_moradores" type="number" value={baseArraySize} onChange={(e) => updateBaseArraySize(e?.target?.value)} />
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
              {quadroDemograficoHelper?.map((element: FormHelperType, elementIndex: number) => {
                const isDateField = element.props.name === 'data_nascimento';
                return (
                  <span key={`${elementIndex}:${element.label}`}>
                    {incrementCounterUpToLength(quadroDemograficoHelper.length)}
                    <Label>{handleDemograficoFormLabel(index, element)}</Label>
                    <element.type
                      {...element.props}
                      isDisabled={element?.dependencies && handleDisabled(element, index+1)}
                      onChange={(e: any) => {
                        let value = e?.target?.value;
                        // Aplica máscara de data se for o campo data_nascimento
                        if (isDateField && value !== undefined && value !== null) {
                          value = maskDate(value);
                          e.target.value = value;
                        }
                        if (element?.hasDependencies) {
                          handleDependencies(element, index+1, value);
                        }
                      }}
                      onMount={(val: any) => element?.hasDependencies && handleDependencies(element, index+1, val)}
                    />
                  </span>
                  )
              }
              )}
            </section>
          </Scope>
        ))}

        {extraDemograficoHelper?.map((s: FormHelperType[], sectionIndex: number) => (
          <section key={sectionIndex}>
            {s?.map((element: FormHelperType, elementIndex: number) => (
              <span key={elementIndex}>
                {elementIndex === 0 && <Label>Apenas para o respondente ou chefe</Label>}
                {incrementCounter()}
                <Label>{`${regularCounter}. ${element.label}`}</Label>
                <element.type
                  {...element.props}
                  isDisabled={element?.dependencies && handleRegularDisabled(element)}
                  onChange={(e: any) => {
                    console.log('[onChange] Campo:', element.props.name, 'Evento completo:', e, 'e?.value:', e?.value, 'e tipo:', typeof e, 'hasDependencies:', element?.hasDependencies, 'isMulti:', element?.props?.isMulti);
                    // react-select passa o objeto da opção no onChange: {value: "...", label: "..."}
                    // Para campos não multi, e será um objeto ou null
                    // Para campos multi, e será um array de objetos
                    if (element?.props?.isMulti !== true) {
                      if (element?.hasDependencies) {
                        const value = e?.value || e || null;
                        console.log('[onChange] Chamando handleRegularDependencies com valor:', value);
                        handleRegularDependencies(element, value)
                      }
                    } else {
                      if (element?.hasDependencies) {
                        console.log('[onChange] Chamando handleArrayDependencies com valor:', e);
                        handleArrayDependencies(element, e)
                      }
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
