import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { documentoCivilOptions, tipoDeComunidadeOptions } from "../../questions/SelectorOptions/options";

export interface FormHelperType {
  label: string;
  type: React.FC<any>;
  orientation?: string;
  props: {
      name: string;
      placeholder?: string;
      isMulti?: boolean;
      options?: Array<any>;
      type?: 'text' | 'textarea' | 'number';
  };
}

export const informacoesBasicasFormHelper: FormHelperType[][] = [
  [
    {
      label: 'Qual seu Município?',
      type: Input,
      props: {
          name: 'municipio',
          placeholder: 'Município',
      }
    },
    {
      label: 'Qual sua Aldeia/Comunidade?',
      type: Input,
      props: {
          name: 'aldeia_comunidade',
          placeholder: 'Aldeia/Comunidade',
      }
    },
    {
      label: 'Qual seu tipo de comunidade?',
      type: Select,
      props: {
          name: 'tipo_comunidade',
          isMulti: false,
          options: handleValueLabelOption(tipoDeComunidadeOptions)
      }
    },
  ],
  [
    {
      label: 'Indique o número do Projeto',
      type: Input,
      props: {
          name: 'numero_projeto',
          type: 'number',
          placeholder: 'Número do Projeto'
      }
    },
    {
      orientation: 'A pessoa a ser entrevistada deve ter idade igual ou maior que 14 anos, que conheça a realidade alimentar e social da casa, preferencialmente uma mulher adulta.',
      label: 'Você possui algum documento (civil)? LER AS OPÇÕES. (PODE TER MAIS DE 1 RESPOSTA).',
      type: Select,
      props: {
          name: 'responsavel_documentos',
          isMulti: true,
          options: handleValueLabelOption(documentoCivilOptions)
      }
    },
  ]
]
