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
      label: 'Nos últimos 30 dias, você se sentiu ou tem se sentido nervoso, tenso ou preocupado?',
      type: Select,
      props: {
          name: 'nervoso_tenso_preocupado',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você se assustou ou tem se assustado com facilidade?',
      type: Select,
      props: {
          name: 'facilidade_assustar',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você tem se sentido triste ultimamente?',
      type: Select,
      props: {
          name: 'sentimento_tristeza',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você chorou ou tem chorado mais do que de costume?',
      type: Select,
      props: {
          name: 'chora_mais_que_de_costume',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, teve ou tem tido dores de cabeça frequentemente?',
      type: Select,
      props: {
          name: 'dor_de_cabeca_frequente',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você dormiu ou tem dormido mal?',
      type: Select,
      props: {
          name: 'dorme_mal',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você sentiu ou tem sentido desconforto estomacal?',
      type: Select,
      props: {
          name: 'desconforto_estomacal',
          options: handleValueLabelOption(simOuNao),
      }
    },
  ],
  [
    {
      label: 'Nos últimos 30 dias, você teve ou tem tido má digestão?',
      type: Select,
      props: {
          name: 'ma_digestao',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você teve ou tem tido falta de apetite?',
      type: Select,
      props: {
          name: 'falta_de_apetite',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você teve ou tem tido tremores nas mãos?',
      type: Select,
      props: {
          name: 'tremores_nas_maos',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você se cansou ou tem se cansado com facilidade?',
      type: Select,
      props: {
          name: 'cansa_com_facilidade',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você teve ou tem tido dificuldade em tomar decisão?',
      type: Select,
      props: {
          name: 'dificuldade_tomada_de_decisao',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você teve ou tem tido dificuldade de ter satisfação em suas tarefas?',
      type: Select,
      props: {
          name: 'dificuldade_satisfacao_em_tarefas',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, o seu trabalho te trouxe ou te traz sofrimento?',
      type: Select,
      props: {
          name: 'trabalho_traz_sofrimento',
          options: handleValueLabelOption(simOuNao),
      }
    },
  ],
  [
    {
      label: 'Nos últimos 30 dias, você sentiu-se ou tem se sentido cansado todo o tempo?',
      type: Select,
      props: {
          name: 'cansado_tempo_todo',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você teve ou tem tido dificuldade de pensar claramente?',
      type: Select,
      props: {
          name: 'dificuldade_pensar_claramente',
          options: handleValueLabelOption(simOuNao),
      }
    },
    {
      label: 'Nos últimos 30 dias, você se sentiu ou se sente incapaz de desempenhar papel útil na sua vida?',
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
      label: 'Nos últimos 30 dias, você se sentiu ou se sente inútil em sua vida?',
      type: Select,
      props: {
          name: 'sentimento_inutilidade_em_sua_vida',
          options: handleValueLabelOption(simOuNao),
      }
    }
  ]
]
