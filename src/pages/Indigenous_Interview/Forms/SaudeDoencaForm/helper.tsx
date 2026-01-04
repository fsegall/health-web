import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { acessoEquipeDeSaude, causasDoencasVenenoLavouraOptions, condicaoSaudeOptions, criancaComidaOptions, cuidadoresOptions, desabilidadeOptions, diagnosticoRemedioOptions, diagnosticosOptions, gestanteOptions, lugaresOptions, profissionaisEquipeDeSaude, simOuNao, tiposAcidenteOptions, doencasInfecciosas, violenciaFisicaOptions, yesOrNoOptions, doencasOutras, exposicaoOptions, doencaExposicaoOptions, ameacaOptions } from "../../questions/SelectorOptions/options";

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
            label: 'Como você considera a sua saúde hoje? (LER AS OPÇÕES)',
            type: Select,
            props: {
                name: 'condicao_de_saude',
                options: handleValueLabelOption(condicaoSaudeOptions),
            }
        },
        {
            label: 'Na sua família, tem algum morador: (LER AS OPÇÕES) (PODE TER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'morador_com_desabilidade',
                isMulti: true,
                options: handleValueLabelOption(desabilidadeOptions),
            }
        },
        {
            label: 'O lugar onde você mora hoje te permite viver com saúde?',
            type: Select,
            props: {
                name: 'local_permite_viver_com_saude',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
        {
            label: 'Nos últimos 6 meses, você ou alguém desta casa foi exposto (teve contato) a: (LER AS OPÇÕES) (PODE TER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'morador_exposto_veneno_lavoura',
                isMulti: true,
                options: handleValueLabelOption(exposicaoOptions),
            },
            hasDependencies: true,
        },
        {
            label: 'Se sim, nos últimos 6 meses, você ou alguém desta casa FICOU DOENTE, por causa do veneno (agrotóxico) de plantação ou contaminação por mineração?',
            type: Select,
            props: {
                name: 'doencas_contato_veneno_lavoura',
                options: handleValueLabelOption(doencaExposicaoOptions),
            },
            hasDependencies: true,
            dependencies: {
                morador_exposto_veneno_lavoura: [
                    'Veneno (agrotóxico) de plantação',
                    'Contaminação de água ou alimentos por mineração (mercúrio)'
                ],
            }
        },
        {
            label: 'Se sim, porque? (PODE TER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'motivo_doencas_contato_veneno_lavoura',
                options: handleValueLabelOption(causasDoencasVenenoLavouraOptions),
                isMulti: true
            },
            dependencies: {
                doencas_contato_veneno_lavoura: [
                    "Sim, veneno (agrotóxico) da plantação",
                    "Sim, contaminação mineração"
                ],
            }
        },
        {
            label: 'Nos últimos 6 meses, alguém desta casa teve algum tipo de ACIDENTE: (LER AS OPÇÕES). PODE TER MAIS DE 1 RESPOSTA',
            type: Select,
            props: {
                name: 'acidentes',
                options: handleValueLabelOption(tiposAcidenteOptions),
                isMulti: true
              },
        },
        {
            label: 'Nos últimos 6 meses você ou alguém de sua família sofreu algum tipo de AMEAÇA de agressão física ou patrimonial (danificar pertences, por exemplo a queima da casa ou de alimentos)? Se sim, por pessoas de dentro ou fora da comunidade? (PODE SER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'ocorrencia_de_ameacas',
                isMulti: true,
                options: handleValueLabelOption(ameacaOptions),
            }
        },
        {
            label: 'Nos últimos 6 meses alguém desta casa sofreu algum tipo de VIOLÊNCIA FÍSICA (Alguém foi agredido fisicamente?) Se sim, por pessoas de dentro ou fora da comunidade? (PODE SER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'ocorrencia_violencia_fisica',
                isMulti: true,
                options: handleValueLabelOption(violenciaFisicaOptions),
            },
            hasDependencies: true,
        },
      ],
      [
        {
            label: 'Você, por ser indígena, já foi impedido alguma vez de entrar em: (LER AS OPÇÕES - PODE TER MAIS DE 1 RESPOSTA)',
            type: Select,
            props: {
                name: 'locais_impedido_de_entrar',
                options: handleValueLabelOption(lugaresOptions),
                isMulti: true,
            },
        },
        {
            label: 'Nos últimos 6 meses algum médico ou enfermeiro(a) já te disse que você tem alguma dessas doenças crônicas?: (LER AS OPÇÕES). PODE TER MAIS DE 1 RESPOSTA',
            type: Select,
            props: {
                name: 'lista_diagnosticos',
                options: handleValueLabelOption(diagnosticosOptions),
                isMulti: true,
            },
            hasDependencies: true
        },
        {
            label: 'Se sim, você toma remédio por causa disso? (Remédio de caixinha seria o remédio comprado, retirado no posto ou entregue pelo profisisonal de saúde)',
            type: Select,
            props: {
                name: 'lista_diagnosticos_cronico_remedio',
                options: handleValueLabelOption(diagnosticoRemedioOptions),
            },
            dependencies: {
              lista_diagnosticos: [
                "pressao_alta", "diabetes", "doenca_coracao", "doenca_rins", "cancer", "obesidade"
              ],
          }
        },
        {
            label: 'Nos últimos 6 meses, algum médico ou enfermeira(o) já te disse que você tem/teve alguma dessas doenças infecciosas?: (LER AS OPÇÕES). PODE TER MAIS DE 1 OPÇÃO DE RESPOSTA.',
            type: Select,
            props: {
                name: 'lista_diagnosticos_doencas_infecciosas',
                options: handleValueLabelOption(doencasInfecciosas),
                isMulti: true,
            },
            hasDependencies: true
        },
        {
            label: 'Se sim, você toma remédio por causa disso? (Remédio de caixinha seria o remédio comprado, retirado no posto ou entregue pelo profisisonal de saúde)',
            type: Select,
            props: {
                name: 'lista_diagnosticos_doencas_infecciosas_remedio',
                options: handleValueLabelOption(diagnosticoRemedioOptions),
            },
            dependencies: {
              lista_diagnosticos_doencas_infecciosas: [
                "malaria", "gripe", "infeccao_de_pele", "dst", "hepatite", "tuberculose", "pneumonia", "outra_doenca_respiratoria",
                "diarreia", "covid_19"
              ],
          }
        },
        {
          label: 'Nos últimos 6 meses, algum médico ou enfermeira(o) já te disse que você tem/teve alguma dessas outras doenças ou problemas de saúde? (LER AS OPÇÕES). PODE TER MAIS DE 1 OPÇÃO DE RESPOSTA.',
          type: Select,
          props: {
              name: 'lista_diagnosticos_outros',
              options: handleValueLabelOption(doencasOutras),
              isMulti: true,
          },
          hasDependencies: true
      },
      {
        label: 'Se sim, você toma (ou tomou) remédio por causa disso?',
        type: Select,
        props: {
            name: 'lista_diagnosticos_outros_remedio',
            options: handleValueLabelOption(diagnosticoRemedioOptions),
        },
        dependencies: {
          lista_diagnosticos_outros: [
            'anemia_ferropriva', 'desnutricao_peso_baixo', 'vomito', 'dor_de_cabeca', 'ansiedade_ou_depressao', 'doenca_fruto_de_feitico'
          ],
      }
    },
    {
      label: 'Na sua casa, tem alguma(s) moradora(s) entre 13 e 45 anos? (incluindo a entrevistada se for mulher, ou outras mulheres da casa)',
      type: Select,
      props: {
          name: 'moradora_entre_13_e_45_anos',
          options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, neste momento na sua casa tem: (LER AS OPÇÕES) (PODE TER MAIS DE 1 RESPOSTA)',
      type: Select,
      props: {
          name: 'mulheres_e_gestacao',
          options: handleValueLabelOption(gestanteOptions),
          isMulti: true
      },
      dependencies: {
        moradora_entre_13_e_45_anos: [
          "sim"
        ],
      }
    },
    {
      label: 'Na sua casa, tem alguma(s) criança(s) entre 0 e 6 meses?',
      type: Select,
      props: {
          name: 'crianca_ate_6_meses',
          options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, a criança tomou leite do peito ontem? (se houver mais de 1 criança, perguntar apenas sobre a mais nova)',
      type: Select,
      props: {
          name: 'crianca_ate_6_meses_leito_do_peito',
          options: handleValueLabelOption(yesOrNoOptions),
      },
      dependencies: {
        crianca_ate_6_meses: [
          "sim"
        ],
      }
    },
    {
      label: ' Se sim, a criança ontem comeu ou bebeu: (LER TODAS AS OPÇÕES, PODE TER MAIS DE 1 RESPOSTA): (Obs: se houver mais de uma criança, pergunte apenas sobre a mais nova)',
      type: Select,
      props: {
          name: 'crianca_ate_6_meses_outros_alimentos',
          options: handleValueLabelOption(criancaComidaOptions),
          isMulti: true
      },
      dependencies: {
        crianca_ate_6_meses: [
          "sim"
        ],
      }
    },
    {
      label: 'Na sua casa, tem alguma(s) criança(s) entre 6 meses e 2 anos?',
      type: Select,
      props: {
          name: 'crianca_entre_6_meses_e_2_anos',
          options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, a criança entre 6 meses e 2 anos tomou leite do peito ontem? (se houver mais de 1 criança, perguntar apenas sobre a mais nova)',
      type: Select,
      props: {
          name: 'crianca_entre_6_meses_e_2_anos_leite_do_peito',
          options: handleValueLabelOption(yesOrNoOptions),
      },
      dependencies: {
        crianca_entre_6_meses_e_2_anos: [
          "sim"
        ],
      }
    },
    {
      label: 'Aqui na sua aldeia/comunidade, vocês têm posto de saúde (Unidade Básica de Saúde)?',
      type: Select,
      props: {
          name: 'aldeia_possui_posto_de_saude',
          options: handleValueLabelOption(yesOrNoOptions),
      },
      hasDependencies: true
    },
    {
      label: 'Se não, o cuidado de saúde é feito por quem?: (PODE TER MAIS DE 1 RESPOSTA) ',
      type: Select,
      props: {
          name: 'cuidadores_para_aldeia_sem_posto_de_saude',
          options: handleValueLabelOption(cuidadoresOptions),
          isMulti: true
      },
      dependencies: {
        aldeia_possui_posto_de_saude: [
          "false", "ns-nr"
        ],
      }
    },
    ],
    [

        {
            label: 'Aqui na sua aldeia/comunidade, vocês têm acesso a equipe de saúde quando precisa?',
            type: Select,
            props: {
                name: 'acesso_a_equipe_de_saude',
                options: handleValueLabelOption(acessoEquipeDeSaude),
            },
            hasDependencies: true
        },
        {
            label: 'Se sim, quais profissionais vem aqui? (PODE TER MAIS DE 1 RESPOSTA) ',
            type: Select,
            props: {
                name: 'profissionais_acesso_a_equipe_de_saude',
                options: handleValueLabelOption(profissionaisEquipeDeSaude),
                isMulti: true
            },
            dependencies: {
              acesso_a_equipe_de_saude: [
                "todos_os_dias", "uma_vez_por_semana", "uma_vez_por_mes", "raramente"
              ],
            }
        },
        {
          label: 'Nos últimos 6 meses alguém desta casa ficou internado?',
          type: Select,
          props: {
              name: 'morador_internado',
              options: handleValueLabelOption(yesOrNoOptions),
          }
      },



        {
            label: 'Essa casa possui CRIANÇA(S) menor ou igual 5 anos (≤5 anos)',
            type: Select,
            props: {
                name: 'possui_morador_menor_ou_igual_a_5_anos',
                options: handleValueLabelOption(simOuNao),
            },
            hasDependencies: true
        },
        {
            label: 'No último mês, alguma criança desta casa foi diagnosticada (por médico, enfermeiro ou nutricionista) com desnutrição?',
            type: Select,
            props: {
                name: 'possui_morador_menor_ou_igual_a_5_anos_desnutricao',
                options: handleValueLabelOption(yesOrNoOptions),
            },
            dependencies: {
              possui_morador_menor_ou_igual_a_5_anos: [
                "sim"
              ],
            }
        },

        {
          label: 'No último mês, alguma criança desta casa foi diagnosticada (por médico, enfermeiro ou nutricionista) com diarreia?',
          type: Select,
          props: {
              name: 'possui_morador_crianca_diarreia',
              options: handleValueLabelOption(yesOrNoOptions),
          },
          dependencies: {
            possui_morador_menor_ou_igual_a_5_anos: [
              "sim"
            ],
          }
      },
        {
          label: 'No último mês, alguma criança desta casa foi diagnosticada (por médico ou enfermeiro) com pneumonia?',
          type: Select,
          props: {
              name: 'possui_morador_crianca_pneumonia',
              options: handleValueLabelOption(yesOrNoOptions),
          },
          dependencies: {
            possui_morador_menor_ou_igual_a_5_anos: [
              "sim"
            ],
          }
      },

        {
            label: 'Alguém desta casa tem problemas com bebidas alcoólicas? Reforçar que é sigilo (segredo)',
            type: Select,
            props: {
                name: 'morador_problemas_bebidas_alcoolicas',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
        {
            label: 'Você fuma cigarro (de maço, comprado)?',
            type: Select,
            props: {
                name: 'fuma_cigarro',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
        {
            label: 'Alguém desta casa tem problemas com uso de outras drogas (fuma, cheira ou aplica alguma droga)? Reforçar que é sigiloso (segredo)',
            type: Select,
            props: {
                name: 'morador_problemas_uso_drogas',
                options: handleValueLabelOption(yesOrNoOptions),
            }
        },
    ]
]
