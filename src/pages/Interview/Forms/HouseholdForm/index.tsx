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
  FiUsers
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
  mainPersonOptions,
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
  poorFoodChoiceOptions,
  yesOrNoOptions,
  yesOrNoPlainOptions,
  governmentProgramOptions,
  governmentPNAEProgramOptions,
  governmentCovidProgramOptions,
  typeOfrecievedCharityOptions,
  embarassementOptions,
  homeGrownSellingFoodOptions,
  FoodSellingOptions,
  howFoodIsObtainedOptions,
  FoodPriceOptions,
  FoodStoreOptions,
  FoodProfileOptions,
  FoodExpenditureOptions,
  researchStatusOptions,
  interviewTypeOptions

} from '../../questions/SelectorOptions/options';

import api from '../../../../services/api';
import CheckBoxInput from '../../../../components/Checkbox';
import RadioInput from '../../../../components/RadioInput';

const HouseholdForm: React.FC = (props) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const [traditional, setTraditional] = useState<OptionTypeBase | undefined | null>({});

  const [income, setIncome] = useState(true);

  const [morePeople, setMorePeople] = useState(true);

  const [auxilio, setAuxilio] = useState<OptionTypeBase | undefined | null>({});

  const [ajuda, setAjuda] = useState<OptionTypeBase | undefined | null>({});

  const [produce, setProduce] = useState<OptionTypeBase | undefined | null>({});

  const [buyingProfile, setBuyingProfile] = useState<OptionTypeBase | undefined | null>({});

  // All checkboxes
  const [alface, setAlface] = useState(false);

  const HouseholdFormRef = useRef<FormHandles>(null);

  const handleHouseholdSubmit = useCallback(
    async (data: ICreateHouseholdDTO) => {
      try {
        HouseholdFormRef.current?.setErrors({});
        const validatedData = await HouseholdValidation.validate(data, {
          abortEarly: false,
        });

        const person_id = localStorage.getItem('@Safety:person_id');

        const household = {
          person_id,
          ...validatedData,
        };

        console.log('household', household);

        const response = await api.post('/household', household, {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.setItem('@Safety:household_id', response.data.id);
        console.log(response);
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
    [addToast, token],
  );

  return (
    <StyledForm ref={HouseholdFormRef} onSubmit={handleHouseholdSubmit}>
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
          name="traditional_peoples"
          options={whichTraditionalPeoplesOptions}
          isDisabled={traditional?.value === 'true' ? false : true}
        />
        <Label>
          <span>É a pessoa de referência da casa (chefe da casa)?</span>
          <Select
            name="household_main_person"
            options={mainPersonOptions}
          />
        </Label>
        <Label>Tipo de residência</Label>
        <Select name="type_of_residence" options={typeOfResidenceOptions} />
        <Label>Qual o número de cômodos na casa incluindo banheiros?</Label>
        <Input
          placeholder="Número de cômodos"
          type="number"
          min="0"
          max="6"
          name="number_of_rooms"
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
          min="0"
          max="12"
          name="number_of_people_household"
        />
        <CheckBoxContainer>
          <CheckBoxInput
            name="one_person_household"
            options={[{
              id: 'one_person_household',
              value: 'one_person_household',
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
                name="5_anos_ou_menos"
                type="number"
              />
              <Label>Quantos moradores entre 6 e 18 anos</Label>
              <Input
                placeholder="Entre 6 e 18 anos"
                name="entre_6_e_18"
                type="number"
              />
              <Label>Quantos moradores entre 19 e 59 anos</Label>
              <Input
                placeholder="Entre 19 e 59 anos"
                name="entre_19_e_59"
                type="number"
              />
              <Label>Quantos moradores 60 anos ou mais</Label>
              <Input
                placeholder="Com 60 anos ou mais"
                name="60_anos_ou_mais"
                type="number"
              />
            </>
          ) : null}
        <Label>
          Das pessoas que relacionou antes, quantas você acolheu no momento da pandemia?
        </Label>
        <Select
          name="pessoas_acolhidas"
          options={peopleInvitedToHouseholdOptions}
          onChange={() => { }}
        />
        <Label><strong>Você comeu algum dos alimentos listados abaixo ontem?</strong></Label>
        <CheckBoxContainer>
          <CheckBoxInput
            name="alface_acelga_repolho"

            options={[{
              id: 'alface, acelga ou repolho',
              value: 'true',
              label: 'Alface, acelga ou repolho',
            }]}

          />

          <CheckBoxInput
            name="couve_brocolis_almeirao_agriao_espinafre"
            options={[{
              id: 'couve, brocolis, almeirao, agriao ou espinafre',
              value: 'true',
              label: 'Couve, brócolis, almeirão, agrião ou espinafre',
            }]}
          />

          <CheckBoxInput
            name="abobora_cenoura_batata-doce_quiabo_caruru"
            options={[{
              id: 'abobora, cenoura, batata-doce ou quiabo/caruru',
              value: 'true',
              label: 'Abóbora, cenoura, batata-doce ou quiabo/caruru',
            }]}
          />

          <CheckBoxInput
            name="mamao_manga_melao-amarelo_caqui_pequi"
            options={[{
              id: 'mamao, manga, melao amarelo, caqui ou pequi',
              value: 'true',
              label: 'Mamão, manga, melão amarelo, caqui ou pequi',
            }]}
          />

          <CheckBoxInput
            name="tomate_pepino_abobrinha_berinjela_chuchu_beterraba"
            options={[{
              id: 'tomate, pepino, abobrinha, berinjela, chuchu ou beterraba',
              value: 'true',
              label: 'Tomate, pepino, abobrinha, berinjela, chuchu ou beterraba',
            }]}
          />

          <CheckBoxInput
            name="laranja_banana_maca_abacaxi "
            options={[{
              id: 'laranja, banana, maçã ou abacaxi ',
              value: 'true',
              label: 'Laranja, banana, maçã ou abacaxi',
            }]}
          />

          <CheckBoxInput
            name="arroz_macarrao_polenta_cuscuz_milho-verde"
            options={[{
              id: 'arroz, macarrao, polenta, cuscuz ou milho verde',
              value: 'true',
              label: 'Arroz, macarrão, polenta, cuscuz ou milho verde ',
            }]}
          />

          <CheckBoxInput
            name="feijao_ervilha_lentilha_grao-de-bico"
            options={[{
              id: 'feijao, ervilha, lentilha ou grao de bico',
              value: 'true',
              label: 'Feijão, ervilha, lentilha ou grão de bico',
            }]}
          />

          <CheckBoxInput
            name="batata-comum_mandioca_cara_inhame"
            options={[{
              id: 'batata comum, mandioca, cara ou inhame',
              value: 'true',
              label: 'Batata comum, mandioca, cará ou inhame',
            }]}
          />

          <CheckBoxInput
            name="carne-de-boi_porco_frango_peixe"
            options={[{
              id: 'carne-de-boi_porco_frango_peixe',
              value: 'true',
              label: 'Carne de boi, porco, frango ou peixe',
            }]}
          />

          <CheckBoxInput
            name="ovo-frito_cozido_mexido"
            options={[{
              id: 'ovo frito, cozido ou mexido',
              value: 'true',
              label: 'Ovo frito, cozido ou mexido',
            }]}
          />

          <CheckBoxInput
            name="Leite"
            options={[{
              id: 'leite   ',
              value: 'true',
              label: 'Leite',
            }]}
          />

          <CheckBoxInput
            name="Leite"
            options={[{
              id: '',
              value: 'true',
              label: 'Amendoim, castanha de caju ou castanha do Brasil/ Pará',
            }]}
          />
        </CheckBoxContainer>

        <Label><strong>Você comeu algum dos alimentos <em>industrializados</em> listados abaixo ontem?</strong></Label>
        <CheckBoxContainer>
          <CheckBoxInput
            name="refrigerante"
            options={[{
              id: 'refrigerante',
              value: 'true',
              label: 'Refrigerante',
            }]}
          />

          <CheckBoxInput
            name="suco-de-fruta-em-caixa_caixinha_lata-(como_Del_Valle_ou_Tropicana)"
            options={[{
              id: 'suco de fruta em caixa, caixinha, lata (como Del Valle ou Tropicana)',
              value: 'true',
              label: 'Suco de fruta em caixa, caixinha, lata (como Del Valle® ou Tropicana®)',
            }]}
          />

          <CheckBoxInput
            name="Refresco-em-po-(como-Tang-ou-Ki-suco)"
            options={[{
              id: 'Refresco em po (como Tang ou Ki suco)',
              value: 'true',
              label: 'Refresco em pó (como Tang® ou Ki suco®)',
            }]}
          />

          <CheckBoxInput
            name="Bebida-achocolatada-(como-Toddynho-ou-Toddy)"
            options={[{
              id: 'bebida achocolatada (como Toddynho ou Toddy)',
              value: 'true',
              label: 'Bebida achocolatada (como Toddynho® ou Toddy®)',
            }]}
          />

          <CheckBoxInput
            name="iogurte-com-sabor"
            options={[{
              id: 'iogurte com sabor',
              value: 'true',
              label: 'Iogurte com sabor',
            }]}
          />

          <CheckBoxInput
            name="salgadinho-de-pacote-(ou-chips)_biscoito/bolacha-salgado "
            options={[{
              id: 'Salgadinho de pacote (ou chips) ou biscoito/bolacha salgado ',
              value: 'true',
              label: 'Salgadinho de pacote (ou chips) ou biscoito/bolacha salgado ',
            }]}
          />

          <CheckBoxInput
            name="biscoito/bolacha-doce_biscoito-recheado_bolinho-de-pacote"
            options={[{
              id: 'biscoito/bolacha doce, biscoito recheado ou bolinho de pacote',
              value: 'true',
              label: 'Biscoito/bolacha doce, biscoito recheado ou bolinho de pacote',
            }]}
          />

          <CheckBoxInput
            name="chocolate_sorvete_gelatina_outra-sobremesa-industrializada"
            options={[{
              id: 'chocolate, sorvete, gelatina, ou outra sobremesa industrializada',
              value: 'true',
              label: 'Chocolate, sorvete, gelatina, ou outra sobremesa industrializada',
            }]}
          />

          <CheckBoxInput
            name="salsicha_linguica_mortadela_presunto"
            options={[{
              id: 'salsicha, linguiça, mortadela ou presunto',
              value: 'true',
              label: 'Salsicha, linguiça, mortadela ou presunto',
            }]}
          />

          <CheckBoxInput
            name="Pao-de-forma_pao-de-cachorro-quente_pao-de-hamburguer "
            options={[{
              id: 'Pao de forma, de cachorro quente ou de hamburguer',
              value: 'true',
              label: 'Pão de forma, de cachorro quente ou de hambúrguer',
            }]}
          />

          <CheckBoxInput
            name="maionese_ketchup_mostarda"
            options={[{
              id: 'maionese, ketchup ou mostarda',
              value: 'true',
              label: 'Maionese, ketchup ou mostarda',
            }]}
          />

          <CheckBoxInput
            name="margarina"
            options={[{
              id: 'margarina',
              value: 'true',
              label: 'Margarina',
            }]}
          />

          <CheckBoxInput
            name="Macarrao-instantaneo-(como-miojo_cup-noodles)_sopa-de-pacote_lasanha-congelada_outro-prato-pronto-comprado-congelado"
            options={[{
              id: 'Macarrao instantaneo (como miojo ou cup noodles), sopa de pacote, lasanha congelada ou outro prato pronto comprado congelado',
              value: 'true',
              label: 'Macarrão instantâneo (como miojo ou cup noodles), sopa de pacote, lasanha congelada ou outro prato pronto comprado congelado',
            }]}
          />
        </CheckBoxContainer>
      </Section >

      <Section>

        <Label>
          Você ou alguém da sua casa está cadastrado no <b>cadastro único do governo</b>?
        </Label>
        <Select
          name="cadastro_unico"
          options={governmentProgramOptions}
        />

        <Label>
          Você ou alguém da sua casa participa do programa <b>bolsa família</b>?
        </Label>
        <Select
          name="bolsa_familia"
          options={governmentProgramOptions}
        />

        <Label>
          Você ou alguém da sua casa recebe ajuda do programa <b>BPC</b>  (Benefício de Prestação Continuada)?
        </Label>
        <Select
          name="bpc"
          options={governmentProgramOptions}
        />

        <Label>
          Você ou alguém da sua casa recebe <b>pensão por morte do(a) cônjuge</b>?
        </Label>
        <Select
          name="pensao"
          options={yesOrNoOptions}
        />

        <Label>
          Você ou alguém da sua casa recebe <b>auxílio reclusão</b>?
        </Label>
        <Select
          name="reclusao"
          options={yesOrNoOptions}
        />

        <Label>
          Você ou alguém da sua casa recebe <b>auxílio referente à alimentação escolar ou PNAE</b>?
        </Label>
        <Select
          name="pnae"
          options={governmentPNAEProgramOptions}
        />

        <Label>
          Você ou alguém da sua casa recebeu <b>cesta de alimentos</b>?
        </Label>
        <Select
          name="cesta"
          options={yesOrNoOptions}
        />

        <Label>
          Você ou alguém da sua casa recebeu <b>frequenta restaurantes populares</b> para fazer refeições?
        </Label>
        <Select
          name="restaurantes_populares"
          options={yesOrNoOptions}
        />

        <Label>
          Você ou alguém da sua casa <b>solicitou auxílio emergencial</b> por causa da pandemia do Coronavírus ou Covid-19?
        </Label>

        <Select
          name="auxilio_covid"
          options={yesOrNoOptions}
          onChange={selectedOption => {
            console.log(selectedOption)
            setAuxilio(selectedOption)
          }}
        />
        {
          auxilio?.value === 'true' || auxilio === {} ?
            (
              <>
                <Label>Quantas vezes você ou outra pessoa que mora na sua casa recebeu o auxílio?</Label>
                <Input
                  icon={FiDollarSign}
                  placeholder="Número de vezes"
                  name="auxilio_vezes"
                  type="number"
                />
              </>
            ) :
            null
        }

        <Label>
          Você ou alguém da sua casa recebeu ajuda <b>de alguma instituição/associação. igreja, amigos, parentes ou outros</b>?
        </Label>

        <Select
          name="ajuda_instituicao"
          options={yesOrNoOptions}
          onChange={selectedOption => setAjuda(selectedOption)}
        />

        <Label>
          Caso você ou alguém da sua casa tenha recebido ajuda <b>ela foi de que forma</b>?
        </Label>

        <Select
          name="tipo_ajuda"
          options={typeOfrecievedCharityOptions}
          isDisabled={ajuda?.value === 'true' ? false : true}
        />

        <Label>
          Caso você ou alguém da sua casa teve que fazer alguma coisa que causou <b>vergonha, tristeza ou constrangimento</b>?
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
        />

        <Label>
          Na sua casa você produz algum desses alimentos <b>para venda</b>?
        </Label>

        <Select
          name="food_for_market"
          options={yesOrNoOptions}
          onChange={selectedOptions => setProduce(selectedOptions)}
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
          name="home_grown"
          options={FoodSellingOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

        <Label>
          Nos últimos 3 meses, você <b>precisou consumir, doar, descartar ou fazer outro uso</b> do alimento que pretendia comercializar por conta da pandemia?
        </Label>

        <Select
          name="home_grown"
          options={yesOrNoOptions}
          isDisabled={produce?.value === 'true' ? false : true}
        />

      </Section>

      <Section>

        <Label>
          Nos últimos 30 dias qual foi a renda familiar?
        </Label>
        <CheckBoxContainer>
          <CheckBoxInput
            name="income"
            options={[{
              id: 'income',
              value: 'income',
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
        /> : null}
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
          Nos últimos 3 meses, <b>observou alguma alteração nos preços</b> dos alimentos que custuma comprar?
        </Label>
        <Select
          name="food_price"
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
          Nos últimos 3 meses, <b>qual foi o tipo de estabelecimento</b> que mais você ou alguém da sua casa maisfrequentou para fazer as compras?
        </Label>
        <Select
          name="food_price"
          options={FoodStoreOptions}
        />

        <Label>
          Nos últimos 3 meses, considera que <b>as despesas/gastos semanais</b> com alimentação mudaram na sua casa?
        </Label>
        <Select
          name="food_price"
          options={FoodExpenditureOptions}
        />

        <Label>
          Ao final da aplicação, você considera o questionário:
        </Label>
        <Select
          name="research_status"
          options={researchStatusOptions}
        />

        <Label>
          Qual modalidade de entrevista foi utilizada?
        </Label>
        <Select
          name="research_type"
          options={interviewTypeOptions}
        />
        <Button>Submit</Button>
      </Section>
    </StyledForm >
  );

}

export default HouseholdForm;


