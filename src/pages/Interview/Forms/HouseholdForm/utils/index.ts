import ICreateHouseholdDTO from '../../../dtos/ICreateHouseholdDTO';

export const parseHouseholdData = (data: ICreateHouseholdDTO) => {

  return {

    ...data,

    /*     five_years_old_or_more: data.five_years_old_or_more || 0,
        between_6_and_18: data.between_6_and_18 || 0,
        between_19_and_59: data.between_19_and_59 || 0,
        sixty_years_old_or_more: data.sixty_years_old_or_more || 0,
        people_invited: data.people_invited || 'ns-nr',
        family_income: data.family_income || 0,
        covid_cash_assistance_number_of_times: data.covid_cash_assistance_number_of_times || 0,

        one_person_household: validateCheckbox(data.one_person_household),

        income_unknown: validateCheckbox(data.income_unknown),

        job_loss: validateCheckbox(data.job_loss),

        salary_reduction: validateCheckbox(data.salary_reduction),

        financial_support: validateCheckbox(data.financial_support),

        debt: validateCheckbox(data.debt),

        cut_costs: validateCheckbox(data.cut_costs),

        cut_non_essential_costs: validateCheckbox(data.cut_non_essential_costs),
        ns_nr_work_salary: validateCheckbox(data.ns_nr_work_salary),

        alface_acelga_repolho: validateCheckbox(data.alface_acelga_repolho),

        couve_brocolis_almeirao_agriao_espinafre: validateCheckbox(data.couve_brocolis_almeirao_agriao_espinafre),

        abobora_cenoura_batata_doce_quiabo_caruru: validateCheckbox(data.abobora_cenoura_batata_doce_quiabo_caruru),

        mamao_manga_melaoamarelo_caqui_pequi: validateCheckbox(data.mamao_manga_melaoamarelo_caqui_pequi),

        tomate_pepino_abobrinha_berinjela_chuchu_beterraba: validateCheckbox(data.tomate_pepino_abobrinha_berinjela_chuchu_beterraba),

        laranja_banana_maca_abacaxi: validateCheckbox(data.laranja_banana_maca_abacaxi),

        arroz_macarrao_polenta_cuscuz_milho_verde: validateCheckbox(data.arroz_macarrao_polenta_cuscuz_milho_verde),

        feijao_ervilha_lentilha_grao_de_bico: validateCheckbox(data.feijao_ervilha_lentilha_grao_de_bico),

        batata_comum_mandioca_cara_inhame: validateCheckbox(data.batata_comum_mandioca_cara_inhame),

        carne_de_boi_porco_frango_peixe: validateCheckbox(data.carne_de_boi_porco_frango_peixe),

        ovo_frito_cozido_mexido: validateCheckbox(data.ovo_frito_cozido_mexido),

        leite: validateCheckbox(data.leite),

        amendoim_castanha_de_caju_ou_castanha_do_brasil_para: validateCheckbox(data.amendoim_castanha_de_caju_ou_castanha_do_brasil_para),

        soft_drink: validateCheckbox(data.soft_drink),

        juice_can_or_box: validateCheckbox(data.juice_can_or_box),

        juice_powder: validateCheckbox(data.juice_powder),

        chocolate_beverage: validateCheckbox(data.chocolate_beverage),

        flavored_yogurt: validateCheckbox(data.flavored_yogurt),

        salty_snacks: validateCheckbox(data.salty_snacks),

        cookies: validateCheckbox(data.cookies),

        industrialized_dessert: validateCheckbox(data.industrialized_dessert),

        sausages: validateCheckbox(data.sausages),

        hot_dog_or_burguer_bread: validateCheckbox(data.hot_dog_or_burguer_bread),

        mayonnaise_ketchup_mustard: validateCheckbox(data.mayonnaise_ketchup_mustard),

        margarine: validateCheckbox(data.margarine),

        instant_noodles_or_soup_or_frozen_food: validateCheckbox(data.instant_noodles_or_soup_or_frozen_food), */
  }

};

export const validateCheckbox = (checkArray: any): string[] | boolean | undefined => checkArray && checkArray.length === 0 ? false : checkArray;
