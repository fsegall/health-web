
export type ProjectType = 'default' | 'indigenous'

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

const useGetProjectsTypes = (type: ProjectType): {
    options: ProjectTypeOptions[];
    acceptInfo: ProjectConfirmationInfo;
    interviewPath: string
} => {

    const interviewURL: InterviewURL = {
        'default': 'interview',
        'indigenous': 'indigenous-interview'
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
            description: [
                'Você está sendo convidado(a) a participar, como voluntário(a) de nossa pesquisa, por meio de entrevista. Esta tem por objetivo avaliar a insegurança alimentar e nutricional e seus fatores associados em famílias indígenas do Brasil.',
                'As perguntas serão sobre você e seus familiares, a respeito da casa, do trabalho, da saúde, da alimentação e sobre acesso a políticas públicas.',
                'Todas as informações que você fornecer serão confidenciais (VÃO SER MANTIDAS EM SEGREDO). Os resultados que serão divulgados vão mostrar todas as entrevistas juntas, por isso não vão aparecer dados que identifiquem você ou alguém de sua família.',
                'A qualquer momento da entrevista você poderá solicitar esclarecimentos, recusar-se a participar ou desistir da entrevista. Mas, se concordar em participar, sua colaboração vai contribuir para conhecermos a realidade indígena do país e podermos lutar por ações que garantam alimentação suficiente e saudável para os povos indígenas no Brasil.',
              ],
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
