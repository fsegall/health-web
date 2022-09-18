export default interface ApoioProtecaoSocialDTO extends ApoioFinanceiroDTO, AlimentosDeveriamTerNaCestaDTO, AlimentosNaoDeveriamTerNaCestaDTO {
    morador_matriculado_na_educacao_basica_publica: string; //select
    // se sim
    quantidade_morador_matriculado_na_educacao_basica_publica: number;
    criancas_comem_na_escola: string; //select
    escola_inclui_alimentos_da_cultura: string; //select
    morador_recebe_ajuda_financeira: string; //select
    // se sim
    // ApoioFinanceiroDTO
    quantidade_cesta_de_alimentos_3m?: number;
    origem_cesta_de_alimentos_3m?: string; //select
    //AlimentosDeveriamTerNaCestaDTO
    //AlimentosNaoDeveriamTerNaCestaDTO
    descricao_adicionar_outro?: string;
    descricao_remover_outro?: string;
    motivo_nao_recebe_cesta_de_alimentos?: string; //select
    quem_pega_dinheiro_bolsa_familia?: string; //select

    auxilio_emergencial_na_pandemia: string; //select
    // se sim
    quantidade_vezes_auxilio_emergencial_na_pandemia?: string;
    ajuda_estado_prefeitura_outros_3m: string; //select
    // se sim
    itens_recebidos_ajuda_estado_prefeitura_outros_3m?: string; //select
    vergonha_constrangimento_para_conseguir_alimentos_3m: string; //select
}

interface ApoioFinanceiroDTO {
    bolsa_familia_auxili_brasil?: string; //select
    bpc?: string; //select
    beneficio_deficientes_ou_idosos?: string; //select
    auxilio_maternidade?: string; //select
    auxilio_doenca?: string; //select
    auxilio_reclusao?: string; //select
    aposentadoria?: string; //select
    pensao_morte_conjuge?: string; //select
    pronaf?: string; //select
    auxilio_estadual_ou_municipal?: string; //select
    cesta_de_alimentos?: string; //select
}

interface AlimentosDeveriamTerNaCestaDTO {
    adicionar_leite?: boolean;
    adicionar_arroz?: boolean;
    adicionar_feijao?: boolean;
    adicionar_oleo_de_soja?: boolean;
    adicionar_acucar?: boolean;
    adicionar_cafe?: boolean;
    adicionar_erva_mate?: boolean;
    adicionar_farinha_de_mandioca?: boolean;
    adicionar_farinha_de_trigo?: boolean;
    adicionar_macarrao?: boolean;
    adicionar_molho_de_tomate?: boolean;
    adicionar_frutas?: boolean;
    adicionar_fuba?: boolean;
    adicionar_legumes_verduras?: boolean;
    adicionar_sardinha?: boolean;
    adicionar_seleta_de_legumes?: boolean;
    adicionar_ovos?: boolean;
    adicionar_outro?: boolean;
}

interface AlimentosNaoDeveriamTerNaCestaDTO {
    remover_leite?: boolean;
    remover_arroz?: boolean;
    remover_feijao?: boolean;
    remover_oleo_de_soja?: boolean;
    remover_acucar?: boolean;
    remover_cafe?: boolean;
    remover_erva_mate?: boolean;
    remover_farinha_de_mandioca?: boolean;
    remover_farinha_de_trigo?: boolean;
    remover_macarrao?: boolean;
    remover_molho_de_tomate?: boolean;
    remover_frutas?: boolean;
    remover_fuba?: boolean;
    remover_legumes_verduras?: boolean;
    remover_sardinha?: boolean;
    remover_seleta_de_legumes?: boolean;
    remover_ovos?: boolean;
    remover_outro?: boolean;
}