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
  drinkingWaterOptions,
  typeOfResidenceOptions,
  locationOptions,
  traditionalPeoplesOptions,
  whichTraditionalPeoplesOptions,
  homelessOptions,
  peopleInvitedToHouseholdOptions,
  buildingMaterialOptions,
  sewageOptions,
  worriedWithFoodSupplyOptions,
  LackOfFoodOptions,
  cannotAffordFoodOptions,
  yesOrNoOptions,
  governmentProgramOptions,
  governmentPNAEProgramOptions,
  typeOfrecievedCharityOptions,
  homeGrownSellingFoodOptions,
  FoodSellingOptions,
  howFoodIsObtainedOptions,
  FoodPriceOptions,
  FoodStoreOptions,
  FoodProfileOptions,
  FoodExpenditureOptions,
  mainPersonGenderOptions,
  genderOptions,
  raceOptions,
  educationOptions,
  LiteracyOptions,
  main_person_work_status,
  main_person_work_occupation,
  main_person_work_situation,
  covidLossOptions,
  peopleIncomeRangeOptions
} from '../../questions/SelectorOptions/options';

import api from '../../../../services/api';
import CheckboxInput from '../../../../components/Checkbox';
import { parseHouseholdData } from './utils';

interface HouseholdFormProps {
  dispatch: Function;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({ dispatch }) => {

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

  const HouseholdFormRef = useRef<FormHandles>(null);

  const handleHouseholdSubmit = useCallback(
    async (data: ICreateHouseholdDTO) => {


      const parsedData = parseHouseholdData(data);


      try {
        HouseholdFormRef.current?.setErrors({});

        const validatedData = await HouseholdValidation.validate(parsedData, {
          abortEarly: false,
        });

        const person_id = localStorage.getItem('@Safety:person_id');

        const household = {
          person_id,
          ...validatedData,
        };


        const response = await api.post('/households', household, {
          headers: { Authorization: `Bearer ${token}` },
        });



        localStorage.setItem('@Safety:household_id', response.data.id);

        dispatch({ type: 'HOUSEHOLD' });

        addToast({
          type: 'success',
          title: 'Uma residência foi adicionada com sucesso',
          description: 'Você já pode adicionar um endereço',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          HouseholdFormRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Erro ao adicionar uma residência',
            description: 'Todos os campos devem estar selecionados',
          });
        }
      }
    },
    [addToast, token, dispatch],
  );

  return (
    <StyledForm ref={HouseholdFormRef} onSubmit={handleHouseholdSubmit} >
      <Section>
        <Label>
          <span>D1 - Localização do domicílio</span>
          <Select name="location_of_residence" options={locationOptions} />
        </Label>
        <Label>D2 - A pessoa entrevistada é moradora em situação de rua?</Label>
        < Select name="homeless" options={homelessOptions} />
        <Label>D3 - A moradia está localizada em território de povos e comunidades tradicionais?</Label>
        < Select
          name="traditional_peoples"
          options={traditionalPeoplesOptions}
          onChange={selectedOption => setTraditional(selectedOption)}
        />
        <Label>D4 - Qual comunidade tradicional ou povos?</Label>
        < Select
          name="which_traditional_peoples"
          options={whichTraditionalPeoplesOptions}
          isDisabled={traditional?.value === 'true' ? false : true}
        />
        <Label>D5 - Você é a pessoa de referência da sua casa (chefe da casa)?</Label>
        < Select
          name="household_main_person"
          options={yesOrNoOptions}
          onChange={selectedOption => setMainPerson(selectedOption)}
        />


        {mainPerson?.value === 'false' ?
          (
            <>
              <Label>D6 - Qual a idade da pessoa de referência?</Label>
              <Input
                placeholder="Idade"
                type="number"
                min="18"
                max="110"
                name="main_person_age"
              />
            </>
          ) : null}

        <Label>D7 - Qual o sexo da pessoa de referência?</Label>
        < Select
          name="main_person_gender"
          options={mainPersonGenderOptions}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>D8 - Como você define a raça ou cor da pessoa de referência?</Label>
        < Select name="race_color" options={raceOptions} isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false} />

        <Label>D9 - A pessoa de referência sabe ler e escrever?</Label>
        < Select name="literacy" options={LiteracyOptions} isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false} />

        <Label>D10 - Até que série (grau) escolar frequentou a pessoa de referência?</Label>
        < Select name="education" options={educationOptions} isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false} />

        <Label>D11 - Qual a situação de trabalho da pessoa de referência?</Label>
        < Select
          name="main_person_work_status"
          options={main_person_work_status}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>D12 - Qual a ocupação da pessoa de referência?</Label>
        < Select
          name="main_person_work_occupation"
          options={main_person_work_occupation}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>D13 - Neste momento qual é o local de trabalho da pessoa de referência?</Label>
        < Select
          name="main_person_work_situation"
          options={main_person_work_situation}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>D14 - No ano de 2020 (entre fevereiro e Dezembro de 2020) você ou algum morador da sua casa teve diagnóstico de
Coronavírus (Covid-19)</Label>
        < Select
          name="covid_2020_household"
          options={yesOrNoOptions}
          onChange={selectedOption => {
            setCovid2020(selectedOption)
          }}
        />

        <Label>D15 - No ano de 2020 vocês perderam alguém (morreu alguém) por Covid-19 que morava nesta casa?</Label>
        < Select
          name="covid_loss"
          options={covidLossOptions}
          isDisabled={covid2020?.value === 'false' ? true : false}
        />

        <Label>D16 - Neste ano de 2021 (de janeiro até hoje) você ou algum morador da sua casa teve diagnóstico de Coronavírus (Covid-19)?</Label>
        < Select
          name="covid_2021_household"
          options={yesOrNoOptions}
          onChange={selectedOption => {
            setCovid2021(selectedOption)
          }}
        />

        <Label>D17 - Neste ano de 2021 (de Janeiro até hoje) vocês perderam alguém (morreu alguém) que morava nesta casa?</Label>
        < Select
          name="covid_loss"
          options={covidLossOptions}
          isDisabled={covid2021?.value === 'false' ? true : false}
        />

        <Label>D18 - Tipo de residência</Label>
        <Select name="type_of_residence" options={typeOfResidenceOptions} />
        <Label>D19 - Qual o número de cômodos na casa incluindo banheiros?</Label>
        <Input
          placeholder="Número de cômodos"
          type="number"
          min="1"
          max="12"
          name="number_of_rooms"
          defaultValue="1"
        />
        <Label>D20 - Qual o material de construção das paredes externas da casa?</Label>
        <Select name="construction_material" options={buildingMaterialOptions} />
        <Label>D21 - Tem acesso à água potável na sua casa?</Label>
        <Select name="drinking_water" options={drinkingWaterOptions} />


        <Label>D22 - Este domicílio tem água suficiente para animais (dessedentação)?</Label>
        <Select name="water_rural_animals" options={yesOrNoOptions} />

        <Label>D23 - Este domicílio tem água suficiente para produção de alimentos?</Label>
        <Select name="water_rural_produce" options={yesOrNoOptions} />


        <Label>D24 - Como é feita a coleta de esgoto na casa?</Label>
        <Select name="sewage" options={sewageOptions} />
        <Label>D25 - Número de pessoas no domicílio</Label>
        <Input
          placeholder="Número de pessoas"
          type="number"
          min="1"
          max="12"
          name="number_of_people_household"
          defaultValue="1"
        />
        <CheckBoxContainer>
          <CheckboxInput
            name="one_person_household"
            options={[{
              id: 'one_person_household',
              value: 'true',
              label: 'D26 - Eu moro sozinho',
            }]}
            onChange={() => setMorePeople(!morePeople)}
          />
        </CheckBoxContainer>
        {morePeople ?

          (
            <>
              <Label>Número de pessoas por faixa de idade:</Label>
              <Label>D27 - Quantos moradores com até 5 anos</Label>
              <Input
                placeholder="Menos de 5 anos - Digitar número"
                name="five_years_old_or_more"
                min="0"
                max="6"
                type="number"

              />
              <Label>D28 - Quantos moradores entre 6 e 18 anos</Label>
              <Input
                placeholder="Entre 6 e 18 anos - Digitar número"
                name="between_6_and_18"
                min="0"
                max="6"
                type="number"

              />
              <Label>D29 - Quantos moradores entre 19 e 59 anos</Label>
              <Input
                placeholder="Entre 19 e 59 anos - Digitar número"
                name="between_19_and_59"
                min="0"
                max="6"
                type="number"

              />
              <Label>D30 - Quantos moradores 60 anos ou mais</Label>
              <Input
                placeholder="Com 60 anos ou mais - Digitar número"
                name="sixty_years_old_or_more"
                min="0"
                max="6"
                type="number"
              />
              <Label>
                D31 - Das pessoas que relacionou antes, quantas você acolheu no momento da pandemia?
              </Label>
              <Select
                name="people_invited"
                options={peopleInvitedToHouseholdOptions}
              />
            </>
          ) : null}
      </Section >

      <Section>
        <Label>
          D32 - Nos últimos 30 dias qual foi a renda familiar? (DE TRABALHO COM CARTEIRA ASSINADA OU NÃO, DE PENSÃO, DE APOSENTADORIAS, DE BENEFÍCIOS COMO O BOLSA FAMÍLIA OU DE OUTROS PROGRAMAS DE TRANSFERÊNCIA DE RENDA, DE SEGURO DESEMPREGO, DE DOAÇÕES OU OUTRAS FORMAS DE RENDA)
        </Label>
        <CheckBoxContainer>
          <CheckboxInput

            name="income_unknown"
            options={[{
              id: 'income_unknown',
              value: 'true',
              label: 'D33 - Não sei informar',
            }]}
            onChange={() => setIncome(!income)}
          />
        </CheckBoxContainer>

        {income ?

          <Input
            icon={FiDollarSign}
            placeholder="D34 - Renda familiar"
            name="family_income"
            type="number"
            min="1"

          />

          : null}

        <Label>
          D35 - Das faixas de renda abaixo, qual aquela que mais se aproxima da renda de sua família: (ATENÇÃO: LER TODAS AS ALTERNATIVAS E MARCAR APENAS UMA)?
      </Label>
        <Select
          name="people_income_range"
          options={peopleIncomeRangeOptions}
        />


        <CheckBoxContainer>
          <Label>
            <span>D36 - Em relação ao trabalho e à renda das pessoas, A PANDEMIA DO CORONAVÍRUS OU COVID-19 levou a: (Pode ter mais de uma resposta) </span>
          </Label>

          <CheckboxInput

            name="job_loss"
            options={[{ id: 'Perda de emprego', value: 'true', label: 'Perda de emprego/trabalho de algum membro da casa' }]}
          />

          <CheckboxInput

            name="salary_reduction"
            options={[{ id: 'reducao_de_renda', value: 'true', label: 'Redução da renda domiciliar (dos moradores da casa)' }]}
          />

          <CheckboxInput

            name="financial_support"
            options={[{ id: 'ajuda_financeira', value: 'true', label: 'Necessidade de ajudar financeiramente algum parente ou amigo' }]}
          />

          <CheckboxInput

            name="debt"
            options={[{ id: 'dividas', value: 'true', label: 'Endividamento de moradores' }]}
          />

          <CheckboxInput

            name="cut_costs"
            options={[{ id: 'corte_de_gastos', value: 'true', label: 'Corte de gastos em despesas essenciais' }]}
          />

          <CheckboxInput

            name="cut_non_essential_costs"
            options={[{ id: 'corte_de_gastos_nao_essenciais', value: 'true', label: 'Corte de gastos em despesas não essenciais' }]}
          />

          <CheckboxInput
            name="ns_nr_work_salary"
            options={[{ id: 'ns_nr', value: 'true', label: 'Não sabe ou não quis responder' }]}
          />

        </CheckBoxContainer>
        <Label><strong>Enfrentamento da INSAN e questões alimentares</strong></Label>

        <Label>
          D37 - Você ou alguém da sua casa está matriculado na educação básica pública (educação infantil, ensino fundamental, ensino médio e educação de jovens e adultos)?
        </Label>
        <Select
          name="matriculado_na_educacao_basica_publica"
          options={yesOrNoOptions}
          onChange={selectedOption => setEduc(selectedOption)}
        />

        <Label>
          D38 - Nos últimos três meses, você ou alguém da sua casa recebeu <b>auxílio referente ao Programa de Alimentação Escolar (PNAE)</b>?
        </Label>
        <Select
          name="government_assistance_program_pnae"
          options={governmentPNAEProgramOptions}
          isDisabled={educ?.value === 'false' || educ?.value === 'ns-nr' ? true : false}
        />

        <Label>
          D39 - Nos últimos três meses, você ou alguém da sua casa tem cadastro no <b>cadastro único do governo</b>?
        </Label>
        <Select
          name="government_assistance_program_cadastro_unico"
          options={governmentProgramOptions}
        />

        <Label>
          D40 - Nos últimos três meses, você ou alguém da sua casa recebeu do programa <b>bolsa família</b>?
        </Label>
        <Select
          name="government_assistance_program_bolsa_familia"
          options={governmentProgramOptions}
        />

        <Label>
          D41 - Nos últimos três meses, você ou alguém da sua casa recebeu ajuda do programa <b>BPC</b>  (Benefício de Prestação Continuada)?
        </Label>
        <Select
          name="government_assistance_program_bpc"
          options={governmentProgramOptions}
        />

        <Label>
          D42 - Nos últimos três meses, você ou alguém da sua casa recebeu <b>pensão por morte do(a) cônjuge</b>?
        </Label>
        <Select
          name="pension"
          options={yesOrNoOptions}
        />

        <Label>
          D43 - Nos últimos três meses, você ou alguém da sua casa recebeu <b>auxílio reclusão</b>?
        </Label>
        <Select
          name="prison_cash_assistance"
          options={yesOrNoOptions}
        />

        <Label>
          D44 - Nos últimos três meses, você ou alguém da sua casa recebeu <b>cesta de alimentos</b>?
        </Label>
        <Select
          name="food_basket_assistance"
          options={yesOrNoOptions}
        />

        <Label>
          D45 - Nos últimos três meses, você ou alguém da sua casa <b>frequentou restaurantes populares</b> para fazer refeições?
        </Label>
        <Select
          name="low_income_restaurants"
          options={yesOrNoOptions}
        />

        <Label>
          D46 - Nos últimos três meses, você ou alguém da sua casa <b>solicitou auxílio emergencial</b> por causa da pandemia do Coronavírus ou Covid-19?
        </Label>

        <Select
          name="covid_cash_assistance"
          options={yesOrNoOptions}
          onChange={selectedOption => {
            setAuxilio(selectedOption)
          }}
        />
        {
          auxilio?.value === 'true' || auxilio === {} ?
            (
              <>
                <Label>D47 - Quantas vezes você ou outra pessoa que mora na sua casa recebeu o auxílio?</Label>
                <Input
                  placeholder="Número de vezes"
                  name="covid_cash_assistance_number_of_times"
                  type="number"
                  min="1"
                />
              </>
            ) :
            null
        }

        <Label>
          D48 - Nos últimos três meses, você ou alguém da sua casa recebeu ajuda <b>de alguma instituição/associação. igreja, amigos, parentes ou outros</b>?
        </Label>

        <Select
          name="charity"
          options={yesOrNoOptions}
          onChange={selectedOption => setAjuda(selectedOption)}
        />

        <Label>
          D49 - Caso você ou alguém da sua casa tenha recebido ajuda <b>ela foi de que forma</b>?
        </Label>

        <Select
          name="type_of_charity"
          options={typeOfrecievedCharityOptions}
          isDisabled={ajuda?.value === 'true' ? false : true}
        />

        <Label>
          D50 - Nos últimos três meses, você ou outra pessoa que mora na sua casa, teve que fazer alguma coisa que causou <b>vergonha, tristeza ou constrangimento</b> para conseguir alimentos?
        </Label>

        <Select
          name="embarassement"
          options={yesOrNoOptions}
        />

        <Label>
          D51 - Na sua casa você <b>produz algum tipo de alimento</b> vegetal ou animal?
        </Label>

        <Select
          name="home_grown"
          options={yesOrNoOptions}
          onChange={selectedOptions => setHomegrown(selectedOptions)}
        />

        <Label>
          D52 - Na sua casa você produz algum desses alimentos <b>para venda</b>?
        </Label>

        <Select
          name="food_for_market"
          options={yesOrNoOptions}
          onChange={selectedOptions => setProduce(selectedOptions)}
          isDisabled={homegrown?.value === 'true' ? false : true}
        />

        <Label>
          D53 - Na sua casa como você divide <b>o alimento que produz para venda</b>?
        </Label>

        <Select
          name="market_profile"
          options={homeGrownSellingFoodOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

        <Label>
          D54 - Nos últimos 3 meses, <b>enfrentou dificuldade para comercialização devido à pandemia</b>?
        </Label>

        <Select
          name="difficulty_selling_food"
          options={FoodSellingOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

        <Label>
          D55 - Nos últimos 3 meses, você <b>precisou consumir, doar, descartar ou fazer outro uso</b> do alimento que pretendia comercializar por conta da pandemia?
        </Label>

        <Select
          name="could_not_sell_food"
          options={yesOrNoOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

      </Section>

      <Section>
        <Label><strong>Escala de Segurança Alimentar</strong></Label>
        <Label>
          D56 - NOS ÚLTIMOS TRÊS MESES, OS MORADORES DO SEU DOMICÍLIO TIVERAM A <b>PREOCUPAÇÃO DE QUE OS ALIMENTOS ACABASSEM</b> ANTES DE PODER COMPRAR OU RECEBER MAIS COMIDA?
        </Label>
        <Select
          name="worried_food_supply"
          options={worriedWithFoodSupplyOptions}
        />
        <Label>
          D57 - NOS ÚLTIMOS TRÊS MESES, <b>OS ALIMENTOS ACABARAM</b> ANTES QUE OS MORADORES DO SEU DOMICÍLIO TIVESSEM DINHEIRO PARA COMPRAR MAIS COMIDA?
        </Label>
        <Select
          name="lack_food_supply"
          options={LackOfFoodOptions}
        />
        <Label>
          D58 - NOS ÚLTIMOS TRÊS MESES OS MORADORES DO SEU DOMICÍLIO FICARAM SEM DINHEIRO PARA TER UMA <b>ALIMENTAÇÃO SAUDÁVEL E VARIADA</b>?
        </Label>
        <Select
          name="afford_healthy_food"
          options={cannotAffordFoodOptions}
        />
        <Label>
          D59 - NOS ÚLTIMOS TRÊS MESES, OS MORADORES DO SEU DOMICÍLIO COMERAM APENAS ALGUNS <b>POUCOS TIPOS DE ALIMENTOS</b> QUE AINDA TINHAM PORQUE O DINHEIRO ACABOU?
        </Label>
        <Select
          name="poor_food_choice"
          options={yesOrNoOptions}
        />
        <Label>
          D60 - NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS <b>DEIXOU DE FAZER ALGUMA REFEIÇÃO</b>, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adult_meals"
          options={yesOrNoOptions}
        />
        <Label>
          D61 - NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS <b>COMEU MENOS DO QUE ACHOU QUE DEVIA</b>, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adult_food_privation"
          options={yesOrNoOptions}
        />
        <Label>
          D62 - NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS <b>SENTIU FOME</b>, MAS NÃO COMEU, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adult_hunger"
          options={yesOrNoOptions}
        />
        <Label>
          D63 - NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS FEZ <b>APENAS UMA REFEIÇÃO AO DIA OU FICOU UM DIA INTEIRO SEM COMER</b> PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adult_one_meal_or_none"
          options={yesOrNoOptions}
        />
        <Label><strong></strong></Label>
        <Label>
          D64 - Nos últimos 3 meses, na maioria das vezes <b>de que forma você e as pessoas da sua casa</b> estão adquirindo os alimentos?
        </Label>
        <Select
          name="how_food_is_obtained"
          options={howFoodIsObtainedOptions}
        />
        <Label>
          D65 - Nos últimos 3 meses, <b>observou alguma alteração nos preços</b> dos alimentos que costuma comprar?
        </Label>
        <Select
          name="food_price_change"
          options={FoodPriceOptions}
          onChange={selectedOption => setBuyingProfile(selectedOption)}
        />

        <Label>
          D66 - A mudança alterou <b>o seu perfil de compra</b> dos alimentos?
        </Label>
        <Select
          name="food_profile_change"
          options={FoodProfileOptions}
          isDisabled={buyingProfile?.value === 'nao' || buyingProfile?.value === 'ns-nr' ? true : false}
        />

        <Label>
          D67 - Nos últimos 3 meses, <b>qual foi o tipo de estabelecimento</b> que você ou alguém da sua casa mais frequentou para fazer as compras?
        </Label>
        <Select
          name="food_store_type"
          options={FoodStoreOptions}
        />

        <Label>
          D68 - Nos últimos 3 meses, considera que <b>as despesas/gastos semanais</b> com alimentação mudaram na sua casa?
        </Label>
        <Select
          name="food_expenditure"
          options={FoodExpenditureOptions}
        />

        <Label><strong>Agora queremos saber mais sobre a sua alimentação</strong></Label>

        <Label>D69 - Ontem você comeu:</Label>
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
              label: 'Leite',
            }]}
          />

          <CheckboxInput

            name="hambúrguer_embutidos"
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

            name="macarrao-instantaneo_salgadinhos-de-pacote_biscoitos-salgados"
            options={[{
              id: 'Macarrão instantâneo, salgadinhos de pacote ou biscoitos salgados',
              value: 'true',
              label: 'Macarrão instantâneo, salgadinhos de pacote ou biscoitos salgados',
            }]}
          />

          <CheckboxInput

            name="biscoito-recheado_doces_guloseimas"
            options={[{
              id: 'Biscoito recheado, doces ou guloseimas',
              value: 'true',
              label: 'Biscoito recheado, doces ou guloseimas (balas, pirulitos, chiclete, caramelo, gelatina)',
            }]}
          />


        </CheckBoxContainer>

        <Button>Submit</Button>
      </Section>
    </StyledForm >
  );

}

export default HouseholdForm;


