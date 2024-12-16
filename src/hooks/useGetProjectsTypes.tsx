
export type ProjectType = 'default' | 'indigenous'
export type InterviewerAgeType = 'greater-than-18' | 'between-14-and-18'

export interface ProjectTypeOptions {
    value: ProjectType;
    label: string
}

interface ProjectConfirmationInfo {
    title: string;
    description: string[]
    contact: string
}


interface AcceptInfoType {
    'default': ProjectConfirmationInfo,
    'indigenous': ProjectConfirmationInfo,
}

interface InterviewURL {
    'default': string,
    'indigenous': string,
}

export const projectTypeOptions: ProjectTypeOptions[] = [
    {
      value: 'default',
      label: 'Padrão'
    },
    {
      value: 'indigenous',
      label: 'Indígena'
    },
]

const useGetProjectsTypes = (type: ProjectType, interviewedPersonAge: InterviewerAgeType): {
    options: ProjectTypeOptions[];
    acceptInfo: ProjectConfirmationInfo;
    interviewPath: string
} => {

    const interviewURL: InterviewURL = {
        'default': 'interview',
        'indigenous': 'indigenous-interview'
    }

    const indigenousDescription = {
        'greater-than-18': [
            'Termo de Consentimento Livre e Esclarecido (TCLE) para pessoa com mais de 18 anos de idade.'
        ],
        'between-14-and-18': [
            'Termo de Assentimento Livre e Esclarecido (TALE para pessoa entre 14 e 18 anos de idade.'
        ],
    }

    const acceptInfo: AcceptInfoType = {
        'default': {
            title: 'TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO – APLICATIVO VIGISAN',
            description: [
                'Você está sendo convidado(a) a participar, como voluntário(a) de nossa pesquisa, por meio de entrevista. Esta tem por objetivo avaliar a insegurança alimentar e nutricional no seu domicílio. Serão algumas perguntas sobre você e seus familiares; outras serão referentes às condições sobre a casa, o trabalho, a saúde e a alimentação.',
                'Todas as informações que você fornecer serão confidenciais e os resultados que serão divulgados não conterão quaisquer dados pessoais de identificação. A qualquer momento você poderá solicitar maiores esclarecimentos, recusar-se a participar ou desistir da entrevista. Mas, se concordar em respondê-la, sua participação contribuirá para melhorar o diagnóstico dos grupos específicos da população brasileira e, consequentemente, lutar por ações que garantam alimentação suficiente e saudável para as famílias.',
            ],
            contact: 'Em caso de dúvidas sobre a pesquisa, você poderá entrar em contato com a Rede Brasileira de Pesquisa em Soberania e Segurança Alimentar e Nutricional (RedePenSSAN) através do e-mail: rbpssan@gmail.com'
        }
        , 'indigenous': {
            title: 'TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO – APLICATIVO VIGISAN',
            description: indigenousDescription[interviewedPersonAge],
            contact: 'Em caso de dúvidas sobre a pesquisa, você poderá entrar em contato com a Rede Brasileira de Pesquisa em Soberania e Segurança Alimentar e Nutricional (RedePenSSAN) através do e-mail: rbpssan@gmail.com.'
        }
    }
    return {
        options: projectTypeOptions,
        acceptInfo: acceptInfo[type],
        interviewPath: interviewURL[type]
    }
}

export default useGetProjectsTypes
