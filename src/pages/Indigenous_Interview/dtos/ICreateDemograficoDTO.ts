export default interface ICreateDemograficoDTO {
    id?: string; //backend - generated UUID
    total_moradores: number; //D1 (base to create array form)
    moradores: QuadroSocioDemograficoDTO[] // form array
    morador_trabalhou_fazendas: string[] // multi-select
    morador_trabalhou_catacao: string //select
}

interface QuadroSocioDemograficoDTO {
    id: number;
    nome: string;
    relacao_com_lider: string;
    idade: number;
    sexo: string; // select
    indigena: string; // select
    povo_etnia: string; // select
    // lingua_indigena: string; // select -> REMOVIDO
    // HOLD: em análise -> para ser eliminado da tabela
    // fala_lingua_portuguesa: string; // select
    // le_escreve_portugues: string; // select
    crenca_religiao?: string[]; //14> // multi-select
    // frequenta_escola: string; //select -> REMOVIDO
    serie_frequentada_escola: string;
    situacao_no_trabalho?: string //14> select
    ocupacao_principal?: string //14>
    funcao_na_comunidade?: string[] //14> multi-select
}
