import React, { useState, useRef, useCallback } from 'react';
import {
  OptionTypeBase
} from 'react-select';
import * as Yup from 'yup';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Label
} from './styles';
import {
  FiUser,
} from 'react-icons/fi';
import { useAuth } from '../../../../hooks/auth';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ICreatePersonDTO from '../../dtos/ICreatePersonDTO';
import { PersonValidation } from '../../validation/schemas/PersonValidation';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { uuid } from 'uuidv4';

import {
  genero,
  raca_cor,
  escolaridade,
  situacao_de_trabalho,
  ocupacao_profissional,
  local_de_trabalho,
  nao_tomou_vacina,
  vacina,
  diagnostico_covid,
  yesOrNoOptions,
  estado_de_saude,
  local_de_procura_do_servico_de_saude,
  motivo_procura_servico_saude,
  motivo_nao_atendimento_servico_saude,
  doenca_ultimos_12_meses,
  diagnostico_doenca_ultimos_12_meses,
} from '../../questions/SelectorOptions/options';

import api from '../../../../services/api';

import ICreateOfflineInterviewDTO from '../../dtos/ICreateOfflineInterviewDTO';

interface PersonFormProps {
  dispatch: Function;
  offline: boolean;
  initialValues?: any
  isEditForm?: boolean
}

const PersonForm: React.FC<PersonFormProps> = ({ dispatch, offline, initialValues = {}, isEditForm = false }) => {

  const [vaccine, setVaccine] = useState<OptionTypeBase | undefined | null>({});
  const [motivoProcuraServicoSaude, setMotivoProcuraServicoSaude] = useState<any[]>([]);

  const { user, token } = useAuth();

  const { addToast } = useToast();

  const PersonFormRef = useRef<FormHandles>(null);

  const [, setLoading] = useState<boolean>(false)

  const handlePersonSubmit = useCallback(async (data: ICreatePersonDTO) => {

    try {
      setLoading(true)
      PersonFormRef.current?.setErrors({});
      const validatedData = await PersonValidation.validate(data, {
        abortEarly: false,
      });

      const person = {
        interviewer_id: user.id,
        ...validatedData,
      };

      if (!offline) {
        const response = await api.post('/persons', person, {
          headers: { Authorization: `Bearer ${token}` },
        })
        localStorage.setItem('@Safety:person_id', response.data.id);

        dispatch({ type: 'PERSON', payload: { id: response.data.id } })

        addToast({
          type: 'success',
          title: 'Uma pessoa foi adicionada com sucesso',
          description: 'Você já pode adicionar uma residência',
        });
      } else {

        const uniqueId = uuid();

        localStorage.setItem(`@Safety:current-offline-interview-id`, JSON.stringify(uniqueId));

        const offlineInterviews: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

        const addPerson = Object.keys(offlineInterviews).length ? { ...offlineInterviews, [uniqueId]: { person } } : { [uniqueId]: { person } };


        localStorage.setItem(`@Safety:offline-interviews`, JSON.stringify(addPerson));

        dispatch({ type: 'PERSON', payload: { id: uniqueId } });

        addToast({
          type: 'success',
          title: 'Uma pessoa foi salva com sucesso no modo offline!',
          description: 'Você já pode adicionar uma residência no modo Offline!',
        });

      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        const errors = getValidationErrors(error);

        PersonFormRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: error.message,
          description: 'Todos os campos devem estar selecionados',
        });
      }
    } finally {
      setLoading(false)
    }
  }, [addToast, user, token, dispatch, offline]);


  if (isEditForm) {
    PersonFormRef.current?.setData({
      nome: initialValues?.nome,
      idade: initialValues?.idade,
      sexo: initialValues?.sexo,
      raca_cor: initialValues?.raca_cor,
      ler_escrever: initialValues?.ler_escrever,
      escolaridade: initialValues?.escolaridade,
      situacao_de_trabalho: initialValues?.situacao_de_trabalho,
      ocupacao: initialValues?.ocupacao,
      local_de_trabalho: initialValues?.local_de_trabalho,
      diagnostico_covid: initialValues?.diagnostico_covid,
      vacina: initialValues?.vacina,
      nao_tomou_vacina: initialValues?.nao_tomou_vacina,
      estado_de_saude: initialValues?.estado_de_saude,
      local_de_procura_do_servico_de_saude: initialValues?.local_de_procura_do_servico_de_saude,
      motivo_procura_servico_saude: initialValues?.motivo_procura_servico_saude,
      motivo_nao_atendimento_servico_saude: initialValues?.motivo_nao_atendimento_servico_saude,
      doenca_ultimos_12_meses: initialValues?.doenca_ultimos_12_meses,
      diagnostico_doenca_ultimos_12_meses: initialValues?.diagnostico_doenca_ultimos_12_meses,
    })
  }

  return (
    <StyledForm
      ref={PersonFormRef}
      onSubmit={handlePersonSubmit}
    >
      <section>
        <Label>1 - Qual o seu nome completo?</Label>
        <Input icon={FiUser} placeholder="Nome Completo" name="nome" />
        <Label>2 - Qual a sua idade?</Label>
        <Input name="idade" type="number" min="16" max="110" />

        <Label>3 - Qual o seu sexo?</Label>
        <Select name="sexo" options={genero} />

        <Label>4 - Como você define sua raça ou cor?</Label>
        <Select name="raca_cor" options={raca_cor} />
        <Label>5 - Você sabe ler e escrever?</Label>
        <Select name="ler_escrever" options={yesOrNoOptions} />

        <Label>6 - Até que série (grau) você frequentou na escola?</Label>
        <Select name="escolaridade" options={escolaridade} />
        <Label>7 - Qual a sua situação de trabalho? (LER AS OPÇÕES)</Label>
        <Select
          name="situacao_de_trabalho"
          options={situacao_de_trabalho}
        />
        </section>

        <section>
        <Label>8 - Qual a sua ocupação profissional?</Label>
        <Select
          name="ocupacao"
          options={ocupacao_profissional}
        />

        <Label>9 - Neste momento qual é o seu local de trabalho?</Label>
        <Select
          name="local_de_trabalho"
          options={local_de_trabalho}
        />
        <Label>10 - Você já teve diagnóstico positivo para o novo coronavírus (ou Covid-19)?</Label>
        <Select name="diagnostico_covid" options={diagnostico_covid} />
        <Label>
          11 - Você já tomou a vacina da Covid-19?
        </Label>
        <Select
          name="vacina"
          options={vacina}
          onChange={(selectedOption: any) => setVaccine(selectedOption)}
        />

        <Label>
          12 - Por que você não tomou a vacina da Covid-19?
        </Label>
        <Select
          name="nao_tomou_vacina"
          options={nao_tomou_vacina}
          isDisabled={vaccine?.value === 'Não tomei nenhuma dose da vacina' || vaccine?.value === 'ns-nr' ? false : true}
        />

        <Label>
          13 - De um modo geral, como você considera seu estado de saúde?
        </Label>
        <Select
          name="estado_de_saude"
          options={estado_de_saude}
        />
        </section>

        <section>
        <Label>
          14 - Quando está doente ou precisando de atendimento de saúde costuma procurar:
        </Label>
        <Select
          name="local_de_procura_do_servico_de_saude"
          options={local_de_procura_do_servico_de_saude}
          isMulti={true}
        />

        <Label>
          15 - O que ocorreu quando procurou o serviço de saúde?
        </Label>
        <Select
          name="motivo_procura_servico_saude"
          options={motivo_procura_servico_saude}
          isMulti={true}
          onChange={(selectedOption: any) => setMotivoProcuraServicoSaude(selectedOption)}
        />

        <Label>
          16 - Caso não tenha sido atendido(a), qual foi o motivo?
        </Label>
        <Select
          name="motivo_nao_atendimento_servico_saude"
          options={motivo_nao_atendimento_servico_saude}
          isMulti={true}
          isDisabled={motivoProcuraServicoSaude?.find((m: any) => m.value === 'nao_foi_atendido') ? false : true}
        />

        <Label>
          17 - Nos últimos 12 meses apresentou alguma dessas doenças?
        </Label>
        <Select
          name="doenca_ultimos_12_meses"
          options={doenca_ultimos_12_meses}
          isMulti={true}
        />

        <Label>
          18 - Doenças específicas: Nos últimos 12 meses recebeu diagnóstico de alguma dessas doenças?
        </Label>
        <Select
          name="diagnostico_doenca_ultimos_12_meses"
          options={diagnostico_doenca_ultimos_12_meses}
          isMulti={true}
        />

        {!isEditForm && <Button type="submit">Submit</Button>}

      </section>
    </StyledForm>
  );

}

export default PersonForm;
