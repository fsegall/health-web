import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { acidentesOptionsArray, causasDoencasVenenoLavouraOptionsArray, condicaoSaudeOptionsArray, condicaoSaudeTekohaOptionsArray, familiarMorteCovidArray, medicamentosUsoContinuoOptionsArray, motivoMedicamentoUsoContinuoArray, motivosNaoTomarVacinaCovidOptionsArray, recorreAoAdoecerOptionsArray, tratamentosOptionsArray, tratamentosPajeOptionsArray, vacinaCovidOptionsArray, violenciaFisicaOptionsArray, yesOrNoOptionsArray } from "../../questions/SelectorOptions/options";

export interface FormHelperType {
    label: string;
    type: React.FC<any>;
    props: {
        name: string;
        placeholder?: string;
        isMulti?: boolean;
        options?: Array<any>;
        type?: 'text' | 'textarea' | 'number';
    };
}

export const saudeDoencaFormHelper: FormHelperType[][] = [
    [
        {
            label: 'Você já tomou a vacina da Covid-19? (APENAS PARA O RESPONDENTE)',
            type: Select,
            props: {
                name: 'tomou_vacina_covid',
                options: vacinaCovidOptionsArray,
            }
        },
        {
            label: 'Por que você não tomou a vacina da Covid-19?',
            type: Select,
            props: {
                name: 'motivo_nao_tomar_vacina_covid',
                options: motivosNaoTomarVacinaCovidOptionsArray,
            }
        },
        {
            label: 'AGORA EU QUERO PEDIR LICENÇA PARA FAZER ALGUMAS PERGUNTAS SOBRE OUTRAS DOENÇAS NA SUA FAMÍLIA, SE NÃO QUISER RESPONDER NÃO TEM PROBLEMA. Vocês perderam alguém (morreu alguém), que morava nesta casa, por Covid-19, DESDE O INÍCIO DA PANDEMIA EM 2020?',
            type: Select,
            props: {
                name: 'familiar_morte_covid',
                options: familiarMorteCovidArray,
            }
        },
        {
            label: 'Essa pessoa contribuía para a renda da família?',
            type: Select,
            props: {
                name: 'familiar_morte_covid_contribuia_renda_familiar',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'Nos últimos 12 meses morreu alguma(s) pessoa(s)  moradora(s) desta casa, por qualquer outra causa? ATENÇÃO: AQUI É MELHOR O (A) ENTREVISTADOR(A)  EXPLICITAR:  DO MÊS   XX  ATÉ ONTEM. TAMBÉM ATENTAR PARA O FATO QUE PODE TER HAVIDO MAIS DE UM ÓBITO',
            type: Select,
            props: {
                name: 'familiares_morte_outras_causas',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'Se sim, qual (quais) foi (foram) a(s) causa(s)?',
            type: Input,
            props: {
                name: 'motivo_familiares_morte_outras_causas',
                placeholder: 'Digite as causas'
            }
        },
        {
            label: 'Essa(s)  pessoa(s) que faleceu (faleceram) contribuía(m) para a renda familiar?',
            type: Select,
            props: {
                name: 'familiares_morte_outras_causas_contribuia_renda_familiar',
                options: yesOrNoOptionsArray,
            }
        },
    ],
    [
        {
            label: 'Como você considera a sua saúde hoje?',
            type: Select,
            props: {
                name: 'condicao_de_saude',
                options: condicaoSaudeOptionsArray,
            }
        },
        {
            label: 'Atenção: Pergunta ESPECÍFICA PARA OS GUARANI KAIOWA: Viver no Tekoha retomado mudou a condição de saúde sua ou de sua família?',
            type: Select,
            props: {
                name: 'tekoha_mudou_condicao_de_saude',
                options: condicaoSaudeTekohaOptionsArray,
            }
        },
        {
            label: 'Nos últimos 6 meses, você ou algum morador desta casa foi exposto ao veneno de lavoura?',
            type: Select,
            props: {
                name: 'morador_exposto_veneno_lavoura',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'Se Sim, nos últimos 6 meses, você ou alguém da sua casa FICOU DOENTE, por CAUSA DE contato ou consumo de veneno de lavoura?',
            type: Select,
            props: {
                name: 'doencas_contato_veneno_lavoura',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'Se sim, porque?',
            type: Select,
            props: {
                name: 'motivo_doencas_contato_veneno_lavoura',
                options: causasDoencasVenenoLavouraOptionsArray,
            }
        },
        {
            label: 'Nos últimos 6 meses alguém desta casa teve algum tipo de acidente?',
            type: Select,
            props: {
                name: 'acidentes',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'SE sim, qual tipo de acidente? ( Atenção: pode ler a lista de acidentes)',
            type: Select,
            props: {
                name: 'acidentes_ocorridos',
                options: acidentesOptionsArray,
                isMulti: true,
            }
        },
        {
            label: 'Nos últimos 6 meses você ou alguém de sua família sofreu algum tipo de ameaça de agressão física, patrimonial (danificar pertences, por exemplo a queima da casa ou de alimentos) ou espiritual (feitiço)?',
            type: Select,
            props: {
                name: 'ocorrencia_de_ameacas',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'Nos últimos 6 meses alguém desta casa sofreu algum tipo de violência física?',
            type: Select,
            props: {
                name: 'ocorrencia_violencia_fisica',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'Se SIM, onde foi praticada essa violência física? (pode ser mais de uma resposta)',
            type: Select,
            props: {
                name: 'local_ocorrencia_violencia_fisica',
                options: violenciaFisicaOptionsArray,
                isMulti: true,
            }
        },
        {
            label: 'No último 6 meses você fez tratamento para: ATENÇÃO (LER A LISTA) (+1)',
            type: Select,
            props: {
                name: 'lista_tratamentos',
                options: tratamentosOptionsArray,
                isMulti: true,
            }
        },
    ],
    [
        {
            label: 'Nos últimos 6 meses você fez algum tratamento com o pajé/benzedor/Ñanderu/Ñandesy?',
            type: Select,
            props: {
                name: 'tratamento_com_paje_ou_similar',
                options: tratamentosPajeOptionsArray,
            }
        },
        {
            label: 'Nos últimos 6 meses você fez tratamento de cura na igreja?',
            type: Select,
            props: {
                name: 'tratamento_igreja',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'Você toma algum medicamento todos os dias?',
            type: Select,
            props: {
                name: 'medicacao_uso_continuo',
                options: medicamentosUsoContinuoOptionsArray,
            }
        },
        {
            label: 'Se SIM, para quê (que problema/doença/motivo)?',
            type: Select,
            props: {
                name: 'doenca_medicacao_uso_continuo',
                options: motivoMedicamentoUsoContinuoArray,
                isMulti: true,
            }
        },
        {
            label: 'Quando você fica doente o que você faz primeiro:',
            type: Select,
            props: {
                name: 'primeiro_recurso_ao_notar_doenca',
                options: recorreAoAdoecerOptionsArray,
            }
        },
        {
            label: 'Nos últimos 6 meses alguém desta casa ficou internado?',
            type: Select,
            props: {
                name: 'morador_internado',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'Alguém desta casa tem problemas com bebidas alcoólicas?',
            type: Select,
            props: {
                name: 'morador_problemas_bebidas_alcoolicas',
                options: yesOrNoOptionsArray,
            }
        },
        {
            label: 'Alguém desta casa tem problemas com uso de drogas (fuma alguma droga?)?',
            type: Select,
            props: {
                name: 'morador_problemas_uso_drogas',
                options: yesOrNoOptionsArray,
            }
        },
    ]
]