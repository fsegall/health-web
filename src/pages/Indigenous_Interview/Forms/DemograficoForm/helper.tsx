import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { sexoOptions, racaOptions, etniaOptions, crencasOptions, grauEscolaridadeOptions, situacaoTrabalhoOptions, ocupacaoPrincipalOptions, yesOrNoOptions, funcaoNaComunidadeOptions } from "../../questions/SelectorOptions/options";

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
}

export const quadroDemograficoHelper: FormHelperType[] = [
    {
        label: 'Qual o nome do MORADOR?',
        type: Input,
        props: {
            name: 'nome',
            placeholder: 'Digite o nome do morador',
            type: 'text',
        }
    },
    {
        label: 'Qual a relação do MORADOR com o chefe?',
        type: Input,
        props: {
            name: 'relacao_com_chefe',
            placeholder: 'Digite a relação do morador com o chefe',
            type: 'text',
        }
    },
    {
        label: 'Qual a idade do MORADOR?',
        type: Input,
        props: {
            name: 'idade',
            placeholder: 'Digite a idade do morador',
            type: 'number',
        },
        hasDependencies: true
    },
    {
        label: 'Qual o sexo do MORADOR?',
        type: Select,
        props: {
            name: 'sexo',
            options: handleValueLabelOption(sexoOptions),
            isMulti: false
        }
    },
    {
        label: 'Como se define o MORADOR: indígena ou não indígena?',
        type: Select,
        props: {
            name: 'raca',
            options: handleValueLabelOption(racaOptions),
            isMulti: false
        }
    },
    {
        label: 'Qual o povo/etnia do MORADOR? (Pode ser marcada mais de 1 opção)',
        type: Select,
        props: {
            name: 'povo_etnia',
            options: handleValueLabelOption(etniaOptions),
            isMulti: true
        }
    },
    {
      label: 'Até que série (grau) o Morador completou a escola?',
      type: Select,
      props: {
          name: 'grau_escolaridade',
          options: handleValueLabelOption(grauEscolaridadeOptions),
          isMulti: false
      }
    },
    {
      label: 'Qual a crença/ religião do MORADOR? (Maiores de 14 anos)',
      type: Select,
      props: {
          name: 'crenca_religiao',
          options: handleValueLabelOption(crencasOptions),
          isMulti: true
      },
      dependencies: {
          idade: ["14"]
      }
    },
    {
      label: 'Qual a situação de trabalho PRINCIPAL DO MORADOR neste momento? (Maiores de 14 anos)',
      type: Select,
      props: {
          name: 'situacao_no_trabalho',
          options: handleValueLabelOption(situacaoTrabalhoOptions),
          isMulti: false
      },
      dependencies: {
          idade: ["14"]
      }
    },
    {
      label: 'Qual a ocupação profissional PRINCIPAL do MORADOR? (Maiores de 14 anos)',
      type: Select,
      props: {
          name: 'ocupacao_profissao',
          options: handleValueLabelOption(ocupacaoPrincipalOptions),
          isMulti: false
      },
      dependencies: {
          idade: ["14"]
      }
    },
    {
      label: 'Qual a função do MORADOR na comunidade? (para maiores de 14 anos)',
      type: Select,
      props: {
          name: 'funcao_na_comunidade',
          options: handleValueLabelOption(funcaoNaComunidadeOptions),
          isMulti: true
      },
      dependencies: {
          idade: ["14"]
      }
    },
]
