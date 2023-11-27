export default interface ICreateDomicilioDTO {
    id?: string; //backend - generated UUID
    ultima_moradia: string; //select
    considera_moradia_adequada: string; //select
    tipo_moradia: string; //select
    piso: string; //select
    material_paredes: string; //select
    material_telhado: string; //select
    possui_energia_eletrica: string;
    utensilios_casa: string[]; //multi-select
    utensilios_de_trabalho: string[]; //multi-select
    veiculos: string[]; //multi-select
    origem_agua: string; //select
    qualidade_agua_para_beber_e_cozinhar: string; //select
    motivo_qualidade_ruim_agua_para_beber_e_cozinhar?: string; //select
    forma_acesso_agua: string; //select
    possui_banheiro: string; //select
    forma_coleta_esgoto: string; //select
    destino_lixo_da_residencia: string[]; //multi-select
}
