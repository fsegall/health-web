export default interface ICreateDemograficoDTO {
    id?: string; //backend - generated UUID
    total_moradores: number; //D1 (base to create array form)
    moradores: QuadroSocioDemograficoDTO[] // form array
    trabalho_colheira_outras_regioes: string[] // multi-select
    trabalho_colheita_ultimo_ano: string //select
}

interface QuadroSocioDemograficoDTO {
    id: number;
    nome: string;
    relacao_com_chefe: string;
    idade: number;
    sexo: string; // select
    raca: string; // select
    povo_etnia: string; // select
    // lingua_indigena: string; // select -> REMOVIDO
    // HOLD: em análise -> para ser eliminado da tabela
    // fala_lingua_portuguesa: string; // select
    // le_escreve_portugues: string; // select
    crenca_religiao?: string[]; //14> // multi-select
    // frequenta_escola: string; //select -> REMOVIDO
    grau_escolaridade: string;
    situacao_no_trabalho?: string //14> select
    ocupacao_profissao?: string //14>
    funcao_na_comunidade?: string[] //14> multi-select
}
