import React, { useRef, useCallback, useReducer, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles, Scope } from '@unform/core';
import {
  StyledForm,
  Label
} from './styles';
import { useAuth } from '../../../../hooks/auth';
import Button from '../../../../components/Button';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';


import api from '../../../../services/api';
import ICreateInformacoesBasicasDTO from '../../dtos/ICreateInformacoesBasicasDTO';
import { FormHelperType, quadroDemograficoHelper } from './helper';
import { DemograficoValidation } from '../../validation/schemas/demograficoValidation';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import { yesOrNoOptionsArray } from '../../questions/SelectorOptions/options';



interface DemograficoFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const DemograficoForm: React.FC<DemograficoFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false }) => {
    
  const { user, token } = useAuth();

  const [formState, setFormState] = useState({})

//   function handleFormState(e: any) {
//     setFormState({
//         ...formState,
//         [e.target.name || 'teste']: e.target.value
//     })
//   }

  console.log('formState ', formState)

  const { addToast } = useToast();

  const DemograficoFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ICreateInformacoesBasicasDTO) => {
    try {
      DemograficoFormRef.current?.setErrors({});
      const validatedData = await DemograficoValidation.validate(data, {
        abortEarly: false,
      });

      const indigenous_demografico = {
        ...data,
        ...validatedData,
      };

      if (!offline) {
        console.log('indigenous_demografico ', indigenous_demografico)
        // const response = await api.post('/indigenous-demografico', indigenous_demografico, {
        //   headers: { Authorization: `Bearer ${token}` },
        // })
        // localStorage.setItem('@Safety:indigenous_demografico_id', response.data.id);

        // dispatch({ type: 'DEMOGRAFICO', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Módulo Demográfico adicionado com sucesso',
          description: 'Você já pode prosseguir para o módulo domicílio',
        });
      } else {
        //TODO: FAZER VERSÃO OFFLINE
      }
    } catch (error) {
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
  }, [addToast, user, token, dispatch, offline]);

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
    const removeForm = (id: number) => {
        setResidentsGrid((prev: any) => prev.filter((p: any) => p.id !== id));
    };
    const [baseArraySize, setBaseArraySize] = useState<number>(0)
    function handleArrayForm(e: any) {
        e.preventDefault()
        const arraySize = baseArraySize
        setResidentsGrid([])
        for (let i = 0; i < arraySize; i++) {
            addForm()
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
            <Scope path={`quadro_social_demografico[${index}]`} key={item.id}>
                <section>
                    <span style={{ visibility: 'hidden' }}>
                        <Input name="id" value={index+1} type="number" />
                    </span>
                    {quadroDemograficoHelper?.map((element: FormHelperType, elementIndex: number) => (
                        <span key={elementIndex}>
                            <Label>{element.label}</Label>
                            <element.type {...element.props} />
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
                APENAS PARA A PESQUISA DOS Guarani Kaiowá: Alguém desta casa já trabalhou ou trabalha na colheita de maçã no sul do país no período de colheita (em geral de janeiro a abril)? 
            </Label>
            <Select name="trabalho_colheita_de_maca" options={yesOrNoOptionsArray} />
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
