export default interface ICreateDomicilioDTO {
    id?: string;
    ultima_moradia: string;
    considera_moradia_adequada: string;
    tipo_moradia: string[];
    piso: string;
    material_paredes: string;
    material_telhado: string;
    possui_energia_eletrica: string;
    utensilios_casa: string[];
    utensilios_de_trabalho: string[];
    veiculos: string[];
    origem_agua: string;
    qualidade_agua_para_beber_e_cozinhar: string;
    motivo_qualidade_ruim_agua_para_beber_e_cozinhar?: string;
    forma_acesso_agua: string;
    possui_banheiro: string;
    forma_coleta_esgoto: string[];
    destino_lixo_da_residencia: string[];
}
