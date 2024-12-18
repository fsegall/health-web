import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import { handleValueLabelOption } from '../../questions/handleValueLabelOption';
import * as options from '../../questions/SelectorOptions/options';

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
  dependencies?: { [key: string]: string[] };
  dependenciesWithOr?: boolean;
}

export const alimentacaoNutricaoFormHelper: FormHelperType[][] = [
  [
    {
      label: 'Nesta casa tem morador ou moradora com idade menor de 16 anos (de 0 a 15 anos)?',
      type: Select,
      props: {
        name: 'possui_moradores_menores_de_16',
        isMulti: false,
        options: handleValueLabelOption(options?.simOuNao),
      },
      hasDependencies: true,
    },
    {
      label:
        'EB1. No mês passado, você sentiu preocupação em conseguir comida para sua casa?',
      type: Select,
      props: {
        name: 'preocupação_nao_conseguir_comida',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
    },
    {
      label:
        'EB2. No mês passado, vocês desta casa, comeram sempre comida da sua cultura?',
      type: Select,
      props: {
        name: 'comeu_sempre_comida_da_cultura',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
    },
    {
      label:
        'EB3. No mês passado, vocês nesta casa, comeram sempre comida saudável (que faz bem para saúde)?',
      type: Select,
      props: {
        name: 'comeram_sempre_comida_saudavel',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
      dependencies: {
        possui_moradores_menores_de_16: ['nao', 'sim'],
      },
    },
    {
      label:
        'EB4. No mês passado, na sua casa, teve comida todos os dias?',
      type: Select,
      props: {
        name: 'teve_comida_todos_os_dias',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
      dependencies: {
        possui_moradores_menores_de_16: ['nao', 'sim'],
      },
    },
    {
      label:
        'EB5. No mês passado, você ficou um dia todo sem comer nada, porque não tinha comida na casa?',
      type: Select,
      props: {
        name: 'dia_todo_sem_comer',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
      dependencies: {
        possui_moradores_menores_de_16: ['nao', 'sim'],
      },
    },
    {
      label:
        'EB6. No mês passado, teve dia que você comeu menos para deixar comida para as crianças e jovens da casa?',
      type: Select,
      props: {
        name: 'comeu_menos_para_deixar_comida_crianca',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
      dependencies: {
        possui_moradores_menores_de_16: ['sim'],
      },
    },
    {
      label:
        'EB7. No mês passado, teve dia em que as crianças e jovens da casa comeram menos quantidade de comida do que é necessário, porque tinha pouca comida?',
      type: Select,
      props: {
        name: 'crianca_comeu_menos',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
      dependencies: {
        possui_moradores_menores_de_16: ['sim'],
      },
    },
    {
      label:
        'EB8. No mês passado, teve dia em que as crianças e jovens da casa passaram o dia todo sem comer e foram dormir querendo comer, porque não tinha comida?',
      type: Select,
      props: {
        name: 'criança_dia_todo_sem_comer',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
      dependencies: {
        possui_moradores_menores_de_16: ['sim'],
      },
    },
  ],
  [
    {
      label:
        'No último mês, você ou alguém da sua casa, teve que fazer alguma coisa para conseguir comida que causou vergonha, tristeza ou constrangimento?',
      type: Select,
      props: {
        name: 'constrangimento_pedir_ajuda_alimentos',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
    },
    {
      label: 'Alguém desta casa faz roça ou horta?',
      type: Select,
      props: {
        name: 'morador_faz_horta',
        isMulti: false,
        options: handleValueLabelOption(options?.rocaOuHortaOptions),
      },
      hasDependencies: true,
    },
    {
      label:
        'Se não, por que não faz roça/horta? (PODE TER MAIS DE 1 RESPOSTA)',
      type: Select,
      props: {
        name: 'motivo_morador_nao_faz_horta',
        isMulti: true,
        options: handleValueLabelOption(options?.motivacaoNaoProduzirHorta),
      },
      dependencies: {
        morador_faz_horta: ['nao'],
      },
    },
    {
      label:
        'Se faz roça/horta, o que você planta? (PODE TER MAIS DE 1 RESPOSTA)',
      type: Select,
      props: {
        name: 'alimentos_da_horta',
        isMulti: true,
        options: handleValueLabelOption(options?.plantiosHorta),
      },
      hasDependencies: true,
      dependencies: {
        morador_faz_horta: ['roca_em_casa', 'roca_comunitaria'],
      },
    },
    {
      label:
        'Se outro, qual?',
      type: Input,
      props: {
        name: 'alimentos_da_horta_outros',
        type: 'text',
      },
      dependencies: {
        alimentos_da_horta: ['outros'],
      },
    },
    {
      label:
        'Vocês cultivam algum tipo de frutífera próximo a casa ou na comunidade?',
      type: Select,
      props: {
        name: 'frutiferas_nas_proximidades',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
      hasDependencies: true,
    },
    {
      label:
        ' Se sim, cite as 5 frutíferas mais comuns na sua aldeia',
      type: Input,
      props: {
        name: 'frutiferas_nas_proximidades_quais',
        type: 'text',
      },
      dependencies: {
        frutiferas_nas_proximidades: ['true'],
      },
    },

    {
      label:
        'Vocês fazem coleta de outros tipos de castanhas, cocos ou outras frutas? (PODE TER MAIS DE 1 RESPOSTA)',
      type: Select,
      props: {
        name: 'coleta_castanhas_cocos_frutas',
        isMulti: true,
        options: handleValueLabelOption(options?.coletaOptions),
      },
    },
    {
      label:
        'Se tem roça ou horta: O seu cultivo da roça ou horta é: (PODE TER MAIS DE 1 RESPOSTA) (LER AS OPÇÕES)',
      type: Select,
      props: {
        name: 'funcao_cultivo_horta',
        isMulti: true,
        options: handleValueLabelOption(options?.funcaoHortaOptions),
      },
      dependencies: {
        morador_faz_horta: ['roca_em_casa', 'roca_comunitaria'],
      },
    },
  ],
  [
    {
      label:
        'Onde vocês conseguem as sementes ou rama para plantar? (PODE TER MAIS DE 1 RESPOSTA)',
      type: Select,
      props: {
        name: 'origem_semente_plantio',
        isMulti: true,
        options: handleValueLabelOption(options?.fornecedorHorta),
      },
      dependencies: {
        morador_faz_horta: ['roca_em_casa', 'roca_comunitaria'],
      },
    },
    {
      label: 'Se planta, coloca algum veneno?',
      type: Select,
      props: {
        name: 'adiciona_veneno_na_plantacao',
        isMulti: false,
        options: handleValueLabelOption(options?.utilizaVenenoPlantio),
      },
      dependencies: {
        morador_faz_horta: ['roca_em_casa', 'roca_comunitaria'],
      },
    },
    {
      label: 'Se planta, tem alguma dificuldade com a roça/horta?',
      type: Select,
      props: {
        name: 'dificuldade_com_horta',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
      hasDependencies: true,
      dependencies: {
        morador_faz_horta: ['roca_em_casa', 'roca_comunitaria'],
      },
    },
    {
      label:
        'Se sim, quais são as dificuldades? (LER se a pessoa tiver dificuldade em lembrar) (PODE TER MAIS DE 1 RESPOSTA)',
      type: Select,
      props: {
        name: 'lista_dificuldades_com_horta',
        isMulti: true,
        options: handleValueLabelOption(options?.dificuldadesHorta),
      },
      dependencies: {
        dificuldade_com_horta: ['true'],
      },
    },
    {
      label: 'Vocês criam algum animal para COMER ou VENDER?',
      type: Select,
      props: {
        name: 'animais_de_criacao_alimentacao_ou_venda',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
      hasDependencies: true,
    },
    {
      label: 'Se sim, quais animais? (PODE TER MAIS DE 1 RESPOSTA)',
      type: Select,
      props: {
        name: 'lista_animais_de_criacao_alimentacao_ou_venda',
        isMulti: true,
        options: handleValueLabelOption(options?.criacaoAnimaisComerOuVender),
      },
      dependencies: {
        animais_de_criacao_alimentacao_ou_venda: ['true'],
      },
    },
    {
      label: 'Vocês caçam?',
      type: Select,
      props: {
        name: 'realizam_caca',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
    },
    {
      label: 'Vocês pescam?',
      type: Select,
      props: {
        name: 'realizam_pesca',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
    },
    {
      label: 'Nesta área tem cultivo de planta para remédio (ervas)?',
      type: Select,
      props: {
        name: 'possui_cultivo_plantas_medicinais',
        isMulti: false,
        options: handleValueLabelOption(options?.yesOrNoOptions),
      },
    },
    {
      label:
        'Agora queremos saber mais sobre a comida dos moradores desta casa. Ontem, na casa, vocês comeram:" (LER TODAS AS OPÇÕES)',
      type: Select,
      props: {
        name: 'alimentos_consumidos_dia_anterior',
        isMulti: true,
        options: handleValueLabelOption(options?.alimentosConsumidosOntem),
      },
    },
  ],
];
