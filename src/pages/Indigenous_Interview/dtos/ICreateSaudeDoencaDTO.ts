export default interface ICreateSaudeDoencaDTO extends FamiliaresMortesOpcionalDTO, TratamentosDTO {
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

    acidentes: string; //select
    // dependa da anterior
    acidentes_ocorridos?: AcidentesOcorridosDTO

    ocorrencia_de_ameacas: string; //select
    // dependa da anterior
    ocorrencia_violencia_fisica: string; //select
    local_ocorrencia_violencia_fisica?: string[]; //multi-select

    //TratamentosDTO
    tratamento_com_paje_ou_similar: string //select
    tratamento_igreja: string; //select
    medicacao_uso_continuo: string; //select
    // dependa da anterior
    doenca_medicacao_uso_continuo?: string[]; //multi-select

    primeiro_recurso_ao_notar_doenca: string; //select
    morador_internato: string; //select
    morador_problemas_bebidas_alcoolicas: string; //select
    morador_problemas_uso_drogas: string; //select
}

interface FamiliaresMortesOpcionalDTO {
    // perguntas pessoais sobre morte dos familiares - opcionais
    familiar_morte_covid?: string; //select
    // depende anterior
    familiar_morte_covid_contribuia_renda_familiar?: string //select
    
    familiares_morte_outras_causas?: string; //select
    // depende anterior
    familiares_morte_outras_causas_contribuia_renda_familiar?: string; //select (dependa da anterior)
}

interface AcidentesOcorridosDTO {
    picada_de_cobra: boolean;
    picada_animais_peconhentos: boolean;
    acidente_abelhas: boolean;
    acidente_outros_animais: boolean;
    acidente_trabalho: boolean;
    acidente_transporte_rodoviario: boolean;
    acidente_rio: boolean;
    queda_arvores: boolean;
    queda_tombo: boolean;
    outros: boolean;
    ns_nr: boolean;
}

interface TratamentosDTO {
    covid_19: boolean;
    pressao_alta: boolean;
    diabetes: boolean;
    doenca_coracao: boolean;
    asma: boolean;
    malaria: boolean;
    tuberculose: boolean;
    gripe_tosse: boolean;
    neumonia: boolean;
    ulcera: boolean;
    anemia_ferropriva: boolean;
    dst: boolean;
    outras: boolean;
    doenca_feitico: boolean;
}