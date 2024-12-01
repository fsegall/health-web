import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { aldeiaComunidadeOptions, distritoSanitarioIndigenaOptions, documentoCivilOptions, municipioOptions, tipoDeComunidadeOptions } from "../../questions/SelectorOptions/options";

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
      label: 'Indique o número do Projeto',
      type: Input,
      props: {
          name: 'projeto_numero',
          type: 'number',
          placeholder: 'Número do Projeto'
      }
    },
    {
      label: 'Qual é a DSEI (Distrito Sanitário Indígena) de referência?',
      type: Select,
      props: {
          name: 'distrito_sanitario_indigena',
          isMulti: false,
          options: handleValueLabelOption(distritoSanitarioIndigenaOptions)
      }
    },
    {
      label: 'Qual seu Município?',
      type: Select,
      props: {
          name: 'municipio',
          isMulti: false,
          placeholder: 'Município',
          options: handleValueLabelOption(municipioOptions)
      }
    },
    {
      label: 'Qual sua Aldeia/Comunidade?',
      type: Select,
      props: {
          name: 'aldeia_comunidade',
          isMulti: false,
          options: handleValueLabelOption(aldeiaComunidadeOptions)
      }
    },
  ],
  [
    {
      label: 'Qual a situação legal da terra? (LER AS OPÇÕES)',
      type: Select,
      props: {
          name: 'tipo_comunidade',
          isMulti: false,
          options: handleValueLabelOption(tipoDeComunidadeOptions)
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
