export default interface ICreateHouseholdDTO {

  person_id?: string; // Supplied by local storage, not part of user form validation

  location_of_residence: string;
  homeless: string;
  traditional_peoples: string;
  which_traditional_peoples?: string;
  household_main_person: string;
  reference_person_gender?: string;//backend
  type_of_residence: string;
  number_of_rooms: number;
  construction_material: string;
  drinking_water: string;
  sewage: string;
  number_of_people_household: number;
  one_person_household?: boolean;
  five_years_old_or_more?: number;
  between_6_and_18?: number;
  between_19_and_59?: number;
  sixty_years_old_or_more?: number;
  people_invited: string;

  alface_acelga_repolho?: boolean;
  couve_brocolis_almeirao_agriao_espinafre?: boolean;
  abobora_cenoura_batata_doce_quiabo_caruru?: boolean;
  tomate_pepino_abobrinha_berinjela_chuchu_beterraba?: boolean;
  laranja_banana_maca_abacaxi?: boolean;
  arroz_macarrao_polenta_cuscuz_milho_verde?: boolean;
  feijao_ervilha_lentilha_grao_de_bico?: boolean;
  batata_comum_mandioca_cara_inhame?: boolean;
  ovo_frito_cozido_mexido?: boolean;
  leite?: boolean;
  amendoim_castanha_de_caju_ou_castanha_do_brasil_para?: boolean;

  // Incluir no backend checkboxes

  mamao_manga_melaoamarelo_caqui_pequi?: boolean;
  carne_de_boi_porco_frango_peixe?: boolean;

  //fim


  soft_drink?: boolean;
  juice_can_or_box?: boolean;
  juice_powder?: boolean;
  chocolate_beverage?: boolean;
  flavored_yogurt?: boolean;
  salty_snacks?: boolean;
  cookies?: boolean;
  industrialized_dessert?: boolean;
  sausages?: boolean;
  hot_dog_or_burguer_bread?: boolean;
  mayonnaise_ketchup_mustard?: boolean;
  margarine?: boolean;
  instant_noodles_or_soup_or_frozen_food?: boolean;

  government_assistance_program_cadastro_unico: string;

  government_assistance_program_bolsa_familia: string;

  government_assistance_program_bpc: string;

  pension: string;

  prison_cash_assistance: string;

  government_assistance_program_pnae: string;

  food_basket_assistance: string;

  low_income_restaurants: string;

  covid_cash_assistance: string;

  covid_cash_assistance_number_of_times?: number;

  charity: string;

  type_of_charity?: string;

  embarassement?: string;

  home_grown: string;

  food_for_market: string;

  market_profile?: string;

  difficulty_selling_food?: string;

  could_not_sell_food?: string;

  income_unknown?: boolean;

  family_income?: number;

  job_loss?: boolean;

  salary_reduction?: boolean;

  financial_support?: boolean;

  debt?: boolean;

  cut_costs?: boolean;

  cut_non_essential_costs?: boolean;

  worried_food_supply: string;

  lack_food_supply: string;

  afford_healthy_food: string;

  poor_food_choice: string;

  adult_meals: string;

  adult_food_privation: string;

  adult_hunger: string;

  adult_one_meal_or_none: string;

  how_food_is_obtained: string;

  food_price_change: string;

  food_profile_change?: string;

  food_store_type: string;

  food_expenditure: string;

}
