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
