import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { sexoOptions, crencasOptions, grauEscolaridadeOptions, situacaoTrabalhoOptions, funcaoNaComunidadeOptions, yesOrNoOptions, simOuNao, etniasNewOptions, crencasIgrejaOptions, funcaoTrabalhoAldeiaOptions, funcaoTrabalhoForaAldeiaOptions, motivosNaoTrabalhaOptions } from "../../questions/SelectorOptions/options";

export interface FormHelperType {
    label: string;
    alternative_label?: string;
    type: React.FC<any>;
    props: {
      name: string;
      placeholder?: string;
      defaultValue?: any;
      isMulti?: boolean;
      options?: Array<any>;
      type?: 'text' | 'textarea' | 'number';
    },
    hasDependencies?: boolean;
    dependencies?: { [key: string]: string[]; };
}

export const extraDemograficoHelper: FormHelperType[][] = [
  [
    {
      label: 'Existe algum morador não indígena na casa?',
      type: Select,
      props: {
        name: 'morador_nao_indigena',
        options: handleValueLabelOption(yesOrNoOptions),
        isMulti: false
      },
      hasDependencies: true
    },
    {
      label: 'Quantos moradores NÃO INDÍGENAS existem na casa?',
      type: Input,
      props: {
        name: 'quantidade_morador_nao_indigena',
        placeholder: 'Digite a quantidade de moradores não indígenas',
        type: 'number',
      },
      dependencies: {
        morador_nao_indigena: ["true"]
      }
    },
    {
      label: ' Qual sua etnia/povo?',
      type: Select,
      props: {
        name: 'povo_etnia',
        options: handleValueLabelOption(etniasNewOptions),
        isMulti: true
      }
    },
    {
      label: 'Até que série (grau) você completou a escola?',
      type: Select,
      props: {
        name: 'serie_frequentada_escola',
        options: handleValueLabelOption(grauEscolaridadeOptions),
        isMulti: false
      }
    },
    {
      label: 'Em relação a crença, você acredita na igreja ou no pagé / nhanderu / lideranças religiosas tradicional? (Apenas para respondente/chefe)',
      type: Select,
      props: {
        name: 'crenca_religiao',
        options: handleValueLabelOption(crencasOptions),
        isMulti: false
      },
      hasDependencies: true
    },
  ],
  [
    {
      label: 'Se na igreja (ou nos dois), em qual?',
      type: Select,
      props: {
        name: 'crenca_religiao_igreja',
        options: handleValueLabelOption(crencasIgrejaOptions),
        isMulti: false
      },
      dependencies: {
        crenca_religiao: ["igreja_e_paje", "igreja"]
      }
    },
    {
      label: 'Você está trabalhando no momento? (PODE TER MAIS DE 1 RESPOSTA) (obs: apenas para respondente/chefe)',
      type: Select,
      props: {
        name: 'situacao_no_trabalho',
        options: handleValueLabelOption(situacaoTrabalhoOptions),
        isMulti: true
      },
      hasDependencies: true
    },
    {
      label: 'SE sim NA ALDEIA, recebe por este trabalho?',
      type: Select,
      props: {
        name: 'remuneracao_trabalho_na_aldeia',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true,
      dependencies: {
        situacao_no_trabalho: ["sim_aldeia"]
      }
    },
    {
      label: 'Se recebe pelo trabalho na ALDEIA, que tipo de trabalho exerce?',
      type: Select,
      props: {
        name: 'funcao_trabalho_remunerado_na_aldeia',
        options: handleValueLabelOption(funcaoTrabalhoAldeiaOptions),
      },
      dependencies: {
        remuneracao_trabalho_na_aldeia: ["sim"]
      }
    },
    {
      label: 'SE sim FORA DA ALDEIA, recebe por este trabalho?',
      type: Select,
      props: {
        name: 'remuneracao_trabalho_fora_aldeia',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true,
      dependencies: {
        situacao_no_trabalho: ["sim_fora_da_aldeia"]
      }
    },
    {
      label: 'Se recebe pelo trabalho FORA DA ALDEIA, que tipo de trabalho exerce?',
      type: Select,
      props: {
        name: 'funcao_trabalho_remunerado_fora_da_aldeia',
        options: handleValueLabelOption(funcaoTrabalhoForaAldeiaOptions),
      },
      dependencies: {
        remuneracao_trabalho_fora_aldeia: ["sim"]
      }
    },
    {
      label: 'Na aldeia, você exerce algum outro tipo de função (não remunerada)? (LER AS OPÇÕES)',
      type: Select,
      props: {
        name: 'funcao_nao_remunerada_aldeia',
        options: handleValueLabelOption(funcaoNaComunidadeOptions),
        isMulti: false
      },
    },
    {
      label: 'SE NÃO ESTÁ TRABALHANDO, por quê?',
      type: Select,
      props: {
          name: 'motivo_nao_trabalha',
          options: handleValueLabelOption(motivosNaoTrabalhaOptions),
      },
      dependencies: {
        situacao_no_trabalho: ["nao"]
      }
    },

  ]
]

export const quadroDemograficoHelper: FormHelperType[] = [
  {
    label: 'Qual o seu nome?',
    alternative_label: 'Qual o nome do próximo morador?',
    type: Input,
    props: {
      name: 'nome',
      placeholder: 'Digite o nome do morador',
      type: 'text',
    }
  },
  {
    label: 'Qual a sua relação com o chefe ou pessoa de referência da família?',
    alternative_label: 'Qual a relação dele(a) com o(a) chefe ou pessoa de referência da família?',
    type: Input,
    props: {
      name: 'relacao_com_lider',
      placeholder: 'Digite a relação do morador com o chefe',
      type: 'text',
    }
  },
  {
    label: 'O MORADOR possui mais de 1 ano de idade?',
    alternative_label: 'O morador possui mais de 1 ano de idade? (se a resposta for não)',
    type: Select,
    props: {
      name: 'maior_de_um_ano',
      options: handleValueLabelOption(simOuNao),
      isMulti: false
    },
    hasDependencies: true
  },
  {
    label: 'Quantos anos você tem?',
    alternative_label: 'Quantos anos tem o morador?',
    type: Input,
    props: {
      name: 'idade',
      placeholder: 'Digite a idade do morador',
      type: 'number',
    },
    hasDependencies: true,
    dependencies: {
      maior_de_um_ano: ["sim"]
    }
  },
  {
    label: 'Qual a idade do MORADOR em MESES?',
    alternative_label: 'Qual a idade do morador em meses?',
    type: Input,
    props: {
      name: 'idade_em_meses',
      placeholder: 'Digite quantos meses tem o morador',
      type: 'number',
    },
    hasDependencies: true,
    dependencies: {
      maior_de_um_ano: ["nao"]
    }
  },
  {
    label: 'Qual o seu sexo?',
    alternative_label: 'Qual o sexo do morador?',
    type: Select,
    props: {
      name: 'sexo',
      options: handleValueLabelOption(sexoOptions),
      isMulti: false
    }
  },
]
