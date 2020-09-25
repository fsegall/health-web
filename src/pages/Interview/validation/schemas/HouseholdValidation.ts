import * as Yup from 'yup';

export const HouseholdValidation = Yup.object().shape({

  location_of_residence: Yup.string().required(
    'Você precisa escolher um dos campos de localização de residência',
  ),
  homeless: Yup.string().required(
    'Você precisa escolher um dos campos de localização de residência',
  ),
  traditional_peoples: Yup.string().required(
    'Você precisa escolher um dos campos de povos tradicionais',
  ),
  which_traditional_peoples: Yup.string(), // See how to make the field be required conditionally
  household_main_person: Yup.string().required(
    'Você precisa escolher um dos campos de chefe de família',
  ),
  type_of_residence: Yup.string().required(
    'Você precisa escolher um dos campos de tipo de residência',
  ),
  number_of_rooms: Yup.number().required(
    'Você precisa informar o número de cômodos da residência',
  ),
  construction_material: Yup.string().required(
    'Você precisa escolher um dos campos de material de construção da residência',
  ),
  drinking_water: Yup.string().required(
    'Você precisa escolher um dos campos de abastecimento de água potável',
  ),
  sewage: Yup.string().required(
    'Você precisa escolher um dos campos de abastecimento de água potável',
  ),
  number_of_people_household: Yup.number().required(
    'Você precisa informar o número de pessoas que moram na residência',
  ),

  one_person_household: Yup.boolean(),
  five_years_old_or_more: Yup.number(),
  between_6_and_18: Yup.number(),
  between_19_and_59: Yup.number(),
  sixty_years_old_or_more: Yup.number(),
  people_invited: Yup.string().required(
    'Você precisa escolher um dos campos de pessoas convidadas',
  ),

  alface_acelga_repolho: Yup.boolean(),
  couve_brocolis_almeirao_agriao_espinafre: Yup.boolean(),
  abobora_cenoura_batata_doce_quiabo_caruru: Yup.boolean(),
  tomate_pepino_abobrinha_berinjela_chuchu_beterraba: Yup.boolean(),
  laranja_banana_maca_abacaxi: Yup.boolean(),
  arroz_macarrao_polenta_cuscuz_milho_verde: Yup.boolean(),
  feijao_ervilha_lentilha_grao_de_bico: Yup.boolean(),
  batata_comum_mandioca_cara_inhame: Yup.boolean(),
  ovo_frito_cozido_mexido: Yup.boolean(),
  leite: Yup.boolean(),
  amendoim_castanha_de_caju_ou_castanha_do_brasil_para: Yup.boolean(),


  soft_drink: Yup.boolean(),
  juice_can_or_box: Yup.boolean(),
  juice_powder: Yup.boolean(),
  chocolate_beverage: Yup.boolean(),
  flavored_yogurt: Yup.boolean(),
  salty_snacks: Yup.boolean(),
  cookies: Yup.boolean(),
  industrialized_dessert: Yup.boolean(),
  sausages: Yup.boolean(),
  hot_dog_or_burguer_bread: Yup.boolean(),
  mayonnaise_ketchup_mustard: Yup.boolean(),
  margarine: Yup.boolean(),
  instant_noodles_or_soup_or_frozen_food: Yup.boolean(),


  government_assistance_program_cadastro_unico: Yup.string().required(
    'Você precisa escolher um dos campos do cadastro único',
  ),
  government_assistance_program_bolsa_familia: Yup.string().required(
    'Você precisa escolher um dos campos do bolsa família',
  ),
  government_assistance_program_bpc: Yup.string().required(
    'Você precisa escolher um dos campos do bpc',
  ),
  pension: Yup.string().required(
    'Você precisa escolher um dos campos de pensão',
  ),
  prison_cash_assistance: Yup.string().required(
    'Você precisa escolher um dos campos de auxílio reclusão',
  ),
  government_assistance_program_pnae: Yup.string().required(
    'Você precisa escolher um dos campos do PNAE',
  ),
  food_basket_assistance: Yup.string().required(
    'Você precisa escolher um dos campos de cesta de alimentos',
  ),
  low_income_restaurants: Yup.string().required(
    'Você precisa escolher um dos campos de restaurantes populares',
  ),
  covid_cash_assistance: Yup.string().required(
    'Você precisa escolher um dos campos de auxílio emergencial',
  ),

  covid_cash_assistance_number_of_times: Yup.number(),
  charity: Yup.string().required(
    'Você precisa escolher um dos campos de ajuda recebida',
  ),
  type_of_charity: Yup.string(),
  embarassement: Yup.string().required(
    'Você precisa escolher um dos campos',
  ),
  home_grown: Yup.string().required(
    'Você precisa escolher um dos campos de produção de alimentos',
  ),
  food_for_market: Yup.string().required(
    'Você precisa escolher um dos campos de produção de alimentos',
  ),
  market_profile: Yup.string(),
  difficulty_selling_food: Yup.string(),
  could_not_sell_food: Yup.string(),
  income_unknown: Yup.boolean(),
  family_income: Yup.number(),
  job_loss: Yup.boolean(),
  salary_reduction: Yup.boolean(),
  financial_support: Yup.boolean(),
  debt: Yup.boolean(),
  cut_costs: Yup.boolean(),
  cut_non_essential_costs: Yup.boolean(),
  worried_food_supply: Yup.string().required(
    'Você precisa escolher um dos campos de PREOCUPAÇÃO DE QUE OS ALIMENTOS ACABASSEM',
  ),
  lack_food_supply: Yup.string().required(
    'Você precisa escolher um dos campos de OS ALIMENTOS ACABARAM',
  ),
  afford_healthy_food: Yup.string().required(
    'Você precisa escolher um dos campos de ALIMENTAÇÃO SAUDÁVEL E VARIADA',
  ),
  poor_food_choice: Yup.string().required(
    'Você precisa escolher um dos campos de POUCOS TIPOS DE ALIMENTOS',
  ),
  adult_meals: Yup.string().required(
    'Você precisa escolher um dos campos de DEIXOU DE FAZER ALGUMA REFEIÇÃO',
  ),
  adult_food_privation: Yup.string().required(
    'Você precisa escolher um dos campos de COMEU MENOS DO QUE ACHOU QUE DEVIA',
  ),
  adult_hunger: Yup.string().required(
    'Você precisa escolher um dos campos de SENTIU FOME',
  ),
  adult_one_meal_or_none: Yup.string().required(
    'Você precisa escolher um dos campos de APENAS UMA REFEIÇÃO AO DIA OU FICOU UM DIA INTEIRO SEM COMER',
  ),
  how_food_is_obtained: Yup.string().required(
    'Você precisa escolher um dos campos de que forma você e as pessoas da sua casa estão adquirindo os alimentos',
  ),
  food_price_change: Yup.string().required(
    'Você precisa escolher um dos campos observou alguma alteração nos preços dos alimentos',
  ),
  food_profile_change: Yup.string().required(
    'Você precisa escolher um dos campos do seu perfil de compra dos alimentos',
  ),
  food_store_type: Yup.string().required(
    'Você precisa escolher um dos campos de qual foi o tipo de estabelecimento mais frequentado para compra de alimentos',
  ),
  food_expenditure: Yup.string().required(
    'Você precisa escolher um dos campos sobre as despesas/gastos semanais com alimentação',
  ),

});
