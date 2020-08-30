import React, { useState, useRef, useCallback } from 'react';
import {
  OptionTypeBase
} from 'react-select';
import * as Yup from 'yup';
import Select from '../../../../components/Select';
import { FormHandles } from '@unform/core';
import CheckboxInput from '../../../../components/Checkbox';
import {
  StyledForm,
  Section,
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
  governmentProgramOptions,
  governmentPNAEProgramOptions,
  governmentCovidProgramOptions,
  typeOfrecievedCharityOptions,
  embarassementOptions,
  homeGrownFoodOptions,
  FoodSellingOptions,
  howFoodIsObtainedOptions,
  FoodPriceOptions,
  FoodStoreOptions,
  FoodProfileOptions,
  FoodExpenditureOptions

} from '../../questions/SelectorOptions/options';

import api from '../../../../services/api';
import CheckBoxInput from '../../../../components/Checkbox';

const HouseholdForm: React.FC = (props) => {

  const { token } = useAuth();

  const { addToast } = useToast();

  const [traditional, setTraditional] = useState<OptionTypeBase | undefined | null>({});

  const [income, setIncome] = useState(true);

  const [auxilio, setAuxilio] = useState<OptionTypeBase | undefined | null>({});

  const [ajuda, setAjuda] = useState<OptionTypeBase | undefined | null>({});

  const [produce, setProduce] = useState<OptionTypeBase | undefined | null>({});

  const [buyingProfile, setBuyingProfile] = useState<OptionTypeBase | undefined | null>({});

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
        <Label>
          Das pessoas que relacionou antes, quantas você acolheu no momento da pandemia?
        </Label>
        <Select
          name="pessoas_acolhidas"
          options={peopleInvitedToHouseholdOptions}
          onChange={() => { }}
        />
      </Section>

      <Section>

        <Label>
          <strong>INSAN e questões alimentares</strong>
        </Label>

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
          options={homeGrownFoodOptions}
          onChange={selectedOptions => setProduce(selectedOptions)}
        />

        <Label>
          Nos últimos 3 meses, <b>enfrentou dificuldade para comercialização devido à pandemia</b>?
        </Label>

        <Select
          name="home_grown"
          options={FoodSellingOptions}
          isDisabled={produce?.value === 'sim-consumo-venda' || produce?.value === 'sim-venda' ? false : true}
        />

        <Label>
          Nos últimos 3 meses, você <b>precisou consumir, doar, descartar ou fazer outro uso</b> do alimento que pretendia comercializar por conta da pandemia?
        </Label>

        <Select
          name="home_grown"
          options={yesOrNoOptions}
          isDisabled={produce?.value === 'sim-consumo-venda' || produce?.value === 'sim-venda' ? false : true}
        />





      </Section>

      <Section>

        <Label>
          Nos últimos 30 dias qual foi a renda familiar?
        </Label>

        <CheckBoxInput
          name="income"
          options={[{
            id: 'income',
            value: 'income',
            label: 'Não sei informar',
          }]}
          onChange={() => setIncome(!income)}
        />

        {income ? <Input
          icon={FiDollarSign}
          placeholder="Renda familiar"
          name="family_income"
          type="number"
        /> : null}
        <Input
          icon={FiUsers}
          placeholder="Pessoas que dependem desta renda"
          name="family_income"
          type="number"
        />
        <Label><strong>Segurança Alimentar</strong></Label>
        <Label>
          Nos últimos 3 meses os moradores tiveram <b>preocupação de que os alimentos pudessem acabar</b> antes de poder comprar ou receber mais comida?
        </Label>
        <Select
          name="worried_food_supply"
          options={worriedWithFoodSupplyOptions}
        />
        <Label>
          Nos últimos 3 meses <b>os alimentos acabaram</b> antes de poder comprar ou receber mais comida?
        </Label>
        <Select
          name="lack_food_supply"
          options={LackOfFoodOptions}
        />
        <Label>
          Nos últimos 3 meses os moradores ficaram sem dinheiro para ter uma <b>alimentação saudável e variada</b>?
        </Label>
        <Select
          name="afford_healthy_food"
          options={cannotAffordFoodOptions}
        />
        <Label>
          Nos últimos 3 meses os moradores comeram somente alguns <b>poucos tipos de alimento</b> porque o dinheiro acabou?
        </Label>
        <Select
          name="poor_food_choice"
          options={yesOrNoOptions}
        />
        <Label>
          Nos últimos 3 meses algum dos moradores com 18 anos ou mais <b>deixou de fazer alguma refeição</b> porque o dinheiro acabou?
        </Label>
        <Select
          name="adult_meals"
          options={yesOrNoOptions}
        />
        <Label>
          Nos últimos 3 meses algum dos moradores com 18 anos ou mais <b>comeu menos do que achou que deveria</b> porque o dinheiro para comprar comida acabou?
        </Label>
        <Select
          name="adult_food_privation"
          options={yesOrNoOptions}
        />
        <Label>
          Nos últimos 3 meses algum dos moradores com 18 anos ou mais <b>sentiu fome, mas não comeu</b> porque não havia dinheiro para comprar comida?
        </Label>
        <Select
          name="adult_hunger"
          options={yesOrNoOptions}
        />
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


        <Button>Submit</Button>
      </Section>
    </StyledForm>
  );

}

export default HouseholdForm;


