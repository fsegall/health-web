export default interface ICreateAlimentacaoNutricaoDTO extends QuandoFaltaComidaDTO, AlimentosDiaAnteriorDTO {
    id?: string;
    morar_retomada_mudou_alimentacao?: string; //GK-ONLY select
    luta_por_terra: string; //select
    sem_alimentacao_por_conflito_com_terras: string; //select
    // depende da anterior "sim"
    motivo_sem_alimentacao_por_conflito_com_terras: string; //select
    origem_comida: string; //select
    possui_moradores_menores_de_16: boolean;
    tabela_alimentacao: AlimentacaoSemMenoresDTO | AlimentacaoComMenoresDTO;
    consumiram_sempre_alimentos_da_cultura: string; //select

    // condicional QuandoFaltaComidaDTO
    morador_faz_horta: string; //select
    // se não
    motivo_morador_nao_faz_horta: string[]; //multi-select
    // se sim
    alimentos_da_horta: string[]; //multi-select
    frutiferas_nas_proximidades: string[]; //multi-select

    producao_de_comida_ano_todo: string; //select
    origem_semente_plantio: string[]; //multi-select
    adiciona_veneno_na_plantacao: string; //select
    dificuldade_com_horta: string; //select
    // se sim
    lista_dificuldades_com_horta: string[]; //multi-select
    serventia_horta: string; //select
    animais_de_criacao_alimentacao_ou_venda: string; //select
    // se sim
    lista_animais_de_criacao_alimentacao_ou_venda: string[]; //multi-select
    domicilio_possui_agua_para_animais: string; //select
    domicilio_possui_agua_para_producao_alimentos: string; //select
    precisou_comprar_alimentos_3m: string; //select
    // se sim
    lugar_precisou_comprar_alimentos_3m: string[]; //multi-select
    possui_cultivo_plantas_medicinais: string; //select
    faz_remedios_com_plantas: string; //select
    moradia_possui_fogao: string[]; //multi-select
    material_utilizado_para_fazer_fogo: string; //select

    // AlimentosDiaAnteriorDTO
    primeiros_a_se_alimentar?: string; //GK-REMOVE select
    ultimos_a_se_alimentar?: string; //GK-REMOVE select 
}

interface TabelaBaseAlimentacaoDTO {
    alimentacao_saudavel_diariamente_30d: string; //select
    comida_disponivel_todos_os_dias_30d: string; //select
}

interface AlimentacaoSemMenoresDTO extends TabelaBaseAlimentacaoDTO {
    preocupacao_em_conseguir_comida_30d: string; //select
    alimentacao_do_gosto_30d: string; //select
}

interface AlimentacaoComMenoresDTO extends TabelaBaseAlimentacaoDTO {
    comeu_menos_para_alimentar_os_jovens_39d: string; //select
    jovens_comeram_menos_do_necessario_30d: string; //select
    jovens_passaram_algum_dia_sem_alimentos_30d: string; //select
}

interface QuandoFaltaComidaDTO {
    come_vende_animais_de_criacao: boolean;
    vende_ferramentas_agricolas_ou_de_trabalho: boolean;
    vende_equipamentos_domesticos: boolean;
    vende_produtos_na_cidade: boolean;
    vai_para_outra_comunidade: boolean;
    vai_para_cidade: boolean;
    compra_fiado: boolean;
    ajuda_cidade: boolean;
    ajuda_parente: boolean;
    ajuda_igreja: boolean;
    ajuda_vizinhos: boolean;
    ajuda_funai: boolean;
    ajuda_posto_de_saude: boolean;
    ajuda_cras: boolean;
    ajuda_cimi: boolean;
    outros: boolean;
}

interface AlimentosDiaAnteriorDTO {
    feijao_1d: boolean;
    arroz_1d: boolean;
    mandioca_cara_inhame_batata_1d: boolean;
    carnes_1d: boolean;
    verduras_legumes_1d: boolean;
    frutas_frescas_1d: boolean;
    leite_e_derivados_1d: boolean;
    hamburguer_ou_embutidos_1d: boolean;
    bebidas_adocadas_1d: boolean;
    macarrao_salgadinhos_biscoitos_1d: boolean;
    doces_guloseimas_1d: boolean;
}