import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../../../utils/helpers/handleValueLabelOption";

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

const frequencyOptions = {
  quase_todos_os_dias: 'Quase todos os dias',
  pelo_menos_uma_vez_na_semana: 'Pelo menos uma vez por semana ',
  algumas_vezes_por_mes: 'Algumas vezes por mês ',
  algumas_vezes_por_ano: 'Algumas vezes por ano ',
  menos_de_uma_vez_por_ano: 'Menos de uma vez por ano ',
  nunca: 'Nunca',
}

const reasonOptions = {
  ancestralidade: 'Sua Ancestralidade',
  lugar_de_origem: 'Seu Lugar de origem (Local de nascimento ou moradia)',
  genero: 'Seu Gênero',
  raca_ou_cor: 'Sua Raça/cor',
  etnia: 'Sua etnia',
  idade: 'Sua Idade',
  religiao: 'Sua Religião',
  altura: 'Sua Altura',
  peso: 'Seu Peso',
  deficiencia_fisica: 'Por ter deficiência Física',
  outro_aspecto_da_aparencia_fisica: 'Por algum outro aspecto da sua Aparência Física',
  orientacao_sexual: 'Sua Orientação Sexual',
  educacao: 'Sua Educação',
  renda: 'Seu Nível de Renda'
}

export const discriminationFormHelper: FormHelperType[][] = [
    [
        {
            label: 'No seu dia a dia, com qual frequência você é tratado com menos gentileza do que as outras pessoas?',
            type: Select,
            props: {
                name: 'gentileza',
                options: handleValueLabelOption(frequencyOptions),
            }
        },
        {
            label: 'No seu dia a dia, com qual frequência você é tratado com menos respeito do que as outras pessoas?',
            type: Select,
            props: {
                name: 'respeito',
                options: handleValueLabelOption(frequencyOptions),
            }
        },
        {
            label: 'No seu dia a dia, com qual frequência você recebe um atendimento pior do que as outras pessoas em restaurantes ou lojas?',
            type: Select,
            props: {
                name: 'atendimento',
                options: handleValueLabelOption(frequencyOptions),
            }
        },
        {
            label: 'No seu dia a dia, com qual frequência as pessoas agem como se achassem que você não é inteligente?',
            type: Select,
            props: {
                name: 'inteligencia',
                options: handleValueLabelOption(frequencyOptions),
            }
        },
        {
            label: 'No seu dia a dia, com qual frequência as pessoas agem como se tivessem medo de você?',
            type: Select,
            props: {
                name: 'medo',
                options: handleValueLabelOption(frequencyOptions),
            }
        },
    ],
    [
      {
        label: 'No seu dia a dia, com qual frequência as pessoas agem como se achassem que você é desonesto?',
        type: Select,
        props: {
            name: 'honestidade',
            options: handleValueLabelOption(frequencyOptions),
        }
    },
    {
        label: 'No seu dia a dia, com qual frequência as pessoas agem como se fossem melhores do que você?',
        type: Select,
        props: {
            name: 'agir_como_se_fossem_melhor_que_voce',
            options: handleValueLabelOption(frequencyOptions),
        }
    },
    {
        label: 'No seu dia a dia, com qual frequência você é xingado com palavrões e insultos?',
        type: Select,
        props: {
            name: 'xingamentos',
            options: handleValueLabelOption(frequencyOptions),
        }
    },
    ],
    [
      {
        label: 'No seu dia a dia, com qual frequência você é ameaçado ou assediado?',
        type: Select,
        props: {
            name: 'ameacado_ou_assediado',
            options: handleValueLabelOption(frequencyOptions),
        }
    },
    {
        label: 'No seu dia a dia, com qual frequência  você já se sentiu observado e seguido em lojas, supermercados ou shopping centers?',
        type: Select,
        props: {
            name: 'seguido_ou_observado',
            options: handleValueLabelOption(frequencyOptions),
        }
    },
    {
      label: 'O que você acha que é a principal razão para você ter tido essa(s) experiência(s)? (Múltipla resposta)',
      type: Select,
      props: {
          name: 'razao_discriminacao',
          options: handleValueLabelOption(reasonOptions),
          isMulti: true,
      }
  },
    ],
]
