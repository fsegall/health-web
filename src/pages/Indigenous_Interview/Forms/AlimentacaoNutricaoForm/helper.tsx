import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import * as options from "../../questions/SelectorOptions/options";

export interface FormHelperType {
    label: string;
    type: React.FC<any>;
    props: {
        name: string;
        placeholder?: string;
        isMulti?: boolean;
        options?: Array<any>;
        type?: 'text' | 'textarea' | 'number';
    },
    hasDependencies?: boolean;
    dependencies?: { [key: string]: string[]; };
    dependenciesWithOr?: boolean;
}

export const alimentacaoNutricaoFormHelper: FormHelperType[][] = [
    [
        {
            label: 'ESPECÍFICA PARA OS GUARANI KAIOWÁ: A partir do momento que veio morar na retomada, como você avalia sua alimentação e da sua família? (melhorou, piorou e por que?)',
            type: Select,
            props: {
                name: 'morar_retomada_mudou_alimentacao',
                isMulti: false,
                options: handleValueLabelOption(options?.avaliaAlimentacaoRetomada)
            }
        },
        {
            label: 'VOCÊ E OS MORADORES DESTA CASA VIVEM EM SITUAÇÃO DE CONFLITO POR CAUSA DA LUTA PELA Terra?',
            type: Select,
            props: {
                name: 'luta_por_terra',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: 'Se sim, você, sua família ou alguém da comunidade ficaram sem alimentação por causa de conflito pela terra?',
            type: Select,
            props: {
                name: 'sem_alimentacao_por_conflito_com_terras',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true,
            dependencies: {
                luta_por_terra: ["true"]
            }
        },
        {
            label: 'Se sim, por que?',
            type: Select,
            props: {
                name: 'motivo_sem_alimentacao_por_conflito_com_terras',
                isMulti: false,
                options: handleValueLabelOption(options?.semAlimentosPorConflitos)
            },
            dependencies: {
                sem_alimentacao_por_conflito_com_terras: ["true"]
            }
        },
        {
            label: 'De onde vem a comida que tem na sua casa? (Ler. É possível marcar mais de uma)',
            type: Select,
            props: {
                name: 'origem_comida',
                isMulti: true,
                options: handleValueLabelOption(options?.origemAlimento)
            }
        },
        {
            label: 'Aqui na sua casa tem moradores MENORES DE 16 ANOS?',
            type: Select,
            props: {
                name: 'possui_moradores_menores_de_16',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: '69. No mês passado, você sentiu preocupação em conseguir comida para sua casa?',
            type: Select,
            props: {
                name: 'preocupacao_em_conseguir_comida_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            dependencies: {
                possui_moradores_menores_de_16: ["false"]
            }
        },
        {
            label: '70. Vocês nesta casa, no mês passado comeram sempre (TODOS OS DIAS) o que faz bem para saúde, comida saudável?',
            type: Select,
            props: {
                name: 'alimentacao_saudavel_diariamente_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: '71. No mês passado, vocês nesta casa comeram sempre comida boa (do gosto)?',
            type: Select,
            props: {
                name: 'alimentacao_do_gosto_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            dependencies: {
                possui_moradores_menores_de_16: ["false"]
            },
            hasDependencies: true
        },
        {
            label: '72. No mês passado na sua casa teve comida todos os dias?',
            type: Select,
            props: {
                name: 'comida_disponivel_todos_os_dias_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: '73. No mês passado, teve dia de você passar o dia todo sem comer nada, porque não tinha comida na casa?',
            type: Select,
            props: {
                name: 'dia_sem_alimentos_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: '74. No mês passado, teve dia que você comeu menos para deixar comida para as crianças e jovens da casa?',
            type: Select,
            props: {
                name: 'comeu_menos_para_alimentar_os_jovens_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true,
            dependencies: {
                possui_moradores_menores_de_16: ["true"]
            }
        },
        {
            label: '75. Alguma vez no mês passado as crianças e jovens da casa comeram menos quantidade de comida do que é necessário, porque tinha pouca comida?',
            type: Select,
            props: {
                name: 'jovens_comeram_menos_do_necessario_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            dependencies: {
                possui_moradores_menores_de_16: ["true"]
            }
        },
        {
            label: '76. Alguma vez no mês passado as crianças e jovens da casa passaram o dia todo sem comer e foram dormir querendo comer porque não tinha comida?',
            type: Select,
            props: {
                name: 'jovens_passaram_algum_dia_sem_alimentos_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            dependencies: {
                possui_moradores_menores_de_16: ["true"],
            }
        },
        {
            label: '77. No mês passado, vocês desta casa comeram sempre comida de sua cultura citar os exemplos os principais alimentos de uso (mandioca, milho, banana, abobrinha, etc?',
            type: Select,
            props: {
                name: 'consumiram_sempre_alimentos_da_cultura',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            }
        },
        {
            label: 'QUANDO falta comida na casa (o que você faz para conseguir comida? Atenção: Ler a lista e pode ser mais de uma resposta:',
            type: Select,
            props: {
                name: 'acao_quando_falta_comida',
                isMulti: true,
                options: handleValueLabelOption(options?.acaoFaltaDeComida)
            },
            dependencies: {
                alimentacao_saudavel_diariamente_30d: ["false"],
                alimentacao_do_gosto_30d: ["false"],
                comida_disponivel_todos_os_dias_30d: ["false"],
                dia_sem_alimentos_30d: ["true"],
                comeu_menos_para_alimentar_os_jovens_30d: ["true"],
            },
            dependenciesWithOr: true,
        },
    ],
    [
        {
            label: 'Você, ou alguém desta casa, faz roça ou horta? (Pode ser fora da casa ou comunitária)',
            type: Select,
            props: {
                name: 'morador_faz_horta',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true,
        },
        {
            label: 'Por que não faz roça/horta? ATENÇÃO: PODE SER MAIS DE UMA RESPOSTA',
            type: Select,
            props: {
                name: 'motivo_morador_nao_faz_horta',
                isMulti: true,
                options: handleValueLabelOption(options?.motivacaoNaoProduzirHorta)
            },
            dependencies: {
                morador_faz_horta: ["false"]
            }
        },
        {
            label: 'Se tem roça/horta, o que você planta? ATENÇÃO CABEM VÁRIAS RESPOSTAS (+1)',
            type: Select,
            props: {
                name: 'alimentos_da_horta',
                isMulti: true,
                options: handleValueLabelOption(options?.plantiosHorta)
            },
            dependencies: {
                morador_faz_horta: ["true"]
            }
        },
        {
            label: 'E frutíferas, o que você tem aqui na casa ou próximo a ela? (+1)',
            type: Select,
            props: {
                name: 'frutiferas_nas_proximidades',
                isMulti: true,
                options: handleValueLabelOption(options?.frutiferasEmCasaOuProximo)
            },
            dependencies: {
                morador_faz_horta: ["true"]
            }
        },
        {
            label: 'Consegue ter produção de comida o ano todo?',
            type: Select,
            props: {
                name: 'producao_de_comida_ano_todo',
                isMulti: false,
                options: handleValueLabelOption(options?.producaoComidaAnoTodo)
            },
            dependencies: {
                morador_faz_horta: ["true"]
            }
        },
        {
            label: 'Onde vocês conseguem a semente ou rama para plantar? (+1)',
            type: Select,
            props: {
                name: 'origem_semente_plantio',
                isMulti: true,
                options: handleValueLabelOption(options?.fornecedorHorta)
            },
            dependencies: {
                morador_faz_horta: ["true"]
            }
        },
        {
            label: 'Se planta, coloca algum veneno?',
            type: Select,
            props: {
                name: 'adiciona_veneno_na_plantacao',
                isMulti: false,
                options: handleValueLabelOption(options?.utilizaVenenoPlantio)
            },
            dependencies: {
                morador_faz_horta: ["true"]
            }
        },
        {
            label: 'Tem alguma dificuldade com a roça/horta?',
            type: Select,
            props: {
                name: 'dificuldade_com_horta',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true,
            dependencies: {
                morador_faz_horta: ["true"]
            }
        },
        {
            label: 'Se sim, quais são as dificuldades? (Ler se a pessoa tiver dificuldade em lembrar) (+1)',
            type: Select,
            props: {
                name: 'lista_dificuldades_com_horta',
                isMulti: true,
                options: handleValueLabelOption(options?.dificuldadesHorta)
            },
            dependencies: {
                dificuldade_com_horta: ["true"]
            }
        },
        {
            label: 'A roça/horta desta casa/comunidade são: (Ler)',
            type: Select,
            props: {
                name: 'finalidade_horta',
                isMulti: false,
                options: handleValueLabelOption(options?.finalidadeHorta)
            },
            dependencies: {
                morador_faz_horta: ["true"]
            }
        },
    ],
    [
        {
            label: 'Você cria algum animal para comer ou vender?',
            type: Select,
            props: {
                name: 'animais_de_criacao_alimentacao_ou_venda',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: 'Se sim, quais animais? (+1)',
            type: Select,
            props: {
                name: 'lista_animais_de_criacao_alimentacao_ou_venda',
                isMulti: true,
                options: handleValueLabelOption(options?.criacaoAnimaisComerOuVender)
            },
            dependencies: {
                animais_de_criacao_alimentacao_ou_venda: ["true"]
            }
        },
        {
            label: 'Este domicílio tem água suficiente para os animais (dessedentação)?',
            type: Select,
            props: {
                name: 'domicilio_possui_agua_para_animais',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            }
        },
        {
            label: 'Este domicílio tem água suficiente para produção de alimentos?',
            type: Select,
            props: {
                name: 'domicilio_possui_agua_para_producao_alimentos',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            }
        },
        {
            label: 'Nos últimos 3 meses, você ou algum morador desta casa precisou comprar alimentos? (comida?)',
            type: Select,
            props: {
                name: 'precisou_comprar_alimentos_3m',
                isMulti: false,
                options: handleValueLabelOption(options?.necessidadeComprarAlimentos3m)
            },
            hasDependencies: true
        },
        {
            label: 'SE SIM NA ANTERIOR Nos últimos 3 meses, qual foi o tipo de lugar que você ou alguém da sua família compraram comida? (+1)',
            type: Select,
            props: {
                name: 'lugar_precisou_comprar_alimentos_3m',
                isMulti: true,
                options: handleValueLabelOption(options?.localCompraAlimentos3m)
            },
            dependencies: {
                precisou_comprar_alimentos_3m: [
                    "sim",
                    "troca_parentes",
                    "troca_mercado",
                ]
            }
        },
        {
            label: 'Nesta área tem cultivo de planta para remédio?',
            type: Select,
            props: {
                name: 'possui_cultivo_plantas_medicinais',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            }
        },
        {
            label: 'Faz remédio caseiro com plantas que NÃO tem em casa? (busca em algum outro lugar)',
            type: Select,
            props: {
                name: 'faz_remedios_com_plantas',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            }
        },
        {
            label: 'A casa tem fogão ? ATENÇÃO: PODE TER MAIS DE UMA PRESPOSTA',
            type: Select,
            props: {
                name: 'moradia_possui_fogao',
                isMulti: true,
                options: handleValueLabelOption(options?.casaPossuiFogao)
            }
        },
        {
            label: 'Que material usa predominantemente para fazer o fogo na hora de cozinhar? ATENÇÃO: LER SE HOUVER DÚVIDA)',
            type: Select,
            props: {
                name: 'material_utilizado_para_fazer_fogo',
                isMulti: false,
                options: handleValueLabelOption(options?.materialParaCozinhar)
            }
        },
        {
            label: 'Agora queremos saber mais sobre a sua alimentação. Ontem você comeu:',
            type: Select,
            props: {
                name: 'alimentos_consumidos_dia_anterior',
                isMulti: true,
                options: handleValueLabelOption(options?.alimentosConsumidosOntem)
            }
        },
        {
            label: 'Quando tem pouca comida na sua casa quem come primeiro?',
            type: Select,
            props: {
                name: 'primeiros_a_se_alimentar',
                isMulti: false,
                options: handleValueLabelOption(options?.primeiroAComer)
            }
        },
        {
            label: 'Quando tem pouca comida quem come por último?',
            type: Select,
            props: {
                name: 'ultimos_a_se_alimentar',
                isMulti: false,
                options: handleValueLabelOption(options?.ultimoAComer)
            }
        },
    ]
]