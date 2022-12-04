export default interface ICreateApoioProtecaoSocialDTO extends ApoioFinanceiroDTO {
    criancas_comem_na_escola: string; //select
    escola_inclui_alimentos_da_cultura: string; //select
    morador_recebe_ajuda_financeira: string; //select
    // se sim
    // ApoioFinanceiroDTO
    origem_cesta_de_alimentos_3m?: string[]; //multi-select
    alimentos_deveriam_estar_na_cesta_e_nao_estao?: string[]; //multi-select

    descricao_adicionar_outro?: string;
    motivo_nao_recebe_cesta_de_alimentos?: string; //select

    ajuda_estado_prefeitura_outros_3m: string; //select
    // se sim
    itens_recebidos_ajuda_estado_prefeitura_outros_3m?: string[]; //select
    vergonha_constrangimento_para_conseguir_alimentos_3m: string; //select
}

interface ApoioFinanceiroDTO {
    bolsa_familia_auxilio_brasil: string; //select
    bpc: string; //select
    beneficio_deficientes_ou_idosos: string; //select
    auxilio_maternidade: string; //select
    auxilio_doenca: string; //select
    auxilio_reclusao: string; //select
    aposentadoria: string; //select
    pensao_morte_conjuge: string; //select
    pronaf: string; //select
    auxilio_estadual_ou_municipal: string; //select
    cesta_de_alimentos: string; //select
}
