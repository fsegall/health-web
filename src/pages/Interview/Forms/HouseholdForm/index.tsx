import React, { useState, useRef, useCallback } from 'react';
import {
  OptionTypeBase
} from 'react-select';
import * as Yup from 'yup';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import {
  StyledForm,
  Section,
  CheckBoxContainer,
  Label
} from './styles';
import {
  FiDollarSign,
} from 'react-icons/fi';
import { useAuth } from '../../../../hooks/auth';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ICreateHouseholdDTO from '../../dtos/ICreateHouseholdDTO';
import { useToast } from '../../../../hooks/toast';
import { HouseholdValidation } from '../../validation/schemas/HouseholdValidation';
import getValidationErrors from '../../../../utils/getValidationErrors';
import {
  local_do_domicilio,
  morador_de_rua,
  qual_povo_tradicional,
  covid_perda,
  tipo_de_residencia,
  material_de_construcao,
  agua_potavel,
  pessoas_convidadas,
  esgoto,
  faixa_de_renda,
  programas_de_assistencia,
  pnae,
  auxilio_vezes,
  tipo_de_ajuda,
  divisao_alimento,
  como_adquiriu_comida,
  alteracao_preco_comida,
  mercado,
  perfil_de_compra,
  gastos_alimentacao,
  genero,
  raca_cor,
  escolaridade,
  situacao_de_trabalho,
  ocupacao_profissional,
  local_de_trabalho,
  nao_tomou_vacina,
  vacina,
  yesOrNoOptions,
} from '../../questions/SelectorOptions/options';

import api from '../../../../services/api';
import CheckboxInput from '../../../../components/Checkbox';
import { parseHouseholdData } from './utils';
import ICreateOfflineInterviewDTO from '../../dtos/ICreateOfflineInterviewDTO';

interface HouseholdFormProps {
  dispatch: Function;
  offline: boolean;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ dispatch, offline }) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const [mainPerson, setMainPerson] = useState<OptionTypeBase | undefined | null>({});

  const [traditional, setTraditional] = useState<OptionTypeBase | undefined | null>({});

  const [income, setIncome] = useState(true);

  const [morePeople, setMorePeople] = useState(true);

  const [auxilio, setAuxilio] = useState<OptionTypeBase | undefined | null>({});

  const [ajuda, setAjuda] = useState<OptionTypeBase | undefined | null>({});

  const [homegrown, setHomegrown] = useState<OptionTypeBase | undefined | null>({});

  const [produce, setProduce] = useState<OptionTypeBase | undefined | null>({});

  const [buyingProfile, setBuyingProfile] = useState<OptionTypeBase | undefined | null>({});

  const [covid2020, setCovid2020] = useState<OptionTypeBase | undefined | null>({});

  const [covid2021, setCovid2021] = useState<OptionTypeBase | undefined | null>({});

  const [educ, setEduc] = useState<OptionTypeBase | undefined | null>({});

  const [preoAlimentos, setPreoAlimentos] = useState<OptionTypeBase | undefined | null>({});

  const [acabAlimentos, setAcabAlimentos] = useState<OptionTypeBase | undefined | null>({});

  const [saudAlimentos, setSaudAlimentos] = useState<OptionTypeBase | undefined | null>({});

  const [vaccine, setVaccine] = useState<OptionTypeBase | undefined | null>({});

  const HouseholdFormRef = useRef<FormHandles>(null);

  const handleHouseholdSubmit = useCallback(
    async (data: ICreateHouseholdDTO) => {


      const parsedData = parseHouseholdData(data);


      try {
        HouseholdFormRef.current?.setErrors({});

        const validatedData = await HouseholdValidation.validate(parsedData, {
          abortEarly: false,
        });

        if (!offline) {


          const person_id = localStorage.getItem('@Safety:person_id');

          const household = {
            person_id,
            ...validatedData,
          };


          const response = await api.post('/households', household, {
            headers: { Authorization: `Bearer ${token}` },
          });


          localStorage.setItem('@Safety:household_id', response.data.id);

          dispatch({ type: 'HOUSEHOLD', payload: { id: response.data.id } });

          addToast({
            type: 'success',
            title: 'Uma residência foi adicionada com sucesso',
            description: 'Você já pode adicionar um endereço',
          });
        } else {

          const household = {
            ...validatedData,
          };

          const uniqueId = JSON.parse(localStorage.getItem('@Safety:current-offline-interview-id') || "");

          const offlineInterviews: { [key: string]: ICreateOfflineInterviewDTO } = JSON.parse(localStorage.getItem('@Safety:offline-interviews') || '{}');

          console.log('interviews', offlineInterviews);

          const addHousehold = offlineInterviews.hasOwnProperty(uniqueId) ? { ...offlineInterviews, [uniqueId]: { ...offlineInterviews[uniqueId], household } } : false;

          if (addHousehold) {
            localStorage.setItem(`@Safety:offline-interviews`, JSON.stringify(addHousehold));

            dispatch({ type: 'HOUSEHOLD', payload: { id: uniqueId } });

            addToast({
              type: 'success',
              title: 'Uma residência foi salva com sucesso no modo offline!',
              description: 'Você já pode adicionar um endereço no modo Offline!',
            });
          } else {
            throw new Error('Você também precisa adicionar uma pessoa antes de uma residência no modo offline');
          }
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          console.log(error);
          const errors = getValidationErrors(error);

          HouseholdFormRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: error.message,
            description: 'Todos os campos devem estar selecionados',
          });
        } else {
          console.log(error);
        }
      }
    },
    [addToast, token, dispatch, offline],
  );

  return (
    <StyledForm ref={HouseholdFormRef} onSubmit={handleHouseholdSubmit} >
      <Section>
        <Label>
          <span>D1 - Localização do domicílio</span>
          <Select name="local_do_domicilio" options={local_do_domicilio} />
        </Label>
        <Label>D2 - A pessoa entrevistada é moradora em situação de rua?</Label>
        < Select name="morador_de_rua" options={morador_de_rua} />
        <Label>D3 - A moradia está localizada em território de povos e comunidades tradicionais?</Label>
        < Select
          name="povos_tradicionais"
          options={yesOrNoOptions}
          onChange={selectedOption => setTraditional(selectedOption)}
        />
        <Label>D4 - Qual comunidade tradicional ou povos?</Label>
        < Select
          name="qual_povo_tradicional"
          options={qual_povo_tradicional}
          isDisabled={traditional?.value === 'true' ? false : true}
        />
        <Label>D5 - Você é a pessoa de referência da sua casa (chefe da casa)?</Label>
        < Select
          name="pessoa_de_referencia"
          options={yesOrNoOptions}
          onChange={selectedOption => setMainPerson(selectedOption)}
        />

        <Label>D6 - Qual a idade da pessoa de referência?</Label>


        {mainPerson?.value === 'false' ?
          (
            <>
              <Input
                placeholder="Idade"
                type="number"
                min="16"
                max="110"
                name="idade_pessoa_de_referencia"
              />
            </>
          ) : null}

        <Label>D7 - Qual o sexo da pessoa de referência?</Label>
        < Select
          name="sexo_pessoa_de_referencia"
          options={genero}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>D8 - Como você define a raça ou cor da pessoa de referência?</Label>
        < Select name="raca_cor" options={raca_cor} isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false} />

        <Label>D9 - A pessoa de referência sabe ler e escrever?</Label>
        < Select name="ler_escrever" options={yesOrNoOptions} isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false} />

        <Label>D10 - Até que série (grau) escolar frequentou a pessoa de referência?</Label>
        < Select name="escolaridade" options={escolaridade} isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false} />

        <Label>D11 - Qual a situação de trabalho da pessoa de referência?</Label>
        < Select
          name="situacao_de_trabalho"
          options={situacao_de_trabalho}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>D12 - Qual a ocupação da pessoa de referência?</Label>
        < Select
          name="ocupacao_profissional"
          options={ocupacao_profissional}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>D13 - Neste momento qual é o local de trabalho da pessoa de referência?</Label>
        < Select
          name="local_de_trabalho"
          options={local_de_trabalho}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>D14 - No ano de 2020 (entre Fevereiro e Dezembro de 2020) algum morador da sua casa teve diagnóstico positivo para de Coronavírus (ou Convid-19)?</Label>
        < Select
          name="covid_2020"
          options={yesOrNoOptions}
          onChange={selectedOption => {
            setCovid2020(selectedOption)
          }}
        />

        <Label>D15 - No ano de 2020 vocês perderam alguém (morreu alguém) por Covid-19 que morava nesta casa?</Label>
        < Select
          name="covid_perda_2020"
          options={covid_perda}
          isDisabled={covid2020?.value === 'false' ? true : false}
        />

        <Label>D16 - Neste ano de 2021 (de janeiro até hoje) algum morador da sua casa teve diagnóstico positivo para de Coronavírus (ou Convid-19)?</Label>
        < Select
          name="covid_2021"
          options={yesOrNoOptions}
          onChange={selectedOption => {
            setCovid2021(selectedOption)
          }}
        />

        <Label>D17 - Neste ano de 2021 (de Janeiro até hoje) vocês perderam alguém (morreu alguém) que morava nesta casa?</Label>
        < Select
          name="covid_perda_2021"
          options={covid_perda}
          isDisabled={covid2021?.value === 'false' ? true : false}
        />

        <Label>D18 - Tipo de residência</Label>
        <Select name="tipo_de_residencia" options={tipo_de_residencia} />
        <Label>D19 - Qual o número de cômodos na casa incluindo banheiros?</Label>
        <Input
          placeholder="Número de cômodos"
          type="number"
          min="1"
          max="12"
          name="numero_de_comodos"
          defaultValue="1"
        />
        <Label>D20 - Qual o material de construção das paredes externas da casa?</Label>
        <Select name="material_de_construcao" options={material_de_construcao} />
        <Label>D21 - Tem acesso à água potável na sua casa?</Label>
        <Select name="agua_potavel" options={agua_potavel} />

        <Label>D22 - Como é feita a coleta de esgoto na casa?</Label>
        <Select name="esgoto" options={esgoto} />
        <Label>D23 - Número de pessoas no domicílio</Label>
        <Input
          placeholder="Número de pessoas"
          type="number"
          min="1"
          max="12"
          name="numero_de_pessoas"
          defaultValue="1"
        />
        <CheckBoxContainer>
          <CheckboxInput
            name="uma_pessoa_domicilio"
            options={[{
              id: 'one_person_household',
              value: 'true',
              label: 'D24 - Eu moro sozinho',
            }]}
            onChange={() => setMorePeople(!morePeople)}
          />
        </CheckBoxContainer>
        {morePeople ?

          (
            <>
              <Label>Número de pessoas por faixa de idade:</Label>
              <Label>D25 - Quantos moradores com até 5 anos</Label>
              <Input
                placeholder="Menos de 5 anos - Digitar número"
                name="cinco_anos_ou_mais"
                min="0"
                max="6"
                type="number"

              />
              <Label>D26 - Quantos moradores entre 6 e 18 anos</Label>
              <Input
                placeholder="Entre 6 e 18 anos - Digitar número"
                name="entre_6_e_18"
                min="0"
                max="6"
                type="number"

              />
              <Label>D27 - Quantos moradores entre 19 e 59 anos</Label>
              <Input
                placeholder="Entre 19 e 59 anos - Digitar número"
                name="entre_19_e_59"
                min="0"
                max="6"
                type="number"

              />
              <Label>D28 - Quantos moradores 60 anos ou mais</Label>
              <Input
                placeholder="Com 60 anos ou mais - Digitar número"
                name="sessenta_anos_ou_mais"
                min="0"
                max="6"
                type="number"
              />
              <Label>
                D29 - Das pessoas que relacionou antes, quantas você acolheu no momento da pandemia?
              </Label>
              <Select
                name="pessoas_convidadas"
                options={pessoas_convidadas}
              />
            </>
          ) : null}
      </Section >

      <Section>
        <Label>
          <strong>Nos últimos 30 dias qual foi a renda familiar?</strong>
          <Label>(DE TRABALHO COM CARTEIRA ASSINADA OU NÃO, DE PENSÃO, DE APOSENTADORIAS, DE BENEFÍCIOS COMO O BOLSA FAMÍLIA OU DE OUTROS PROGRAMAS DE TRANSFERÊNCIA DE RENDA, DE SEGURO DESEMPREGO, DE DOAÇÕES OU OUTRAS FORMAS DE RENDA)</Label>
        </Label>
        <CheckBoxContainer>
          <CheckboxInput

            name="nao_sabe_renda"
            options={[{
              id: 'income_unknown',
              value: 'true',
              label: 'D30 - Não sei informar',
            }]}
            onChange={() => setIncome(!income)}
          />
        </CheckBoxContainer>

        {income ?

          <Input
            icon={FiDollarSign}
            placeholder="D31 - Renda familiar"
            name="renda_familiar"
            type="number"
            min="1"

          />

          : null}
        <Label><strong></strong></Label>

        <Label>
          D32 - Das faixas de renda abaixo, qual aquela que mais se aproxima da renda de sua família: (ATENÇÃO: LER TODAS AS ALTERNATIVAS E MARCAR APENAS UMA)?
        </Label>
        <Select
          name="faixa_de_renda"
          options={faixa_de_renda}
        />


        <CheckBoxContainer>
          <Label>
            <span>D33 - Em relação ao trabalho e à renda das pessoas, A PANDEMIA DO CORONAVÍRUS OU COVID-19 levou a: (Pode ter mais de uma resposta) </span>
          </Label>

          <CheckboxInput

            name="perda_de_emprego"
            options={[{ id: 'Perda de emprego', value: 'true', label: 'Perda de emprego/trabalho de algum membro da casa' }]}
          />

          <CheckboxInput

            name="reducao_de_salario"
            options={[{ id: 'reducao_de_renda', value: 'true', label: 'Redução da renda domiciliar (dos moradores da casa)' }]}
          />

          <CheckboxInput

            name="ajuda_financeira"
            options={[{ id: 'ajuda_financeira', value: 'true', label: 'Necessidade de ajudar financeiramente algum parente ou amigo' }]}
          />

          <CheckboxInput

            name="divida"
            options={[{ id: 'dividas', value: 'true', label: 'Endividamento de moradores' }]}
          />

          <CheckboxInput

            name="corte_de_gastos"
            options={[{ id: 'corte_de_gastos', value: 'true', label: 'Corte de gastos em despesas essenciais' }]}
          />

          <CheckboxInput

            name="corte_de_gastos_nao_essenciais"
            options={[{ id: 'corte_de_gastos_nao_essenciais', value: 'true', label: 'Corte de gastos em despesas não essenciais' }]}
          />

          <CheckboxInput
            name="ns_nr_trabalho"
            options={[{ id: 'ns_nr_trabalho', value: 'true', label: 'Não sabe ou não quis responder' }]}
          />

        </CheckBoxContainer>
        <Label><strong>Enfrentamento da INSAN e questões alimentares</strong></Label>

        <Label>
          D34 - Você ou alguém da sua casa está matriculado na educação básica pública (educação infantil, ensino fundamental, ensino médio e educação de jovens e adultos)?
        </Label>
        <Select
          name="educacao_basica_publica"
          options={yesOrNoOptions}
          onChange={selectedOption => setEduc(selectedOption)}
        />

        <Label>
          D35 - Nos últimos três meses, você ou alguém da sua casa recebeu <b>auxílio referente ao Programa de Alimentação Escolar (PNAE)</b>?
        </Label>
        <Select
          name="pnae"
          options={pnae}
          isDisabled={educ?.value === 'false' || educ?.value === 'ns-nr' ? true : false}
        />

        <Label>
          D36 - Nos últimos três meses, você ou alguém da sua casa estava registrado(a) no <b>cadastro único do governo</b>?
        </Label>
        <Select
          name="cadastro_unico"
          options={programas_de_assistencia}
        />

        <Label>
          D37 - Nos últimos três meses, você ou alguém da sua casa recebeu pagamento do programa <b>bolsa família</b>?
        </Label>
        <Select
          name="bolsa_familia"
          options={programas_de_assistencia}
        />

        <Label>
          D38 - Nos últimos três meses, você ou alguém da sua casa recebeu pagamento do programa <b>BPC</b>  (Benefício de Prestação Continuada)?
        </Label>
        <Select
          name="bpc"
          options={programas_de_assistencia}
        />

        <Label>
          D39 - Nos últimos três meses, você ou alguém da sua casa recebeu <b>pensão por morte do(a) cônjuge</b>?
        </Label>
        <Select
          name="pensao"
          options={yesOrNoOptions}
        />

        <Label>
          D40 - Nos últimos três meses, você ou alguém da sua casa recebeu <b>auxílio reclusão</b>?
        </Label>
        <Select
          name="auxilio_reclusao"
          options={yesOrNoOptions}
        />

        <Label>
          D41 - Nos últimos três meses, você ou alguém da sua casa recebeu <b>cesta de alimentos</b>?
        </Label>
        <Select
          name="cesta_de_alimentos"
          options={yesOrNoOptions}
        />

        <Label>
          D42 - Nos últimos três meses, você ou alguém da sua casa <b>frequentou restaurantes populares</b> para fazer refeições?
        </Label>
        <Select
          name="restaurantes_populares"
          options={yesOrNoOptions}
        />

        <Label>
          D43 - Nos últimos três meses, você ou alguém da sua casa <b>solicitou auxílio emergencial</b> por causa da pandemia do Coronavírus ou Covid-19?
        </Label>

        <Select
          name="auxilio_emergencial"
          options={yesOrNoOptions}
          onChange={selectedOption => {
            setAuxilio(selectedOption)
          }}
        />

        <Label>D44 - Quantas vezes você ou outra pessoa que mora na sua casa recebeu o auxílio?</Label>

        <Select
          name="auxilio_vezes"
          options={auxilio_vezes}
          isDisabled={auxilio?.value === 'true' ? false : true}
        />

        <Label>
          D45 - Nos últimos três meses, você ou alguém da sua casa recebeu ajuda <b>de alguma instituição/associação. igreja, amigos, parentes ou outros</b>?
        </Label>

        <Select
          name="ajuda_instituicao_caridade"
          options={yesOrNoOptions}
          onChange={selectedOption => setAjuda(selectedOption)}
        />

        <Label>
          D46 - Caso você ou alguém da sua casa tenha recebido ajuda <b>o que recebeu</b>?
        </Label>

        <Select
          name="tipo_de_ajuda"
          options={tipo_de_ajuda}
          isDisabled={ajuda?.value === 'true' ? false : true}
        />

        <Label>
          D47 - Nos últimos três meses, para conseguir alimentos, você ou outra pessoa que mora na sua casa, teve que fazer alguma coisa que causou <b>vergonha, tristeza ou constrangimento</b>?
        </Label>

        <Select
          name="vergonha"
          options={yesOrNoOptions}
        />

        <Label>
          D48 - Na sua casa você <b>produz algum tipo de alimento</b> vegetal ou animal?
        </Label>

        <Select
          name="produz_alimento"
          options={yesOrNoOptions}
          onChange={selectedOptions => setHomegrown(selectedOptions)}
        />

        <Label>D49 - Este domicílio tem água suficiente para animais (dessedentação)?</Label>
        <Select name="agua_animais" options={yesOrNoOptions} />

        <Label>D50 - Este domicílio tem água suficiente para produção de alimentos?</Label>
        <Select name="agua_producao_alimentos" options={yesOrNoOptions} />

        <Label>
          D51 - Na sua casa você produz algum desses alimentos <b>para venda</b>?
        </Label>

        <Select
          name="alimento_para_venda"
          options={yesOrNoOptions}
          onChange={selectedOptions => setProduce(selectedOptions)}
          isDisabled={homegrown?.value === 'true' ? false : true}
        />

        <Label>
          D52 - Na sua casa como você divide <b>o alimento que produz para venda</b>?
        </Label>

        <Select
          name="divisao_alimento"
          options={divisao_alimento}
          isDisabled={produce?.value === 'true' ? false : true}
        />

        <Label>
          D53 - Nos últimos 3 meses, <b>enfrentou dificuldade para comercialização devido à pandemia</b>?
        </Label>

        <Select
          name="dificuldade_venda"
          options={yesOrNoOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

        <Label>
          D54 - Nos últimos 3 meses, você <b>precisou consumir, doar, descartar ou fazer outro uso</b> do alimento que pretendia comercializar por conta da pandemia?
        </Label>

        <Select
          name="nao_vendeu"
          options={yesOrNoOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

      </Section>

      <Section>
        <Label><strong>Perguntas da Escala de Segurança Alimentar e Nutricional</strong></Label>
        <Label>
          D55 - NOS ÚLTIMOS TRÊS MESES, OS MORADORES DO SEU DOMICÍLIO TIVERAM A <b>PREOCUPAÇÃO DE QUE OS ALIMENTOS ACABASSEM</b> ANTES DE PODER COMPRAR OU RECEBER MAIS COMIDA?
        </Label>
        <Select
          name="preocupacao_alimentos"
          options={yesOrNoOptions}
          onChange={selectedOption => setPreoAlimentos(selectedOption)}
        />
        <Label>
          D56 - NOS ÚLTIMOS TRÊS MESES, <b>OS ALIMENTOS ACABARAM</b> ANTES QUE OS MORADORES DO SEU DOMICÍLIO TIVESSEM DINHEIRO PARA COMPRAR MAIS COMIDA?
        </Label>
        <Select
          name="alimentos_acabaram"
          options={yesOrNoOptions}
          onChange={selectedOption => setAcabAlimentos(selectedOption)}
        />
        <Label>
          D57 - NOS ÚLTIMOS TRÊS MESES OS MORADORES DO SEU DOMICÍLIO <b>FICARAM SEM DINHEIRO PARA TER UMA ALIMENTAÇÃO SAUDÁVEL E VARIADA</b>?
        </Label>
        <Select
          name="alimentos_saudaveis"
          options={yesOrNoOptions}
          onChange={selectedOption => setSaudAlimentos(selectedOption)}
        />
        <Label>
          D58 - NOS ÚLTIMOS TRÊS MESES, OS MORADORES DO SEU DOMICÍLIO <b>COMERAM APENAS ALGUNS POUCOS TIPOS DE ALIMENTOS</b> QUE AINDA TINHAM PORQUE O DINHEIRO ACABOU?
        </Label>
        <Select
          name="alimentos_poucos_tipos"
          options={yesOrNoOptions}
          isDisabled={preoAlimentos?.value === 'false' && acabAlimentos?.value === 'false' && saudAlimentos?.value === 'false' ? true : false}
        />
        <Label>
          D59 - NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS <b>DEIXOU DE FAZER ALGUMA REFEIÇÃO</b>, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="refeicoes_adulto"
          options={yesOrNoOptions}
          isDisabled={preoAlimentos?.value === 'false' && acabAlimentos?.value === 'false' && saudAlimentos?.value === 'false' ? true : false}
        />
        <Label>
          D60 - NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS <b>COMEU MENOS DO QUE ACHOU QUE DEVIA</b>, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adulto_comeu_menos"
          options={yesOrNoOptions}
          isDisabled={preoAlimentos?.value === 'false' && acabAlimentos?.value === 'false' && saudAlimentos?.value === 'false' ? true : false}
        />
        <Label>
          D61 - NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS <b>SENTIU FOME</b>, MAS NÃO COMEU, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adulto_fome"
          options={yesOrNoOptions}
          isDisabled={preoAlimentos?.value === 'false' && acabAlimentos?.value === 'false' && saudAlimentos?.value === 'false' ? true : false}
        />
        <Label>
          D62 - NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS FEZ <b>APENAS UMA REFEIÇÃO AO DIA OU FICOU UM DIA INTEIRO SEM COMER</b> PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adulto_uma_refeicao"
          options={yesOrNoOptions}
          isDisabled={preoAlimentos?.value === 'false' && acabAlimentos?.value === 'false' && saudAlimentos?.value === 'false' ? true : false}
        />
        <Label><strong></strong></Label>
        <Label>
          D63 - Nos últimos 3 meses, na maioria das vezes <b>de que forma você e as pessoas da sua casa</b> estão adquirindo os alimentos?
        </Label>
        <Select
          name="como_adquiriu_comida"
          options={como_adquiriu_comida}
        />
        <Label>
          D64 - Nos últimos 3 meses, <b>observou alguma mudança nos preços</b> dos alimentos que costuma comprar?
        </Label>
        <Select
          name="alteracao_preco_comida"
          options={alteracao_preco_comida}
          onChange={selectedOption => setBuyingProfile(selectedOption)}
        />

        <Label>
          D65 - A mudança alterou <b>o seu perfil de compra</b> dos alimentos?
        </Label>
        <Select
          name="perfil_de_compra"
          options={perfil_de_compra}
          isDisabled={buyingProfile?.value === 'nao' || buyingProfile?.value === 'ns-nr' ? true : false}
        />

        <Label>
          D66 - Nos últimos 3 meses, <b>qual foi o tipo de estabelecimento</b> que você ou alguém da sua casa mais frequentou para fazer as compras?
        </Label>
        <Select
          name="mercado"
          options={mercado}
        />

        <Label>
          D67 - Nos últimos 3 meses, considera que <b>as despesas/gastos semanais</b> com alimentação mudaram na sua casa?
        </Label>
        <Select
          name="gastos_alimentacao"
          options={gastos_alimentacao}
        />

        <Label><strong>Agora queremos saber mais sobre a sua alimentação</strong></Label>

        <Label>D68 - Ontem você comeu:</Label>
        <CheckBoxContainer>
          <CheckboxInput

            name="feijao"

            options={[{
              id: 'Feijão',
              value: 'true',
              label: 'Feijão',
            }]}

          />

          <CheckboxInput

            name="arroz"
            options={[{
              id: 'Arroz',
              value: 'true',
              label: 'Arroz',
            }]}
          />

          <CheckboxInput

            name="carnes"
            options={[{
              id: 'Carnes (de boi, peixe, frango ou porco)',
              value: 'true',
              label: 'Carnes (de boi, peixe, frango ou porco)',
            }]}
          />

          <CheckboxInput

            name="verduras_legumes"
            options={[{
              id: 'Verduras e/ou legumes',
              value: 'true',
              label: 'Verduras e/ou legumes (não considerar batata, mandioca, aipim, macaxeira, cará e inhame)',
            }]}
          />

          <CheckboxInput

            name="frutas_frescas"
            options={[{
              id: 'Frutas frescas',
              value: 'true',
              label: 'Frutas frescas (não considerar suco de frutas)',
            }]}
          />

          <CheckboxInput

            name="leite"
            options={[{
              id: 'Leite',
              value: 'true',
              label: 'Leite e derivados',
            }]}
          />

          <CheckboxInput

            name="hamburguer_embutidos"
            options={[{
              id: 'Hambúrguer e/ou embutidos',
              value: 'true',
              label: 'Hambúrguer e/ou embutidos (presunto, mortadela, salame, linguiça, salsicha)',
            }]}
          />

          <CheckboxInput

            name="bebidas_adocadas"
            options={[{
              id: 'Bebidas adoçadas',
              value: 'true',
              label: 'Bebidas adoçadas (refrigerante, suco de caixinha, suco em pó, água de coco de caixinha, xaropes de guaraná/groselha, suco de fruta com adição de açúcar)',
            }]}
          />

          <CheckboxInput

            name="macarrao_instantaneo_salgadinhos_de_pacote_biscoitos_salgados"
            options={[{
              id: 'Macarrão instantâneo, salgadinhos de pacote ou biscoitos salgados',
              value: 'true',
              label: 'Macarrão instantâneo, salgadinhos de pacote ou biscoitos salgados',
            }]}
          />

          <CheckboxInput

            name="biscoito_recheado_doces_guloseimas"
            options={[{
              id: 'Biscoito recheado, doces ou guloseimas',
              value: 'true',
              label: 'Biscoito recheado, doces ou guloseimas (balas, pirulitos, chiclete, caramelo, gelatina)',
            }]}
          />

        </CheckBoxContainer>
        <Label>
          D69 - Você já tomou a vacina da Covid-19?
        </Label>
        <Select
          name="vacina"
          options={vacina}
          onChange={selectedOption => setVaccine(selectedOption)}
        />

        <Label>
          D70 - Por que você não tomou a vacina da Covid-19?
        </Label>
        <Select
          name="nao_tomou_vacina"
          options={nao_tomou_vacina}
          isDisabled={vaccine?.value === 'Não tomei nenhuma dose da vacina' || vaccine?.value === 'ns-nr' ? false : true}
        />

        <Button>Submit</Button>
      </Section>

    </StyledForm >
  );

}

export default HouseholdForm;


