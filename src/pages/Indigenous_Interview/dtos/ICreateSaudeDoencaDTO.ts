export default interface ICreateSaudeDoencaDTO extends FamiliaresMortesOpcionalDTO {
    id?: string;
    tomou_vacina_covid: string; //select
    motivo_nao_tomar_vacina_covid?: string //select (depende da anterior)

    //FamiliaresMortesOpcionalDTO

    condicao_de_saude?: string //select
    tekoha_mudou_condicao_de_saude?: string; //GK-ONLY select
    morador_exposto_veneno_lavoura: string; //select
    // depende anterior "sim"
    doencas_contato_veneno_lavoura?: string //select
    // depende anterior "sim"
    motivo_doencas_contato_veneno_lavoura?: string //select

    acidentes: string[]; //select
    // dependa da anterior
    acidentes_ocorridos?: string[]; //multi-select

    ocorrencia_de_ameacas: string; //select
    // dependa da anterior
    ocorrencia_violencia_fisica: string; //select
    local_ocorrencia_violencia_fisica?: string[]; //multi-select

    lista_tratamentos?: string[]; //multi-select

    tratamento_com_paje_ou_similar: string //select
    tratamento_igreja: string; //select
    medicacao_uso_continuo: string; //select
    // dependa da anterior
    doenca_medicacao_uso_continuo?: string[]; //multi-select

    primeiro_recurso_ao_notar_doenca: string; //select
    morador_internado: string; //select
    morador_problemas_bebidas_alcoolicas: string; //select
    morador_problemas_uso_drogas: string; //select
    morador_fuma_cigarro: string; //select
}

interface FamiliaresMortesOpcionalDTO {
    // perguntas pessoais sobre morte dos familiares - opcionais
    familiar_morte?: string; //select
    // depende anterior
    familiar_morte_contribuia_renda_familiar?: string //select
}
