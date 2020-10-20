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
  referencePersonGenderOptions

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

  const [produce, setProduce] = useState<OptionTypeBase | undefined | null>({});

  const [buyingProfile, setBuyingProfile] = useState<OptionTypeBase | undefined | null>({});

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
          <span>Localização do domicílio</span>
          <Select name="location_of_residence" options={locationOptions} />
        </Label>
        <Label>A pessoa entrevistada é moradora em situação de rua?</Label>
        < Select name="homeless" options={homelessOptions} />
        <Label>A moradia está localizada em território de povos e comunidades tradicionais?</Label>
        < Select
          name="traditional_peoples"
          options={traditionalPeoplesOptions}
          onChange={selectedOption => setTraditional(selectedOption)}
        />
        <Label>Qual comunidade tradicional ou povos?</Label>
        < Select
          name="which_traditional_peoples"
          options={whichTraditionalPeoplesOptions}
          isDisabled={traditional?.value === 'true' ? false : true}
        />
        <Label>Você é a pessoa de referência da sua casa (chefe da casa)?</Label>
        < Select
          name="household_main_person"
          options={yesOrNoOptions}
          onChange={selectedOption => setMainPerson(selectedOption)}
        />

        <Label>Qual o sexo da pessoa de referência?</Label>
        < Select
          name="reference_person_gender"
          options={referencePersonGenderOptions}
          isDisabled={mainPerson?.value === 'true' || mainPerson?.value === 'ns-nr' ? true : false}
        />

        <Label>Tipo de residência</Label>
        <Select name="type_of_residence" options={typeOfResidenceOptions} />
        <Label>Qual o número de cômodos na casa incluindo banheiros?</Label>
        <Input
          placeholder="Número de cômodos"
          type="number"
          min="1"
          max="12"
          name="number_of_rooms"
          defaultValue="1"
        />
        <Label>Qual o material de construção das paredes externas da casa?</Label>
        <Select name="construction_material" options={buildingMaterialOptions} />
        <Label>Tem acesso à água potável na sua casa?</Label>
        <Select name="drinking_water" options={drinkingWaterOptions} />
        <Label>Como é feita a coleta de esgoto na casa?</Label>
        <Select name="sewage" options={sewageOptions} />
        <Label>Número de pessoas no domicílio</Label>
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
              label: 'Eu moro sozinho',
            }]}
            onChange={() => setMorePeople(!morePeople)}
          />
        </CheckBoxContainer>
        {morePeople ?

          (
            <>
              <Label>Quantos moradores com até 5 anos</Label>
              <Input
                placeholder="Menos de 5 anos"
                name="five_years_old_or_more"
                min="0"
                max="6"
                type="number"

              />
              <Label>Quantos moradores entre 6 e 18 anos</Label>
              <Input
                placeholder="Entre 6 e 18 anos"
                name="between_6_and_18"
                min="0"
                max="6"
                type="number"

              />
              <Label>Quantos moradores entre 19 e 59 anos</Label>
              <Input
                placeholder="Entre 19 e 59 anos"
                name="between_19_and_59"
                min="0"
                max="6"
                type="number"

              />
              <Label>Quantos moradores 60 anos ou mais</Label>
              <Input
                placeholder="Com 60 anos ou mais"
                name="sixty_years_old_or_more"
                min="0"
                max="6"
                type="number"
              />
              <Label>
                Das pessoas que relacionou antes, quantas você acolheu no momento da pandemia?
              </Label>
              <Select
                name="people_invited"
                options={peopleInvitedToHouseholdOptions}
                onChange={() => { }}
              />
            </>
          ) : null}
      </Section >

      <Section>
        <Label>
          Nos últimos 30 dias qual foi a renda familiar? (DE TRABALHO COM CARTEIRA ASSINADA OU NÃO, DE PENSÃO, DE APOSENTADORIAS, DE BENEFÍCIOS COMO O BOLSA FAMÍLIA OU DE OUTROS PROGRAMAS DE TRANSFERÊNCIA DE RENDA, DE SEGURO DESEMPREGO, DE DOAÇÕES OU OUTRAS FORMAS DE RENDA)
        </Label>
        <CheckBoxContainer>
          <CheckboxInput

            name="income_unknown"
            options={[{
              id: 'income_unknown',
              value: 'true',
              label: 'Não sei informar',
            }]}
            onChange={() => setIncome(!income)}
          />
        </CheckBoxContainer>
        {income ? <Input
          icon={FiDollarSign}
          placeholder="Renda familiar"
          name="family_income"
          type="number"
          min="1"

        /> : null}
        <CheckBoxContainer>
          <Label>
            <span>Em relação ao trabalho e à renda das pessoas, A PANDEMIA DO CORONAVÍRUS OU COVID-19 levou a: (Pode ter mais de uma resposta) </span>
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
          Nos últimos três meses, você ou alguém da sua casa tem cadastro no <b>cadastro único do governo</b>?
        </Label>
        <Select
          name="government_assistance_program_cadastro_unico"
          options={governmentProgramOptions}
        />

        <Label>
          Nos últimos três meses, você ou alguém da sua casa recebeu do programa <b>bolsa família</b>?
        </Label>
        <Select
          name="government_assistance_program_bolsa_familia"
          options={governmentProgramOptions}
        />

        <Label>
          Nos últimos três meses, você ou alguém da sua casa recebeu ajuda do programa <b>BPC</b>  (Benefício de Prestação Continuada)?
        </Label>
        <Select
          name="government_assistance_program_bpc"
          options={governmentProgramOptions}
        />

        <Label>
          Nos últimos três meses, você ou alguém da sua casa recebeu <b>pensão por morte do(a) cônjuge</b>?
        </Label>
        <Select
          name="pension"
          options={yesOrNoOptions}
        />

        <Label>
          Nos últimos três meses, você ou alguém da sua casa recebeu <b>auxílio reclusão</b>?
        </Label>
        <Select
          name="prison_cash_assistance"
          options={yesOrNoOptions}
        />

        <Label>
          Nos últimos três meses, você ou alguém da sua casa recebeu <b>auxílio referente à alimentação escolar ou PNAE</b>?
        </Label>
        <Select
          name="government_assistance_program_pnae"
          options={governmentPNAEProgramOptions}
        />

        <Label>
          Nos últimos três meses, você ou alguém da sua casa recebeu <b>cesta de alimentos</b>?
        </Label>
        <Select
          name="food_basket_assistance"
          options={yesOrNoOptions}
        />

        <Label>
          Nos últimos três meses, você ou alguém da sua casa <b>frequentou restaurantes populares</b> para fazer refeições?
        </Label>
        <Select
          name="low_income_restaurants"
          options={yesOrNoOptions}
        />

        <Label>
          Nos últimos três meses, você ou alguém da sua casa <b>solicitou auxílio emergencial</b> por causa da pandemia do Coronavírus ou Covid-19?
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
                <Label>Quantas vezes você ou outra pessoa que mora na sua casa recebeu o auxílio?</Label>
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
          Nos últimos três meses, você ou alguém da sua casa recebeu ajuda <b>de alguma instituição/associação. igreja, amigos, parentes ou outros</b>?
        </Label>

        <Select
          name="charity"
          options={yesOrNoOptions}
          onChange={selectedOption => setAjuda(selectedOption)}
        />

        <Label>
          Caso você ou alguém da sua casa tenha recebido ajuda <b>ela foi de que forma</b>?
        </Label>

        <Select
          name="type_of_charity"
          options={typeOfrecievedCharityOptions}
          isDisabled={ajuda?.value === 'true' ? false : true}
        />

        <Label>
          Nos últimos três meses, você ou outra pessoa que mora na sua casa, teve que fazer alguma coisa que causou <b>vergonha, tristeza ou constrangimento</b> para conseguir alimentos?
        </Label>

        <Select
          name="embarassement"
          options={yesOrNoOptions}
        />

        <Label>
          Na sua casa você <b>produz algum tipo de alimento</b> vegetal ou animal?
        </Label>

        <Select
          name="home_grown"
          options={yesOrNoOptions}
          onChange={selectedOptions => setProduce(selectedOptions)}
        />

        <Label>
          Na sua casa você produz algum desses alimentos <b>para venda</b>?
        </Label>

        <Select
          name="food_for_market"
          options={yesOrNoOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

        <Label>
          Na sua casa como você divide <b>o alimento que produz para venda</b>?
        </Label>

        <Select
          name="market_profile"
          options={homeGrownSellingFoodOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

        <Label>
          Nos últimos 3 meses, <b>enfrentou dificuldade para comercialização devido à pandemia</b>?
        </Label>

        <Select
          name="difficulty_selling_food"
          options={FoodSellingOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

        <Label>
          Nos últimos 3 meses, você <b>precisou consumir, doar, descartar ou fazer outro uso</b> do alimento que pretendia comercializar por conta da pandemia?
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
          NOS ÚLTIMOS TRÊS MESES, OS MORADORES DO SEU DOMICÍLIO TIVERAM A <b>PREOCUPAÇÃO DE QUE OS ALIMENTOS ACABASSEM</b> ANTES DE PODER COMPRAR OU RECEBER MAIS COMIDA?
        </Label>
        <Select
          name="worried_food_supply"
          options={worriedWithFoodSupplyOptions}
        />
        <Label>
          NOS ÚLTIMOS TRÊS MESES, <b>OS ALIMENTOS ACABARAM</b> ANTES QUE OS MORADORES DO SEU DOMICÍLIO TIVESSEM DINHEIRO PARA COMPRAR MAIS COMIDA?
        </Label>
        <Select
          name="lack_food_supply"
          options={LackOfFoodOptions}
        />
        <Label>
          NOS ÚLTIMOS TRÊS MESES OS MORADORES DO SEU DOMICÍLIO FICARAM SEM DINHEIRO PARA TER UMA <b>ALIMENTAÇÃO SAUDÁVEL E VARIADA</b>?
        </Label>
        <Select
          name="afford_healthy_food"
          options={cannotAffordFoodOptions}
        />
        <Label>
          NOS ÚLTIMOS TRÊS MESES, OS MORADORES DO SEU DOMICÍLIO COMERAM APENAS ALGUNS <b>POUCOS TIPOS DE ALIMENTOS</b> QUE AINDA TINHAM PORQUE O DINHEIRO ACABOU?
        </Label>
        <Select
          name="poor_food_choice"
          options={yesOrNoOptions}
        />
        <Label>
          NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS <b>DEIXOU DE FAZER ALGUMA REFEIÇÃO</b>, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adult_meals"
          options={yesOrNoOptions}
        />
        <Label>
          NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS <b>COMEU MENOS DO QUE ACHOU QUE DEVIA</b>, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adult_food_privation"
          options={yesOrNoOptions}
        />
        <Label>
          NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS <b>SENTIU FOME</b>, MAS NÃO COMEU, PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adult_hunger"
          options={yesOrNoOptions}
        />
        <Label>
          NOS ÚLTIMOS TRÊS MESES, ALGUM MORADOR DE 18 ANOS OU MAIS FEZ <b>APENAS UMA REFEIÇÃO AO DIA OU FICOU UM DIA INTEIRO SEM COMER</b> PORQUE NÃO HAVIA DINHEIRO PARA COMPRAR COMIDA?
        </Label>
        <Select
          name="adult_one_meal_or_none"
          options={yesOrNoOptions}
        />
        <Label><strong></strong></Label>
        <Label>
          Nos últimos 3 meses, na maioria das vezes <b>de que forma você e as pessoas da sua casa</b> estão adquirindo os alimentos?
        </Label>
        <Select
          name="how_food_is_obtained"
          options={howFoodIsObtainedOptions}
        />
        <Label>
          Nos últimos 3 meses, <b>observou alguma alteração nos preços</b> dos alimentos que costuma comprar?
        </Label>
        <Select
          name="food_price_change"
          options={FoodPriceOptions}
          onChange={selectedOption => setBuyingProfile(selectedOption)}
        />

        <Label>
          A mudança alterou <b>o seu perfil de compra</b> dos alimentos?
        </Label>
        <Select
          name="food_profile_change"
          options={FoodProfileOptions}
          isDisabled={buyingProfile?.value === 'nao' || buyingProfile?.value === 'ns-nr' ? true : false}
        />

        <Label>
          Nos últimos 3 meses, <b>qual foi o tipo de estabelecimento</b> que você ou alguém da sua casa mais frequentou para fazer as compras?
        </Label>
        <Select
          name="food_store_type"
          options={FoodStoreOptions}
        />

        <Label>
          Nos últimos 3 meses, considera que <b>as despesas/gastos semanais</b> com alimentação mudaram na sua casa?
        </Label>
        <Select
          name="food_expenditure"
          options={FoodExpenditureOptions}
        />

        <Label><strong>Agora queremos saber mais sobre a sua alimentação</strong></Label>

        <Label>Você comeu algum dos alimentos listados abaixo ontem?</Label>
        <CheckBoxContainer>
          <CheckboxInput

            name="alface_acelga_repolho"

            options={[{
              id: 'alface, acelga ou repolho',
              value: 'true',
              label: 'Alface, acelga ou repolho',
            }]}

          />

          <CheckboxInput

            name="couve_brocolis_almeirao_agriao_espinafre"
            options={[{
              id: 'couve, brocolis, almeirao, agriao ou espinafre',
              value: 'true',
              label: 'Couve, brócolis, almeirão, agrião ou espinafre',
            }]}
          />

          <CheckboxInput

            name="abobora_cenoura_batata_doce_quiabo_caruru"
            options={[{
              id: 'abobora, cenoura, batata-doce ou quiabo/caruru',
              value: 'true',
              label: 'Abóbora, cenoura, batata-doce ou quiabo/caruru',
            }]}
          />

          <CheckboxInput

            name="mamao_manga_melaoamarelo_caqui_pequi"
            options={[{
              id: 'mamao, manga, melao amarelo, caqui ou pequi',
              value: 'true',
              label: 'Mamão, manga, melão amarelo, caqui ou pequi',
            }]}
          />

          <CheckboxInput

            name="tomate_pepino_abobrinha_berinjela_chuchu_beterraba"
            options={[{
              id: 'tomate, pepino, abobrinha, berinjela, chuchu ou beterraba',
              value: 'true',
              label: 'Tomate, pepino, abobrinha, berinjela, chuchu ou beterraba',
            }]}
          />

          <CheckboxInput

            name="laranja_banana_maca_abacaxi"
            options={[{
              id: 'laranja, banana, maçã ou abacaxi ',
              value: 'true',
              label: 'Laranja, banana, maçã ou abacaxi',
            }]}
          />

          <CheckboxInput

            name="arroz_macarrao_polenta_cuscuz_milho_verde"
            options={[{
              id: 'arroz, macarrao, polenta, cuscuz ou milho verde',
              value: 'true',
              label: 'Arroz, macarrão, polenta, cuscuz ou milho verde ',
            }]}
          />

          <CheckboxInput

            name="feijao_ervilha_lentilha_grao_de_bico"
            options={[{
              id: 'feijao, ervilha, lentilha ou grao de bico',
              value: 'true',
              label: 'Feijão, ervilha, lentilha ou grão de bico',
            }]}
          />

          <CheckboxInput

            name="batata_comum_mandioca_cara_inhame"
            options={[{
              id: 'batata comum, mandioca, cara ou inhame',
              value: 'true',
              label: 'Batata comum, mandioca, cará ou inhame',
            }]}
          />

          <CheckboxInput

            name="carne_de_boi_porco_frango_peixe"
            options={[{
              id: 'carne-de-boi_porco_frango_peixe',
              value: 'true',
              label: 'Carne de boi, porco, frango ou peixe',
            }]}
          />

          <CheckboxInput

            name="ovo_frito_cozido_mexido"
            options={[{
              id: 'ovo frito, cozido ou mexido',
              value: 'true',
              label: 'Ovo frito, cozido ou mexido',
            }]}
          />

          <CheckboxInput

            name="leite"
            options={[{
              id: 'leite   ',
              value: 'true',
              label: 'Leite',
            }]}
          />

          <CheckboxInput

            name="amendoim_castanha_de_caju_ou_castanha_do_brasil_para"
            options={[{
              id: 'Amendoim, castanha de caju ou castanha do Brasil/ Para',
              value: 'true',
              label: 'Amendoim, castanha de caju ou castanha do Brasil/ Pará',
            }]}
          />
        </CheckBoxContainer>

        <Label>Você comeu algum dos alimentos <em>industrializados</em> listados abaixo ontem?</Label>
        <CheckBoxContainer>
          <CheckboxInput

            name="soft_drink"
            options={[{
              id: 'refrigerante',
              value: 'true',
              label: 'Refrigerante',
            }]}
          />

          <CheckboxInput

            name="juice_can_or_box"
            options={[{
              id: 'suco de fruta em caixa, caixinha, lata (como Del Valle ou Tropicana)',
              value: 'true',
              label: 'Suco de fruta em caixa, caixinha, lata (como Del Valle® ou Tropicana®)',
            }]}
          />

          <CheckboxInput

            name="juice_powder"
            options={[{
              id: 'Refresco em po (como Tang ou Ki suco)',
              value: 'true',
              label: 'Refresco em pó (como Tang® ou Ki suco®)',
            }]}
          />

          <CheckboxInput

            name="chocolate_beverage"
            options={[{
              id: 'bebida achocolatada (como Toddynho ou Toddy)',
              value: 'true',
              label: 'Bebida achocolatada (como Toddynho® ou Toddy®)',
            }]}
          />

          <CheckboxInput

            name="flavored_yogurt"
            options={[{
              id: 'iogurte com sabor',
              value: 'true',
              label: 'Iogurte com sabor',
            }]}
          />

          <CheckboxInput

            name="salty_snacks"
            options={[{
              id: 'Salgadinho de pacote (ou chips) ou biscoito/bolacha salgado ',
              value: 'true',
              label: 'Salgadinho de pacote (ou chips) ou biscoito/bolacha salgado ',
            }]}
          />

          <CheckboxInput

            name="cookies"
            options={[{
              id: 'biscoito/bolacha doce, biscoito recheado ou bolinho de pacote',
              value: 'true',
              label: 'Biscoito/bolacha doce, biscoito recheado ou bolinho de pacote',
            }]}
          />

          <CheckboxInput

            name="industrialized_dessert"
            options={[{
              id: 'chocolate, sorvete, gelatina, ou outra sobremesa industrializada',
              value: 'true',
              label: 'Chocolate, sorvete, gelatina, ou outra sobremesa industrializada',
            }]}
          />

          <CheckboxInput

            name="sausages"
            options={[{
              id: 'salsicha, linguiça, mortadela ou presunto',
              value: 'true',
              label: 'Salsicha, linguiça, mortadela ou presunto',
            }]}
          />

          <CheckboxInput

            name="hot_dog_or_burguer_bread"
            options={[{
              id: 'Pao de forma, de cachorro quente ou de hamburguer',
              value: 'true',
              label: 'Pão de forma, de cachorro quente ou de hambúrguer',
            }]}
          />

          <CheckboxInput

            name="mayonnaise_ketchup_mustard"
            options={[{
              id: 'maionese, ketchup ou mostarda',
              value: 'true',
              label: 'Maionese, ketchup ou mostarda',
            }]}
          />

          <CheckboxInput

            name="margarine"
            options={[{
              id: 'margarina',
              value: 'true',
              label: 'Margarina',
            }]}
          />

          <CheckboxInput

            name="instant_noodles_or_soup_or_frozen_food"
            options={[{
              id: 'Macarrao instantaneo (como miojo ou cup noodles), sopa de pacote, lasanha congelada ou outro prato pronto comprado congelado',
              value: 'true',
              label: 'Macarrão instantâneo (como miojo ou cup noodles), sopa de pacote, lasanha congelada ou outro prato pronto comprado congelado',
            }]}
          />
        </CheckBoxContainer>



        <Button>Submit</Button>
      </Section>
    </StyledForm >
  );

}

export default HouseholdForm;


