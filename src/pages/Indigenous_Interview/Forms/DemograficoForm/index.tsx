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


import { FormHelperType, quadroDemograficoHelper } from './helper';
import { DemograficoValidation } from '../../validation/schemas/demograficoValidation';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import { trabalhoColheitaRegioesOptions, yesOrNoOptions } from '../../questions/SelectorOptions/options';
import { handleValueLabelOption } from '../../questions/handleValueLabelOption';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import ICreateDemograficoDTO from '../../dtos/ICreateDemograficoDTO';
import ICreateIndigenousOfflineInterviewDTO from '../../dtos/ICreateIndigenousOfflineInterviewDTO';



interface DemograficoFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const DemograficoForm: React.FC<DemograficoFormProps> = ({ dispatch, offline, initialValues, isEditForm = false }) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const DemograficoFormRef = useRef<FormHandles>(null);

  let counter = 0;

  function incrementCounter () {
    if(counter === 12) {
      counter = 1
      return
    }
    counter += 1;
  }

  const handleSubmit = useCallback(async (data: ICreateDemograficoDTO) => {
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
        const response = await api.post('/indigeanous-interviews/demography', indigenous_demografico, {
          headers: { Authorization: `Bearer ${token}` },
        })
        localStorage.setItem('@Safety:indigenous_demografico', response.data.id);

        dispatch({ type: 'DEMOGRAFICO', payload: { id: response.data.id } })

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

          dispatch({ type: 'DEMOGRAFICO', payload: { id: uniqueId } })

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
  }, [addToast, offline, initialValues, token, dispatch]);

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
        if (obj?.[1]?.find((v: any) => Number(v) <= Number(found))) {
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

  return (
    <StyledForm
      ref={DemograficoFormRef}
      onSubmit={handleSubmit}
    >
        <section>
            <Label>Quantas pessoas são moradores desta casa? (exclui pessoas de passagem, visitantes parentes ou não)</Label>
            <Input name="total_moradores" type="number" onChange={(e) => setBaseArraySize(Number(e.target.value))} />
            <Button type="button" onClick={handleArrayForm}>Gerar tabela</Button>
            {residentsGrid?.length > 0 && (
                <Label>
                    ATENÇÃO: Primeiro preencha o nome de cada morador, na ordem do mais velho ao mais novo, conferir com o número de moradores referidos antes e perguntar se falta alguém.  Todas as perguntas do quadro devem ser preenchidas para cada morador, ao terminar 1 morador passa-se para o nome abaixo
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
                        <span key={elementIndex}>
                            {incrementCounter()}
                            <Label>{`${counter}. ${element.label}`}</Label>
                            <element.type
                              {...element.props}
                              isDisabled={element?.dependencies && handleDisabled(element, index+1)}
                              onChange={(e: any) => element?.hasDependencies && handleDependencies(element, index+1, e?.target.value)}
                              />
                        </span>
                        )
                    )}
                    {/* <Button type="button" onClick={() => removeForm(item.id)}>
                        Remover
                    </Button> */}
                </section>
            </Scope>
        ))}
        <section>
            <Label>
              Alguém desta casa trabalhou no último ano, ou tem trabalho temporário de colheita em fazendas em outras regiões do país (por exemplo, na colheita de maçã no sul do país ou corte manual de cana)? (PODE SER MAIS DE 1 RESPOSTA)
            </Label>
            <Select name="morador_trabalhou_fazendas" isMulti={true} options={handleValueLabelOption(trabalhoColheitaRegioesOptions)} />
            <Label>
              Alguém desta casa já trabalhou no último ano, ou trabalha para fazendeiros desta região  na catação/colheita de milho, mandioca, soja, ou outro produto?
            </Label>
            <Select name="morador_trabalhou_catacao" options={handleValueLabelOption(yesOrNoOptions)} />
            <Button type="submit">Enviar</Button>
        </section>
        {/* {residentsGrid?.length > 0 && (
            <section>
                <Button
                    onClick={() => addForm()}
                    type="button"
                >
                    Adicionar
                </Button>

            </section>
        )} */}
    </StyledForm>
  );
}

export default DemograficoForm;
