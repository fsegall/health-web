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
            label: 'As crianças dessa casa comem na escola? (merenda escolar)',
            type: Select,
            props: {
                name: 'criancas_comem_escola',
                options: handleValueLabelOption(options?.criancasComemNaEscola),
                isMulti: false,
            },
            hasDependencies: true
        },
        {
            label: 'A alimentação na escola (merenda escolar) inclui alimentos da tradição/ da cultura? (como por exemplo mandioca, banana, abobora, milho)',
            type: Select,
            props: {
                name: 'alimentacao_escolar_inclui_cultura',
                options: handleValueLabelOption(options?.merendaEscolarIncluiAlimentosTradicionais),
                isMulti: false,
            },
            dependencies: {
                criancas_comem_escola: ["sim", "nao", "nem_sempre"]
            }
        },
        {
            label: 'Algum morador desta casa recebe alguma ajuda em dinheiro? (qualquer ajuda ou benefício social)',
            type: Select,
            props: {
                name: 'morador_recebe_ajuda_financeira',
                options: handleValueLabelOption(options?.yesOrNoOptions),
                isMulti: false,
            },
        },
        {
          label: 'Nos últimos 3 meses, você ou alguém da sua família recebeu de que programa? Bolsa Família/Auxílio Brasil?',
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
                name: 'beneficio_deficientes_idosos',
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
    ],
    [
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
                name: 'pensao_morte',
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
                name: 'programa_auxilio_estadual_municipal',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            }
        },
        {
            label: 'Cesta de alimentos',
            type: Select,
            props: {
                name: 'cesta_alimentos',
                options: handleValueLabelOption(options?.apoioFinanceiro),
                isMulti: false,
            },
            hasDependencies: true
        },
        // {
        //     label: 'SE respondeu SIM para recebimento de cestas, quantas recebeu nos últimos três meses',
        //     type: Input,
        //     props: {
        //         name: 'quantidade_cesta_de_alimentos_3m',
        //         type: 'number'
        //     },
        //     dependencies: {
        //         cesta_alimentos: ["sim"]
        //     }
        // },
        {
            label: 'Se recebeu cesta(s) de alimentos, de onde era? (pode ter recebido mais de 1 cesta)',
            type: Select,
            props: {
                name: 'recebeu_cesta_alimentos',
                options: handleValueLabelOption(options?.origemCestaAlimentos),
                isMulti: true,
            },
            dependencies: {
                cesta_alimentos: ["sim"]
            }
        },
        {
            label: 'Se recebe cesta de alimentos, que itens ou alimentos você acha que deveriam ter na cesta e que não tem?',
            type: Select,
            props: {
                name: 'recebeu_cesta_alimentos_que_alimentos_deveriam_ter',
                options: handleValueLabelOption(options?.listaDeAlimentos),
                isMulti: true,
            },
            dependencies: {
                cesta_alimentos: ["sim"]
            }
        },
        {
            label: 'Outros alimentos que deveriam ser adicionados',
            type: Input,
            props: {
                name: 'descricao_adicionar_outro',
                type: 'text',
            },
            dependencies: {
                cesta_alimentos: ["sim"],
            }
        },
        {
            label: 'Se NÃO recebe a cesta de alimentos, por que não recebe?',
            type: Select,
            props: {
                name: 'motivo_nao_recebe_cesta_alimentos',
                options: handleValueLabelOption(options?.motivosNaoReceberCesta),
                isMulti: false,
            },
            dependencies: {
                cesta_alimentos: ["nao", "tentou"]
            }
        },
    ],
    [
        {
            label: 'Nos últimos 3 meses, você ou alguém da sua casa recebeu ajuda de alguma instituição não governamental (associação, movimento indígena, movimentos sociais, igreja, amigos, parentes ou outros)?',
            type: Select,
            props: {
                name: 'recebeu_ajuda_3m',
                options: handleValueLabelOption(options?.yesOrNoOptions),
                isMulti: false,
            },
            hasDependencies: true
        },
        {
            label: 'Caso você ou alguém da sua casa tenha recebido ajuda, o que recebeu?',
            type: Select,
            props: {
                name: 'o_que_recebeu_ajuda_3m',
                options: handleValueLabelOption(options?.tipoDeAuxilioRecebido),
                isMulti: true,
            },
            dependencies: {
                recebeu_ajuda_3m: ["true"]
            }
        },
        {
            label: 'Nos últimos 3 meses, para conseguir alimentos, você ou outra pessoa que mora na sua casa, teve que fazer alguma coisa que causou vergonha, tristeza ou constrangimento?',
            type: Select,
            props: {
                name: 'constrangimento_pedir_ajuda_alimentos_3m',
                options: handleValueLabelOption(options?.yesOrNoOptions),
                isMulti: false,
            }
        },
    ]
]
