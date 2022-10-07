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
    };
    hasDependencies?: boolean;
    dependencies?: { [key: string]: string[]; };
}

export const apoioProtecaoSocialFormHelper: FormHelperType[][] = [
    [
        {
            label: 'Você ou alguém da sua casa está matriculado na educação básica pública (educação infantil, ensino fundamental, ensino médio e educação de jovens e adultos)?',
            type: Select,
            props: {
                name: 'morador_matriculado_na_educacao_basica_publica',
                options: handleValueLabelOption(options?.yesOrNoOptions),
                isMulti: false,
            },
            hasDependencies: true
        },
        {
            label: ' Se sim, quantas pessoas?',
            type: Input,
            props: {
                name: 'quantidade_morador_matriculado_na_educacao_basica_publica',
                type: 'number',
            },
            dependencies: {
                morador_matriculado_na_educacao_basica_publica: ["true"]
            }
        },
        {
            label: 'As crianças dessa casa comem na escola? (merenda escolar)',
            type: Select,
            props: {
                name: 'criancas_comem_na_escola',
                options: handleValueLabelOption(options?.criancasComemNaEscola),
                isMulti: false,
            },
            dependencies: {
                morador_matriculado_na_educacao_basica_publica: ["true"]
            }
        },
        {
            label: 'A alimentação na escola (merenda escolar) inclui alimentos da tradição/ da cultura?',
            type: Select,
            props: {
                name: 'escola_inclui_alimentos_da_cultura',
                options: handleValueLabelOption(options?.merendaEscolarIncluiAlimentosTradicionais),
                isMulti: false,
            },
            dependencies: {
                morador_matriculado_na_educacao_basica_publica: ["true"]
            }
        },
    ],
    [
        {
            label: 'Algum morador desta casa recebe alguma ajuda em dinheiro?',
            type: Select,
            props: {
                name: 'morador_recebe_ajuda_financeira',
                options: handleValueLabelOption(options?.yesOrNoOptions),
                isMulti: false,
            },
        },
        {
            label: 'Se SIM, nos últimos 3 meses, você ou alguém da sua família recebeu de que programa? Bolsa Família/Auxílio Brasil?',
            type: Select,
            props: {
                name: 'bolsa_familia_auxilio_brasil',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            },
            hasDependencies: true
        },
        {
            label: 'Benefício de Prestação continuada (BPC)',
            type: Select,
            props: {
                name: 'bpc',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Benefício para deficientes ou Idosos',
            type: Select,
            props: {
                name: 'beneficio_deficientes_ou_idosos',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Auxílio maternidade',
            type: Select,
            props: {
                name: 'auxilio_maternidade',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Auxílio doença',
            type: Select,
            props: {
                name: 'auxilio_doenca',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Auxílio reclusão',
            type: Select,
            props: {
                name: 'auxilio_reclusao',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Aposentadoria',
            type: Select,
            props: {
                name: 'aposentadoria',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Pensão morte cônjuge',
            type: Select,
            props: {
                name: 'pensao_morte_conjuge',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Pronaf (Fortalecimento agricultura familiar)',
            type: Select,
            props: {
                name: 'pronaf',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Programa de auxilio estadual/ municipal',
            type: Select,
            props: {
                name: 'auxilio_estadual_ou_municipal',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Cesta de alimentos',
            type: Select,
            props: {
                name: 'cesta_de_alimentos',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            },
            hasDependencies: true
        },
        {
            label: 'SE respondeu SIM para recebimento de cestas, quantas recebeu nos últimos três meses',
            type: Input,
            props: {
                name: 'quantidade_cesta_de_alimentos_3m',
                type: 'number'
            },
            dependencies: {
                cesta_de_alimentos: ["sim"]
            }
        },
        {
            label: 'De onde era a cesta de alimentos? (pode ter recebido mais de 1 cesta) ',
            type: Select,
            props: {
                name: 'origem_cesta_de_alimentos_3m',
                options: handleValueLabelOption(options?.origemCestaAlimentos),
                isMulti: true,
            },
            dependencies: {
                cesta_de_alimentos: ["sim"]
            }
        },
        {
            label: 'Se recebe cesta de alimentos, que alimentos você acha que deveriam ter na cesta e que não tem?',
            type: Select,
            props: {
                name: 'alimentos_deveriam_estar_na_cesta_e_nao_estao',
                options: handleValueLabelOption(options?.listaDeAlimentos),
                isMulti: true,
            },
            dependencies: {
                cesta_de_alimentos: ["sim"]
            }
        },
        {
            label: 'Outros alimentos que deveriam ser adicionado',
            type: Input,
            props: {
                name: 'descricao_adicionar_outro',
                type: 'text',
            },
            dependencies: {
                cesta_de_alimentos: ["sim"],
            }
        },
        {
            label: 'Se recebe cesta de alimentos, que alimentos você acha que NÃO DEVERIAM estar na cesta?',
            type: Select,
            props: {
                name: 'alimentos_que_nao_deveriam_estar_na_cesta',
                options: handleValueLabelOption(options?.listaDeAlimentos),
                isMulti: true,
            },
            dependencies: {
                cesta_de_alimentos: ["sim"]
            }
        },
        {
            label: 'Outros alimento que não deveriam estar na cesta',
            type: Input,
            props: {
                name: 'descricao_remover_outro',
                type: 'text',
            },
            dependencies: {
                cesta_de_alimentos: ["sim"],
            }
        },
        {
            label: 'Se NÃO recebe a cesta de alimentos, por que não recebe?',
            type: Select,
            props: {
                name: 'motivo_nao_recebe_cesta_de_alimentos',
                options: handleValueLabelOption(options?.motivosNaoReceberCesta),
                isMulti: false,
            },
            dependencies: {
                cesta_de_alimentos: ["nao"]
            }
        },
        {
            label: 'Para quem respondeu SIM na 103: Quem pega o dinheiro do Bolsa Família/Auxílio Brasil para esta casa?',
            type: Select,
            props: {
                name: 'quem_pega_dinheiro_bolsa_familia',
                options: handleValueLabelOption(options?.recebeODinheiroDoAuxilio),
                isMulti: false,
            },
            dependencies: {
                bolsa_familia_auxilio_brasil: ["sim"]
            }
        },
    ],
    [
        {
            label: 'Na época da pandemia, você ou outra pessoa que mora na sua casa recebeu o auxílio emergencial?',
            type: Select,
            props: {
                name: 'auxilio_emergencial_na_pandemia',
                options: handleValueLabelOption(options?.yesOrNoOptions),
                isMulti: false,
            },
            hasDependencies: true
        },
        {
            label: 'Se sim, quantas vezes recebeu o auxílio?',
            type: Select,
            props: {
                name: 'quantidade_vezes_auxilio_emergencial_na_pandemia',
                options: handleValueLabelOption(options?.quantidadeDeVezesAuxilio),
                isMulti: false,
            },
            dependencies: {
                auxilio_emergencial_na_pandemia: ["true"]
            }
        },
        {
            label: 'Nos últimos 3 meses, você ou alguém da sua casa recebeu ajuda do estado, da prefeitura, de outra instituição, associação, movimento indígena, movimentos sociais, igreja, amigos, parentes ou outros?',
            type: Select,
            props: {
                name: 'ajuda_estado_prefeitura_outros_3m',
                options: handleValueLabelOption(options?.yesOrNoOptions),
                isMulti: false,
            },
            hasDependencies: true
        },
        {
            label: 'Caso você ou alguém da sua casa tenha recebido ajuda, o que recebeu?',
            type: Select,
            props: {
                name: 'itens_recebidos_ajuda_estado_prefeitura_outros_3m',
                options: handleValueLabelOption(options?.tipoDeAuxilioRecebido),
                isMulti: false,
            },
            dependencies: {
                ajuda_estado_prefeitura_outros_3m: ["true"]
            }
        },
        {
            label: 'Nos últimos 3 meses, para conseguir alimentos, você ou outra pessoa que mora na sua casa, teve que fazer alguma coisa que causou vergonha, tristeza ou constrangimento?',
            type: Select,
            props: {
                name: 'vergonha_constrangimento_para_conseguir_alimentos_3m',
                options: handleValueLabelOption(options?.yesOrNoOptions),
                isMulti: false,
            }
        },
    ]
]