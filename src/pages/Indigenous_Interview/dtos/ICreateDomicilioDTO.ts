export default interface ICreateDomicilioDTO {
    id?: string; //backend - generated UUID
    ultima_morada: string; //select
    // como_define_ultima_morada?: string; //select
    piso: string; //select
    material_paredes: string; //select
    material_telhado: string; //select
    quantidade_comodos: number;
    // UtensiliosNoDomicilioDTO
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

// interface UtensiliosNoDomicilioDTO {
//     televisao: boolean;
//     geladeira: boolean;
//     fogao_a_gas: boolean;
//     maquina_de_lavar_ou_tanque: boolean;
//     computador: boolean;
//     celular_com_internet: boolean;
//     celular_sem_internet: boolean;
//     trator_ou_rocadeira: boolean;
// }