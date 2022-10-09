
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
      label: 'Ingígena'
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
                'Você está sendo convidado (a) a participar, como voluntário (a) de nossa pesquisa, por meio de entrevista. Este projeto tem por objetivo avaliar a insegurança alimentar durante a pandemia do novo coronavírus ou Covid-19, em uma pesquisa nacional. Serão algumas perguntas sobre você e seus familiares; outras serão referentes às condições sobre a casa, o trabalho, a saúde e a alimentação.',
                'Todas as informações que você fornecer serão confidenciais e os resultados que serão divulgados não conterão quaisquer dados pessoais de identificação. A qualquer momento você poderá solicitar maiores esclarecimentos, recusar-se a participar ou desistir da entrevista. Mas, se concordar em respondê-la, sua participação contribuirá para melhorar as ações de enfrentamento da pandemia e de seus efeitos sobre a alimentação dos brasileiros.',
            ],
            contact: 'Em caso de dúvidas sobre a pesquisa, você poderá entrar em contato com a Rede Brasileira de Pesquisa em Soberania e Segurança Alimentar e Nutricional (RedePenSSAN) através do e-mail: rbpssan@gmail.com'
        }
    , 'indigenous': {
            title: 'TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO – APLICATIVO VIGISAN',
            description: [
                'Você está sendo convidado (a) a participar, como voluntário (a) de nossa pesquisa, por meio de entrevista. Este projeto tem por objetivo avaliar a insegurança alimentar durante a pandemia do novo coronavírus ou Covid-19, E APÓS A PANDEMIA, ENTRE POVOS INDÍGENAS NO BRASIL, ESTAMOS COMEÇANDO AQUI NO MATOGROSSO DO SUL.',
                'As perguntas serão sobre algumas informações sobre você e seus familiares, a respeito da casa, do trabalho, da saúde e da alimentação',
                'Todas as informações que você fornecer serão confidenciais (VÃO SER MANTIDAS EM SEGREDO). Os resultados que serão divulgados vão mostrar todas as entrevistas juntas, por isso não vão conter dados pessoais de identificação',
                'A qualquer momento da entrevista você pode solicitar esclarecimentos, recusar-se a participar ou desistir da entrevista. Mas, se concordar em participar da pesquisa sua colaboração vai contribuir para melhorar as ações de garantia de alimentação suficiente e saudável para todos os povos indígenas no Brasil, principalmente o povo de comunidades indígenas do Mato grosso do Sul',
                'A equipe do projeto manterá um canal de informação, pela disponibilização de e-mail dos pesquisadores, sendo os dados divulgados em ações da Rede PENSSAN. O entrevistador que está em contato com você tem todos os contatos necessários. ',
            ],
            contact: 'Se durante a pesquisa você tiver alguma dúvida, ou quiser solicitar algum esclarecimento, poderá entrar em contato com pesquisadora que coordena o projeto (Professora Verônica Luz e.…,  ou com o Comitê de Ética em Pesquisa (CEP) ............... nos contatos a seguir.'
        }
    }
    return {
        options: projectTypeOptions,
        acceptInfo: acceptInfo[type],
        interviewPath: interviewURL[type]
    }
}

export default useGetProjectsTypes