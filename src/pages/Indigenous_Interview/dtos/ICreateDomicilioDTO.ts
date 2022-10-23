export default interface ICreateDomicilioDTO {
    id?: string; //backend - generated UUID
    ultima_moradia: string; //select
    piso: string; //select
    material_paredes: string; //select
    material_telhado: string; //select
    quantidade_comodos: number;
    utensilios_casa: string[]; //multi-select
    acesso_agua: string; //select
    origem_agua: string; //select
    qualidade_agua_para_beber_e_cozinhar: string; //select
    forma_acesso_agua: string; //select
    possui_banheiro: string; //select
    forma_coleta_esgoto: string; //select
    destino_lixo_da_residencia: string[]; //multi-select
    veiculos: string[]; //multi-select
    renda_total_30_dias: string; //select
}