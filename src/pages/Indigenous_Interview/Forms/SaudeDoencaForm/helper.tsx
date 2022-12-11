import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { acidentesOptions, causasDoencasVenenoLavouraOptions, condicaoSaudeOptions, condicaoSaudeTekohaOptions, familiarMorteOptions, familiarMorteRendaOptions, medicamentosUsoContinuoOptions, motivoMedicamentoUsoContinuo, motivosNaoTomarVacinaCovidOptions, recorreAoAdoecerOptions, tiposAcidenteOptions, tratamentosOptions, tratamentosPajeOptions, vacinaCovidOptions, violenciaFisicaOptions, yesOrNoOptions } from "../../questions/SelectorOptions/options";

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
    hasDependencies?: boolean;
    dependencies?: { [key: string]: string[]; };
}

export const saudeDoencaFormHelper: FormHelperType[][] = [
    [
        {
            label: 'Você já tomou a vacina da Covid-19? (APENAS PARA O RESPONDENTE)',
            type: Select,
            props: {
                name: 'tomou_vacina_covid',
                options: handleValueLabelOption(vacinaCovidOptions),
            },
            hasDependencies: true,
        },
        {
            label: 'Por que você não tomou a vacina da Covid-19?',
            type: Select,
            props: {
                name: 'motivo_nao_tomar_vacina_covid',
                options: handleValueLabelOption(motivosNaoTomarVacinaCovidOptions),
            },
            dependencies: {
                tomou_vacina_covid: ["nao"],
            }
        },
        {
            label: 'AGORA EU QUERO PEDIR LICENÇA PARA FAZER ALGUMAS PERGUNTAS SOBRE OUTRAS DOENÇAS NA SUA FAMÍLIA, SE NÃO QUISER RESPONDER NÃO TEM PROBLEMA. Nos últimos 12 meses morreu alguma(s) pessoa(s)  moradora(s) desta casa, por Covid-19 ou outra causa?',
            type: Select,
            props: {
                name: 'familiar_morte',
                options: handleValueLabelOption(familiarMorteOptions),
            },
            hasDependencies: true,
        },
        {
            label: 'Essa(s) pessoa(s) que morreu (morreram) ajudava(m) com o sustento da família? ',
            type: Select,
            props: {
                name: 'familiar_morte_contribuia_renda_familiar',
                options: handleValueLabelOption(familiarMorteRendaOptions),
            },
            dependencies: {
              familiar_morte: [
                    "covid_uma_pessoa",
                    "covid_mais_de_um",
                    "outras_causas_uma_ou_mais_pessoas",
                ],
            }
        },
    ],
    [
        {
            label: 'Como você considera a sua saúde hoje?',
            type: Select,
            props: {
                name: 'condicao_de_saude',
                options: handleValueLabelOption(condicaoSaudeOptions),
            }
        },
        {
            label: 'Atenção: Pergunta ESPECÍFICA PARA OS GUARANI KAIOWA: Viver no Tekoha retomado mudou a condição de saúde sua ou de sua família?',
            type: Select,
            props: {
                name: 'tekoha_mudou_condicao_de_saude',
                options: handleValueLabelOption(condicaoSaudeTekohaOptions),
            }
        },
        {
            label: 'Nos últimos 12 meses, você ou alguém desta casa foi exposto (teve contato) a veneno de lavoura?',
            type: Select,
            props: {
                name: 'morador_exposto_veneno_lavoura',
                options: handleValueLabelOption(yesOrNoOptions),
            },
            hasDependencies: true,
        },
        {
            label: 'Se Sim, nos últimos 12 meses, você ou alguém desta casa FICOU DOENTE, por causa do veneno de lavoura?',
            type: Select,
            props: {
                name: 'doencas_contato_veneno_lavoura',
                options: handleValueLabelOption(yesOrNoOptions),
            },
            hasDependencies: true,
            dependencies: {
                morador_exposto_veneno_lavoura: [
                    "true",
                ],
            }
        },
        {
            label: 'Se sim, porque?',
            type: Select,
            props: {
                name: 'motivo_doencas_contato_veneno_lavoura',
                options: handleValueLabelOption(causasDoencasVenenoLavouraOptions),
            },
            dependencies: {
                doencas_contato_veneno_lavoura: [
                    "true",
                ],
            }
        },
        {
            label: ' Nos últimos 12 meses alguém desta casa teve algum tipo de acidente com: (LER AS OPÇÕES) (PODE TER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'acidentes',
                options: handleValueLabelOption(tiposAcidenteOptions),
                isMulti: true
              },
            hasDependencies: true,
        },
        {
            label: 'Se teve algum acidente nos últimos 12 meses, que tipo de acidente aconteceu? (PODE TER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'acidentes_ocorridos',
                options: handleValueLabelOption(acidentesOptions),
                isMulti: true,
            },
            dependencies: {
                acidentes: [
                  "trabalho",
                  "domestico",
                  "redor_da_casa",
                  "fora_da_comunidade",
                ],
            }
        },
        {
            label: 'Nos últimos 12 meses você ou alguém de sua família sofreu algum tipo de ameaça de agressão física, patrimonial (danificar pertences, por exemplo a queima da casa ou de alimentos) ou espiritual (feitiço)?',
            type: Select,
            props: {
                name: 'ocorrencia_de_ameacas',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
        {
            label: 'Nos últimos 12 meses alguém desta casa sofreu algum tipo de violência física?',
            type: Select,
            props: {
                name: 'ocorrencia_violencia_fisica',
                options: handleValueLabelOption(yesOrNoOptions),
            },
            hasDependencies: true,
        },
        {
            label: 'Se SIM, onde aconteceu a violência física? PODE TER MAIS DE 1 RESPOSTA). REFORÇAR QUE É SIGILOSO (segredo)',
            type: Select,
            props: {
                name: 'local_ocorrencia_violencia_fisica',
                options: handleValueLabelOption(violenciaFisicaOptions),
                isMulti: true,
            },
            dependencies: {
                ocorrencia_violencia_fisica: [
                    "true",
                ],
            }
        },
        {
            label: ' Nos últimos 12 meses você fez tratamento para: ATENÇÃO: LER AS OPÇÕES. (PODE TER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'lista_tratamentos',
                options: handleValueLabelOption(tratamentosOptions),
                isMulti: true,
            }
        },
    ],
    [
        {
            label: 'Nos últimos 12 meses você fez tratamento com o pajé/benzedor/Ñanderu/Ñandesy?',
            type: Select,
            props: {
                name: 'tratamento_com_paje_ou_similar',
                options: handleValueLabelOption(tratamentosPajeOptions),
            }
        },
        {
            label: 'Nos últimos 12 meses você fez tratamento de cura na igreja?',
            type: Select,
            props: {
                name: 'tratamento_igreja',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
        {
            label: 'Você toma algum medicamento todos os dias? (ou anticoncepcional de injeção)?',
            type: Select,
            props: {
                name: 'medicacao_uso_continuo',
                options: handleValueLabelOption(medicamentosUsoContinuoOptions),
            },
            hasDependencies: true,
        },
        {
            label: 'Se SIM, para quê (que problema/doença/motivo)?',
            type: Select,
            props: {
                name: 'doenca_medicacao_uso_continuo',
                options: handleValueLabelOption(motivoMedicamentoUsoContinuo),
                isMulti: true,
            },
            dependencies: {
                medicacao_uso_continuo: [
                    "remedios",
                    "ervas",
                    "remedios_e_ervas",
                ],
            }
        },
        {
            label: 'Quando você fica doente o que você faz primeiro:',
            type: Select,
            props: {
                name: 'primeiro_recurso_ao_notar_doenca',
                options: handleValueLabelOption(recorreAoAdoecerOptions),
            }
        },
        {
            label: 'Nos últimos 12 meses alguém desta casa ficou internado?',
            type: Select,
            props: {
                name: 'morador_internado',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
        {
            label: 'Alguém desta casa tem problemas com bebidas alcoólicas? Lembrar que é sigiloso',
            type: Select,
            props: {
                name: 'morador_problemas_bebidas_alcoolicas',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
        {
            label: 'Você fuma cigarro?',
            type: Select,
            props: {
                name: 'morador_fuma_cigarro',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
        {
            label: 'Alguém desta casa tem problemas com uso de drogas (fuma, cheira ou aplica, alguma droga)?',
            type: Select,
            props: {
                name: 'morador_problemas_uso_drogas',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
    ]
]
