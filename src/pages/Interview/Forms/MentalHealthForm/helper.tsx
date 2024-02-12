import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../../../utils/helpers/handleValueLabelOption";
import { simOuNao } from "../../../Indigenous_Interview/questions/SelectorOptions/options";

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

export const mentalHealthFormHelper: FormHelperType[][] = [
  [
    {
      label: 'Nos últimos 30 dias: Sente-se nervoso, tenso ou preocupado?',
      type: Select,
      props: {
          name: 'nervoso_tenso_preocupado',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Assusta-se com facilidade?',
      type: Select,
      props: {
          name: 'facilidade_assustar',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Sente-se triste ultimamente?',
      type: Select,
      props: {
          name: 'sentimento_tristeza',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Você chora mais do que de costume',
      type: Select,
      props: {
          name: 'chora_mais_que_de_costume',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Tem dores de cabeça frequentemente?',
      type: Select,
      props: {
          name: 'dor_de_cabeca_frequente',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Você dorme mal?',
      type: Select,
      props: {
          name: 'dorme_mal',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Você sente desconforto estomacal? ',
      type: Select,
      props: {
          name: 'desconforto_estomacal',
          options: handleValueLabelOption(simOuNao),
      }
    },
  ],
  [
    {
      label: 'Nos últimos 30 dias: Você tem má digestão?',
      type: Select,
      props: {
          name: 'ma_digestao',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Você tem falta de apetite?',
      type: Select,
      props: {
          name: 'falta_de_apetite',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Tem tremores nas mãos?',
      type: Select,
      props: {
          name: 'tremores_nas_maos',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Você se cansa com facilidade?',
      type: Select,
      props: {
          name: 'cansa_com_facilidade',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Tem dificuldade em tomar decisão?',
      type: Select,
      props: {
          name: 'dificuldade_tomada_de_decisao',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Tem dificuldades de ter satisfação em suas tarefas?',
      type: Select,
      props: {
          name: 'dificuldade_satisfacao_em_tarefas',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: O seu trabalho traz sofrimento?',
      type: Select,
      props: {
          name: 'trabalho_traz_sofrimento',
          options: handleValueLabelOption(simOuNao),
      }
    },
  ],
  [
    {
      label: 'Nos últimos 30 dias: Sente-se cansado todo o tempo?',
      type: Select,
      props: {
          name: 'cansado_tempo_todo',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Tem dificuldade de pensar claramente?',
      type: Select,
      props: {
          name: 'dificuldade_pensar_claramente',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Sente-se incapaz de desempenhar papel útil em sua vida?',
      type: Select,
      props: {
          name: 'incapaz_desempenhar_papel_util',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Tem perdido o interesse pelas coisas?',
      type: Select,
      props: {
          name: 'perdeu_interesse_pelas_coisas',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Tem pensado em dar fim à sua vida?',
      type: Select,
      props: {
          name: 'pensado_dar_fim_na_vida',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias: Sente-se inútil em sua vida?',
      type: Select,
      props: {
          name: 'sentimento_inutilidade_em_sua_vida',
          options: handleValueLabelOption(simOuNao),
      }
    }
  ]
]
