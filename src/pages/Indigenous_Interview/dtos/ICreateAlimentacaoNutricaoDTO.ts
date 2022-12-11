export default interface ICreateAlimentacaoNutricaoDTO {
    id?: string;
    morar_retomada_mudou_alimentacao?: string; //GK-ONLY select
    sem_alimentacao_por_conflito_com_terras?: string; //select
    // depende da anterior "sim"
    motivo_sem_alimentacao_por_conflito_com_terras?: string; //select
    origem_comida: string; //select
    possui_moradores_menores_de_16: string;
    tabela_alimentacao: AlimentacaoSemMenoresDTO | AlimentacaoComMenoresDTO;
    consumiram_sempre_alimentos_da_cultura: string; //select

    acao_quando_falta_comida?: string[]; //multi-select
    // condicional QuandoFaltaComidaDTO
    morador_faz_horta: string; //select
    // se não
    motivo_morador_nao_faz_horta?: string[]; //multi-select
    // se sim
    alimentos_da_horta?: string[]; //multi-select
    frutiferas_nas_proximidades?: string[]; //multi-select

    producao_de_comida_ano_todo?: string; //select
    origem_semente_plantio?: string[]; //multi-select
    armazenamento_semente_plantio?: string[]; //multi-select
    adiciona_veneno_na_plantacao?: string; //select
    dificuldade_com_horta?: string; //select
    // se sim
    lista_dificuldades_com_horta?: string[]; //multi-select
    finalidade_horta?: string; //select
    animais_de_criacao_alimentacao_ou_venda: string; //select
    // se sim
    lista_animais_de_criacao_alimentacao_ou_venda?: string[]; //multi-select
    domicilio_possui_agua_para_animais?: string; //select
    domicilio_possui_agua_para_producao_alimentos: string; //select
    precisou_comprar_alimentos_3m: string; //select
    // se sim
    lugar_precisou_comprar_alimentos_3m: string[]; //multi-select
    possui_cultivo_plantas_medicinais?: string; //select
    faz_remedios_com_plantas: string; //select
    moradia_possui_fogao_ou_lenha: string; //select
    alimentos_consumidos_dia_anterior: string[]; //multi-select
    // AlimentosDiaAnteriorDTO
}

interface TabelaBaseAlimentacaoDTO {
    alimentacao_saudavel_diariamente_30d: string; //select
    comida_disponivel_todos_os_dias_30d: string; //select
    dia_sem_alimentos_30d: string;
}

interface AlimentacaoSemMenoresDTO extends TabelaBaseAlimentacaoDTO {
    preocupacao_em_conseguir_comida_30d?: string; //select
    alimentacao_do_gosto_30d?: string; //select
}

interface AlimentacaoComMenoresDTO extends TabelaBaseAlimentacaoDTO {
    comeu_menos_para_alimentar_os_jovens_30d?: string; //select
    jovens_comeram_menos_do_necessario_30d?: string; //select
    jovens_passaram_algum_dia_sem_alimentos_30d?: string; //select
}
