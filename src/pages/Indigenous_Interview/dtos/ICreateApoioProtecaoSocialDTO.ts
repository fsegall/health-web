export default interface ICreateApoioProtecaoSocialDTO {
    criancas_comem_escola: string; //select
    alimentacao_escolar_inclui_cultura: string; //select
    morador_recebe_ajuda_financeira: string; //select
    // se sim
    // ApoioFinanceiroDTO
    recebeu_cesta_alimentos?: string[]; //multi-select
    recebeu_cesta_alimentos_que_alimentos_deveriam_ter?: string[]; //multi-select
    morador_recebe_programa_social: ApoioFinanceiroDTO
    descricao_adicionar_outro?: string;
    motivo_nao_recebe_cesta_alimentos?: string; //select

    ajuda_estado_prefeitura_outros_3m: string; //select
    // se sim
    o_que_recebeu_ajuda_3m?: string[]; //select
    constrangimento_pedir_ajuda_alimentos_3m: string; //select
}

interface ApoioFinanceiroDTO {
    bolsa_familia_auxilio_brasil: string; //select
    bpc: string; //select
    beneficio_deficientes_idosos: string; //select
    auxilio_maternidade: string; //select
    auxilio_doenca: string; //select
    auxilio_reclusao: string; //select
    aposentadoria: string; //select
    pensao_morte: string; //select
    pronaf: string; //select
    programa_auxilio_estadual_municipal: string; //select
    cesta_alimentos: string; //select
}
