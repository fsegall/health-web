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
            label: 'ESPECÍFICA PARA OS GUARANI KAIOWÁ: A partir do momento que veio morar na retomada, como você avalia sua alimentação e da sua família? Melhorou, piorou e por que? (PODE TER MAIS DE 1 RESPOSTA).',
            type: Select,
            props: {
                name: 'morar_retomada_mudou_alimentacao',
                isMulti: true,
                options: handleValueLabelOption(options?.avaliaAlimentacaoRetomada)
            }
        },
        {
            label: 'Você, sua família ou alguém da comunidade ficou sem alimentação por causa de conflito pela terra?',
            type: Select,
            props: {
                name: 'sem_alimentacao_por_conflito_com_terras',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true,
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
            label: 'Agora vou te perguntar sobre como está a alimentação na sua casa. Aqui na sua casa tem moradores MENORES DE 16 ANOS?',
            type: Select,
            props: {
                name: 'possui_moradores_menores_de_16',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: 'No mês passado, você sentiu preocupação em conseguir comida para sua casa?',
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
            label: 'No mês passado, vocês nesta casa comeram sempre comida boa (do gosto)?',
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
            label: 'Vocês nesta casa, no mês passado comeram sempre (TODOS OS DIAS) o que faz bem para saúde, comida saudável?',
            type: Select,
            props: {
                name: 'alimentacao_saudavel_diariamente_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: 'No mês passado na sua casa teve comida todos os dias?',
            type: Select,
            props: {
                name: 'comida_disponivel_todos_os_dias_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: 'No mês passado, você ficou um dia todo sem comer nada, porque não tinha comida na casa?',
            type: Select,
            props: {
                name: 'dia_sem_alimentos_30d',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            },
            hasDependencies: true
        },
        {
            label: 'No mês passado, teve dia que você comeu menos para deixar comida para as crianças e jovens da casa?',
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
            label: 'Alguma vez no mês passado as crianças e jovens da casa comeram menos quantidade de comida do que o necessário, porque tinha pouca comida na casa?',
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
            label: 'Alguma vez no mês passado as crianças e jovens da casa passaram o dia todo com comer e foram dormir querendo comer porque não tinha comida?',
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
            label: 'No mês passado, teve alguns dias que vocês desta casa não puderam comer comida de sua cultura, porque não tinha esse tipo de comida? (Por exemplo: mandioca, milho, banana, abóbora, etc)',
            type: Select,
            props: {
                name: 'consumiram_sempre_alimentos_da_cultura',
                isMulti: false,
                options: handleValueLabelOption(options?.yesOrNoOptions)
            }
        },
        {
            label: 'QUANDO falta comida na casa, o que você faz para conseguir comida? LER AS OPÇÕES. (PODE TER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'acao_quando_falta_comida',
                isMulti: true,
                options: handleValueLabelOption(options?.acaoFaltaDeComida)
            },
            // dependencies: {
            //     alimentacao_saudavel_diariamente_30d: ["false"],
            //     alimentacao_do_gosto_30d: ["false"],
            //     comida_disponivel_todos_os_dias_30d: ["false"],
            //     dia_sem_alimentos_30d: ["true"],
            //     comeu_menos_para_alimentar_os_jovens_30d: ["true"],
            // },
            // dependenciesWithOr: true,
        },
    ],
    [
        {
            label: 'Você, ou alguém desta casa, faz roça ou horta? (Pode ser fora da casa ou comunitária)',
            type: Select,
            props: {
                name: 'morador_faz_horta',
                isMulti: false,
                options: handleValueLabelOption(options?.rocaOuHortaOptions)
            },
            hasDependencies: true,
        },
        {
            label: ' Se não, por que não faz roça/horta? (PODE TER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'motivo_morador_nao_faz_horta',
                isMulti: true,
                options: handleValueLabelOption(options?.motivacaoNaoProduzirHorta)
            },
            dependencies: {
                morador_faz_horta: ["nao"]
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
                morador_faz_horta: ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"]
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
                morador_faz_horta: ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"]
            }
        },
        {
            label: 'Conseguem ter produção de comida para sustento da casa?',
            type: Select,
            props: {
                name: 'producao_de_comida_ano_todo',
                isMulti: false,
                options: handleValueLabelOption(options?.producaoComidaAnoTodo)
            },
            dependencies: {
                morador_faz_horta: ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"]
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
                morador_faz_horta: ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"]
            }
        },
        {
            label: 'Como são guardadas as sementes que vão ser plantadas ou que foram colhidas?',
            type: Select,
            props: {
                name: 'armazenamento_semente_plantio',
                isMulti: true,
                options: handleValueLabelOption(options?.armazenamentoSementesPlantio)
            },
            dependencies: {
                morador_faz_horta: ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"]
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
                morador_faz_horta: ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"]
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
                morador_faz_horta: ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"]
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
                morador_faz_horta: ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"]
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
            label: 'Se sim, onde vocês compram comida? (PODE TER MAIS DE 1 RESPOSTA)',
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
            label: 'Aqui na casa se cozinha no fogão à gás ou na lenha?',
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
