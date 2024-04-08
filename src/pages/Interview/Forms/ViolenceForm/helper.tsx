import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../../../utils/helpers/handleValueLabelOption";
import { simOuNao, violencePlacesOptions } from "../../../Indigenous_Interview/questions/SelectorOptions/options";

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

export const violenceHealthFormHelper: FormHelperType[][] = [
  [
    {
      label: 'Nos últimos 12 meses alguém: Te ofendeu, humilhou ou ridicularizou na frente de outras pessoas?',
      type: Select,
      props: {
        name: 'ofensa_humilhacao_ridicularizacao',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'ofensa_humilhacao_ridicularizacao_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        ofensa_humilhacao_ridicularizacao: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'ofensa_humilhacao_ridicularizacao_local_outro',
        type: 'text',
      },
      dependencies: {
        ofensa_humilhacao_ridicularizacao_local: ['outros'],
      },
    },
    {
      label: 'Nos últimos 12 meses alguém: Gritou com você ou te xingou?',
      type: Select,
      props: {
        name: 'gritou_xingou',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'gritou_xingou_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        gritou_xingou: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'gritou_xingou_local_outro',
        type: 'text',
      },
      dependencies: {
        gritou_xingou_local: ['outros'],
      },
    },
    {
      label: 'Nos últimos 12 meses alguém: Usou redes sociais ou celular para ameaçar, ofender, xingar ou expor imagens suas sem o seu consentimento?',
      type: Select,
      props: {
        name: 'ameacas_ofensas_exposicao_por_redes_sociais',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'ameacas_ofensas_exposicao_por_redes_sociais_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        ameacas_ofensas_exposicao_por_redes_sociais: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'ameacas_ofensas_exposicao_por_redes_sociais_local_outro',
        type: 'text',
      },
      dependencies: {
        ameacas_ofensas_exposicao_por_redes_sociais_local: ['outros'],
      },
    },
    {
      label: 'Nos últimos 12 meses alguém: Ameaçou verbalmente lhe ferir ou machucar alguém importante para você?',
      type: Select,
      props: {
        name: 'ameacas_verbais',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'ameacas_verbais_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        ameacas_verbais: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'ameacas_verbais_local_outro',
        type: 'text',
      },
      dependencies: {
        ameacas_verbais_local: ['outros'],
      },
    },
    {
      label: 'Nos últimos 12 meses alguém: Destruir alguma coisa sua de propósito?',
      type: Select,
      props: {
        name: 'destruiu_pertences_de_proposito',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'destruiu_pertences_de_proposito_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        destruiu_pertences_de_proposito: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'destruiu_pertences_de_proposito_local_outro',
        type: 'text',
      },
      dependencies: {
        destruiu_pertences_de_proposito_local: ['outros'],
      },
    },
  ],
  [
    {
      label: 'Nos últimos 12 meses alguém: Te deu um tapa ou uma bofetada?',
      type: Select,
      props: {
        name: 'tapa_bofetada',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'tapa_bofetada_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        tapa_bofetada: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'tapa_bofetada_local_outro',
        type: 'text',
      },
      dependencies: {
        tapa_bofetada_local: ['outros'],
      },
    },
    {
      label: 'Nos últimos 12 meses alguém: Te empurrou, segurou com força ou jogou algo em você com a intenção de machucar?',
      type: Select,
      props: {
        name: 'empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar_local_outro',
        type: 'text',
      },
      dependencies: {
        empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar_local: ['outros'],
      },
    },
    {
      label: 'Nos últimos 12 meses alguém: Te deu um soco, chutou ou arrastou pelo cabelo?',
      type: Select,
      props: {
        name: 'soco_chute_ou_arrastou_pelo_cabelo',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'soco_chute_ou_arrastou_pelo_cabelo_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        soco_chute_ou_arrastou_pelo_cabelo: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'soco_chute_ou_arrastou_pelo_cabelo_local_outro',
        type: 'text',
      },
      dependencies: {
        soco_chute_ou_arrastou_pelo_cabelo_local: ['outros'],
      },
    },
    {
      label: 'Nos últimos 12 meses alguém: Tentou ou efetivamente estrangulou, asfixiou ou te queimou de propósito?',
      type: Select,
      props: {
        name: 'tentou_ou_estrangulou_asfixiou_ou_queimou',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'tentou_ou_estrangulou_asfixiou_ou_queimou_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        tentou_ou_estrangulou_asfixiou_ou_queimou: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'tentou_ou_estrangulou_asfixiou_ou_queimou_local_outro',
        type: 'text',
      },
      dependencies: {
        tentou_ou_estrangulou_asfixiou_ou_queimou_local: ['outros'],
      },
    },
    {
      label: 'Nos últimos 12 meses alguém: Te ameaçou ou feriu com uma faca, arma de fogo ou alguma outra arma ou objeto?',
      type: Select,
      props: {
        name: 'ameacou_ou_feriu_com_faca_arma_ou_outros_objetos',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'ameacou_ou_feriu_com_faca_arma_ou_outros_objetos_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        ameacou_ou_feriu_com_faca_arma_ou_outros_objetos: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'ameacou_ou_feriu_com_faca_arma_ou_outros_objetos_local_outro',
        type: 'text',
      },
      dependencies: {
        ameacou_ou_feriu_com_faca_arma_ou_outros_objetos_local: ['outros'],
      },
    },
  ],
  [
    {
      label: 'Nos últimos 12 meses alguém: Tocou, manipulou, beijou ou expôs partes do seu corpo contra sua vontade?',
      type: Select,
      props: {
        name: 'tocou_manipulou_beijou_expos_corpo_contra_vontade',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'tocou_manipulou_beijou_expos_corpo_contra_vontade_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        tocou_manipulou_beijou_expos_corpo_contra_vontade: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'tocou_manipulou_beijou_expos_corpo_contra_vontade_local_outro',
        type: 'text',
      },
      dependencies: {
        tocou_manipulou_beijou_expos_corpo_contra_vontade_local: ['outros'],
      },
    },
    {
      label: 'Nos últimos 12 meses alguém: Te ameaçou ou forçou a ter relações sexuais ou quaisquer outros atos sexuais contra sua vontade?',
      type: Select,
      props: {
        name: 'ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade',
        options: handleValueLabelOption(simOuNao),
      },
      hasDependencies: true
    },
    {
      label: 'Se sim, onde?',
      type: Select,
      props: {
        name: 'ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade_local',
        options: handleValueLabelOption(violencePlacesOptions),
      },
      hasDependencies: true,
      dependencies: {
        ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade: ['sim'],
      }
    },
    {
      label:
        'Se em outro local, qual?',
      type: Input,
      props: {
        name: 'ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade_local_outro',
        type: 'text',
      },
      dependencies: {
        ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade_local: ['outros'],
      },
    },
  ]
]
