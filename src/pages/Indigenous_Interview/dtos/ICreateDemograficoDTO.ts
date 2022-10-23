export default interface ICreateDemograficoDTO {
    id?: string; //backend - generated UUID
    total_moradores: number; //D1 (base to create array form)
    moradores: QuadroSocioDemograficoDTO[] // form array
    trabalho_colheita_maca?: string //GK-ONLY select
}

interface QuadroSocioDemograficoDTO {
    id: number;
    nome: string;
    relacao_com_chefe: string;
    idade: number;
    sexo: string; // select
    raca: string; // select
    povo_etnia: string; // select
    lingua_indigena: string; // select
    // HOLD: em análise -> para ser eliminado da tabela
    // fala_lingua_portuguesa: string; // select
    // le_escreve_portugues: string; // select
    crenca_religiao?: string; //14> // select
    frequenta_escola: string; //select
    grau_escolaridade: string;
    situacao_no_trabalho?: string //14> select
    ocupacao_profissao?: string //14>
    funcao_na_comunidade?: string //14>
}
