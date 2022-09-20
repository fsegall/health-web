const handleValueLabelOption = (obj: any) => {
    return Object.entries(obj).map?.((i: any) => ({
        value: i[0],
        label: i[1],
    }))
}

// Sim,não ns-nr
const yesOrNoOptions = {
    true: 'Sim',
    false: 'Não',
    'ns-nr': 'NS/NR'
}
export const yesOrNoOptionsArray = handleValueLabelOption(yesOrNoOptions)

const sexoOptions = {
    masculino: 'Masculino',
    feminino: 'Feminino',
    outro: 'Outro'
}
export const sexoOptionsArray = handleValueLabelOption(sexoOptions)

const racaOptions = {
    indigena: 'Indígena',
    'nao-indigena': 'Não indígena',
    'ns-nr': 'NS/NR'
}
export const racaOptionsArray = handleValueLabelOption(racaOptions)

const etniaOptions = {
    guarani: 'Guarani (Ñandeva)',
    kaiowa: 'Kaiowá',
    terena: 'Terena',
    outro: 'Outro'
}
export const etniaOptionsArray = handleValueLabelOption(etniaOptions)

const grauEscolaridadeOptions = {
    fundamental_incompleto: 'Fundamental Incompleto',
    fundamental_completo: 'Fundamental Completo',
    medio_incompleto: 'Médio Incompleto',
    medio_completo: 'Médio Completo',
    supletivo_1_grau: 'Supletivo 1º grau',
    supletivo_2_grau: 'Supletivo 2º grau',
    superior_incompleto: 'Superior Incompleto',
    superior_completo: 'Superior Completo',
    nao_frequentou: 'Não frequentou',
    'ns-nr': 'NS/NR',
}
export const grauEscolaridadeOptionsArray = handleValueLabelOption(grauEscolaridadeOptions)

const crencasOptions = {
    religiao_tradicional: 'Religião Tradicional',
    evangelico: 'Evangélico',
    catolico: 'Católico',
    espirita: 'Espírota',
    budista: 'Budista',
    outra: 'Outra'
}
export const crencasOptionsArray = handleValueLabelOption(crencasOptions)

const situacaoTrabalhoOptions = {
    remunerado_aldeia: 'Trabalho Remunerado na Aldeia/Comunidade',
    remunerado_fora_aldeia: 'Trabalho Remunerado fora da Aldeia/Comunidade',
    desempregado_menos_6m: 'Desempregado a menos de 6 meses',
    desempregado_6m_a_1a: 'Desempregado de 6 meses a 1 ano',
    desempregado_mais_1a: 'Desempregado há mais de 1 ano',
    aposentado_tempo: 'Aposentado por tempo',
    aposentado_doenca: 'Aposentado por doença',
    aposentado_remunerado: 'Aposentado ainda trabalha com remuneração',
    estudante: 'Estudante',
    nao_remunerado_aldeia: 'Trabalho não remunerado na Aldeia/ comunidade (inclui dona de casa)',
    'ns-nr': 'NS/NR',
}
export const situacaoTrabalhoOptionsArray = handleValueLabelOption(situacaoTrabalhoOptions)

const ocupacaoPrincipalOptions = {
    agricultor: 'Agricultor',
    rural_sem_carteira: 'Trabalhador rural sem carteira (diarista, temporário, permanente) (abrir aba para: coleta de maçã....)',
    rural_com_carteira: 'Trabalhador rural com carteira assinada',
    urbano_com_carteira: 'Trabalhador urbano (fora da comunidade) com carteira assinada',
    urbano_sem_carteira: 'Trabalhador urbano sem carteira assinada',
    funcionario_publico_comunidade_contratado: 'Funcionário público na comunidade contratado',
    funcionario_publico_comunidade_concursado: 'Funcionário público na comunidade concursado',
    funcionario_publico_fora_contratado: 'Funcionário público fora da comunidade contratado',
    funcionario_publico_fora_concursado: 'Funcionário público fora da comunidade concursado',
    estagiario: 'Estagiário',
    autonomo: 'Autônomo',
    profissional_liberal: 'Profissional Liberal',
    empresario: 'Empresário',
    'ns-nr': 'NS/NR',
}
export const ocupacaoPrincipalOptionsArray = handleValueLabelOption(ocupacaoPrincipalOptions)

// DOMICÍLIO

const ultimaMoradaOptions = {
    reserva_indigena: 'Reserva Indígena',
    acampamento: 'Acampamento',
    outra_retomada: 'Outra Retomada',
    cidade: 'Cidade',
    'ns-nr': 'NS/NR'
}
export const ultimaMoradaOptionsArray = handleValueLabelOption(ultimaMoradaOptions)

const pisoCasaOptions = {
    terra: 'Terra batida/socada',
    cimento_ceramica: 'Cimento/Cerâmica',
    madeira: 'Madeira',
    outros: 'Outros'
}
export const pisoCasaOptionsArray = handleValueLabelOption(pisoCasaOptions)

const paredesCasaOptions = {
    lona_plastico: 'Lona/plástico',
    palha_taboca: 'Palha/taboca',
    barro_taipa: 'Barro/taipá',
    alvenaria: 'Alvenaria',
    outro: 'Outro',
    'ns-nr': 'NS/NR'
}
export const paredesCasaOptionsArray = handleValueLabelOption(paredesCasaOptions)

const telhadoCasaOptions = {
    telha: 'Telha',
    zinco: 'Zinco',
    palha_precaria: 'Palha precária/sapé (velha)',
    lona_plastico: 'Lona/plástico',
    brasilit_eternite: 'Brasilit - Eternite',
    palha_nobre: 'Palha nobre/sapé (nova)',
    outros: 'Outros'
}
export const telhadoCasaOptionsArray = handleValueLabelOption(telhadoCasaOptions)

const utensiliosCasaOptions = {
    televisao: 'Televisão',
    geladeira: 'Geladeira',
    fogao_gas: 'Fogão a gás',
    maquina_lavar: 'Máquina de levar/tanquinho',
    computador: 'Computador/tablet/laptop',
    celular_com_internet: 'Celular COM internet',
    celular_sem_internet: 'Celular SEM internet',
    trator: 'Trator/roçadeira para lavoura'
}
export const utensiliosCasaOptionsArray = handleValueLabelOption(utensiliosCasaOptions)

const origemAguaOptions = {
    rio: 'Rio / "corgo" / igarapé / nascente / lago',
    rede_publica: 'Rede pública',
    poco_artesiano: 'Poço artesiano',
    caminhao_pipa: 'Caminhão pipa',
    poco_caipira: 'Poço caipira',
    cisterna: 'Cisterna',
    outros: 'Outros',
    'ns-nr': 'NS/NR',
}
export const origemAguaOptionsArray = handleValueLabelOption(origemAguaOptions)

const qualidadeAguaOptions = {
    boa: 'Boa',
    muito_boa: 'Muito boa',
    regular: 'Regular',
    ruim: 'Ruim',
    muito_ruim: 'Muito ruim',
    'ns-nr': 'NS/NR'
}
export const qualidadeAguaOptionsArray = handleValueLabelOption(qualidadeAguaOptions)

const acessoAguaCasaOptions = {
    encanada: 'Encanada dentro de casa',
    torneira_coletiva: 'Torneira coletiva',
    encanada_fora: 'Encanada fora de casa',
    nao_encanada: 'Não é encanada',
    'ns-nr': 'NS/NR',
}
export const acessoAguaCasaOptionsArray = handleValueLabelOption(acessoAguaCasaOptions)

const banheiroCasaOptions = {
    nao: 'Não existe',
    fora_da_casa: 'Existe fora da casa',
    dentro_de_casa: 'Existe dentro de casa',
    dentro_e_fora: 'Existe dentro e fora da casa'
}
export const banheiroCasaOptionsArray = handleValueLabelOption(banheiroCasaOptions)

const coletaEsgotoCasaOptions = {
    rede_esgoto: 'Rede de esgoto',
    fossa_septica: 'Fossa séptica',
    fossa_rudimentar: 'Fossa rudimentar',
    vala_ceu_aberto: 'Vala a céu aberto',
    rio_ou_lago: 'Vai para rio ou lago',
    'ns-nr': 'NS/NR'
}
export const coletaEsgotoCasaOptionsArray = handleValueLabelOption(coletaEsgotoCasaOptions)

const destinoLixoOptions = {
    prefeitura: 'Coletado pela prefeitura',
    queimado_enterrado: 'Queimado ou enterrado no local',
    terreno_baldio_longe: 'Jogado em terreno baldio longe da casa',
    local_proximo_casa: 'Joado em local próximo à casa',
    corrego_rio_lago_quintal: 'Jogado em córrego, rio, lago ou quintal da residência',
    'ns-nr': 'NS/NR',
}
export const destinoLixoOptionsArray = handleValueLabelOption(destinoLixoOptions)

const veiculosOptions = {
    bicicleta: 'Bicicleta',
    moto: 'Moto',
    carro: 'Carro',
    van_caminhao: 'Van ou caminhão',
    cavalo_carroca: 'Cavalo ou carroça',
    nao_possui: 'Não possui',
    outros: 'Outros'
}
export const veiculosOptionsArray = handleValueLabelOption(veiculosOptions)

const renda30dOptions = {
    nao_teve: 'Não teve renda',
    menos_de_275: 'Menos de 275 reais',
    entre_275_550: 'Entre 275 e 550 reais',
    entre_551_1100: 'Entre 551 e 1.100 reais',
    entre_1101_2200: 'Entre 1.101 e 2.200 reais',
    entre_2201_5500: 'Entre 2.201 e 5.500 reais',
    entre_5501_11000: 'Entre 5.501 e 11.000 reais',
    mais_de_11000: 'Mais de 11.000 reais',
    'ns-nr': 'NS/NR',
}
export const renda30dOptionsArray = handleValueLabelOption(renda30dOptions)

