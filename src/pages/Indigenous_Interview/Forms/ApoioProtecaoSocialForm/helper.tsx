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
        label: 'Tem alguma criança ou jovem nesta casa que vai para a escola?',
        type: Select,
        props: {
            name: 'possui_crianca_ou_jovem_que_frequenta_escola',
            options: handleValueLabelOption(options?.yesOrNoOptions),
            isMulti: false,
        },
        hasDependencies: true
    },
    {
        label: 'As crianças dessa casa comem na escola? (merenda escolar)',
        type: Select,
        props: {
          name: 'criancas_comem_escola',
          options: handleValueLabelOption(options?.criancasComemNaEscola),
          isMulti: false,
        },
        hasDependencies: true,
        dependencies: {
          possui_crianca_ou_jovem_que_frequenta_escola: ["true"]
      }
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
          criancas_comem_escola: ["sim", "nem_sempre"]
        }
    },
    {
      label: 'Nos últimos 30 dias qual foi a RENDA TOTAL da sua família, contando apenas com salário de TRABALHO. (SOMAR DE TODOS OS MORADORES da casa) (Exemplo: 1.400,00)',
      type: Input,
      props: {
          name: 'renda_total_30_dias',
          type: 'text'
      }
    },
    {
      label: 'Se não souber informar o valor em reais, perguntar em salário mínimo',
      type: Select,
      props: {
          name: 'opcoes_renda_total_30_dias',
          options: handleValueLabelOption(options.renda30dOptions),
      }
    },
    {
      label: 'No último mês, você ou alguém da sua família recebeu o dinheiro do: Programa Bolsa Família?',
      type: Select,
      props: {
          name: 'bolsa_familia_auxilio_brasil',
          options: handleValueLabelOption(options?.apoioFinanceiro),
          isMulti: false,
      },
      hasDependencies: true
    },
    {
      label: 'Valor recebido do Programa Bolsa Família (Exemplo: 600,00)',
      type: Input,
      props: {
          name: 'valor_bolsa_familia_auxilio_brasil',
          type: 'number',
      },
      dependencies: {
        bolsa_familia_auxilio_brasil: ["sim"]
      }
    },
    {
        label: 'Benefício de Prestação continuada (BPC)',
        type: Select,
        props: {
            name: 'bpc',
            options: handleValueLabelOption(options?.apoioFinanceiro),
            isMulti: false,
        },
        hasDependencies: true
    },
    {
      label: 'Valor recebido do Benefício de Prestação continuada (BPC) (Exemplo: 1.302,00)',
      type: Input,
      props: {
          name: 'valor_bpc',
          type: 'number',
      },
      dependencies: {
        bpc: ["sim"]
      }
    },
  ],
  [
    {
        label: 'Auxílio maternidade',
        type: Select,
        props: {
            name: 'auxilio_maternidade',
            options: handleValueLabelOption(options?.apoioFinanceiro),
            isMulti: false,
        },
        hasDependencies: true
    },
    {
      label: 'Valor recebido no Auxílio maternidade',
      type: Input,
      props: {
          name: 'valor_auxilio_maternidade',
          type: 'number',
      },
      dependencies: {
        auxilio_maternidade: ["sim"]
      }
    },
    {
        label: 'Auxílio doença',
        type: Select,
        props: {
            name: 'auxilio_doenca',
            options: handleValueLabelOption(options?.apoioFinanceiro),
            isMulti: false,
        },
        hasDependencies: true
    },
    {
      label: 'Valor recebido no Auxílio doença',
      type: Input,
      props: {
          name: 'valor_auxilio_doenca',
          type: 'number',
      },
      dependencies: {
        auxilio_doenca: ["sim"]
      }
    },
    {
        label: 'Aposentadoria',
        type: Select,
        props: {
            name: 'aposentadoria',
            options: handleValueLabelOption(options?.apoioFinanceiro),
            isMulti: false,
        },
        hasDependencies: true
    },
    {
      label: 'Valor recebido na Aposentadoria',
      type: Input,
      props: {
          name: 'valor_aposentadoria',
          type: 'number',
      },
      dependencies: {
        aposentadoria: ["sim"]
      }
    },
  ],
  [
    {
      label: 'Pensão por morte cônjuge',
      type: Select,
      props: {
          name: 'pensao_morte',
          options: handleValueLabelOption(options?.apoioFinanceiro),
          isMulti: false,
      },
      hasDependencies: true
    },
    {
      label: 'Valor recebido na Pensão',
      type: Input,
      props: {
          name: 'valor_pensao_morte',
          type: 'number',
      },
      dependencies: {
        pensao_morte: ["sim"]
      }
    },
    {
        label: 'Programa de auxilio em dinheiro estadual/ municipal',
        type: Select,
        props: {
            name: 'programa_auxilio_estadual_municipal',
            options: handleValueLabelOption(options?.apoioFinanceiro),
            isMulti: false,
        },
        hasDependencies: true
    },
    {
      label: 'Valor recebido no Programa de auxilio em dinheiro estadual/ municipal',
      type: Input,
      props: {
          name: 'valor_programa_auxilio_estadual_municipal',
          type: 'number',
      },
      dependencies: {
        programa_auxilio_estadual_municipal: ["sim"]
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
  ]
]
