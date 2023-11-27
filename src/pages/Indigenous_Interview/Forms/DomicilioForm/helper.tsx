import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { pisoCasaOptions, paredesCasaOptions, telhadoCasaOptions, utensiliosCasaOptions, yesOrNoOptions, origemAguaOptions, acessoAguaCasaOptions, banheiroCasaOptions, coletaEsgotoCasaOptions, destinoLixoOptions, veiculosOptions, ultimaMoradaOptions, moradaHojeOptions, energiaEletricaOptions, equipamentosDeTrabalhoRuralEmCasaOptions, motivoQualidadeRuimAguaOptions } from "../../questions/SelectorOptions/options";

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
    dependenciesWithOr?: boolean;
}

export const domicilioFormHelper: FormHelperType[][] = [
  [
    {
      label: 'Antes de morar nessa ALDEIA/ COMUNIDADE onde você morava POR ÚLTIMO (ÚLTIMA MORADA)?',
      type: Select,
      props: {
          name: 'ultima_moradia',
          options: handleValueLabelOption(ultimaMoradaOptions),
      }
    },
    {
      label: 'Você considera a sua moradia adequada para viver?',
      type: Select,
      props: {
          name: 'considera_moradia_adequada',
          options: handleValueLabelOption(yesOrNoOptions),
      }
    },
    {
      label: 'Como você define essa sua moradia de HOJE?',
      type: Select,
      props: {
          name: 'tipo_moradia',
          options: handleValueLabelOption(moradaHojeOptions),
      }
    },
    {
      label: 'Agora faremos algumas perguntas sobre sua casa. Qual é o tipo de piso da casa?',
      type: Select,
      props: {
          name: 'piso',
          options: handleValueLabelOption(pisoCasaOptions),
      }
    },
    {
      label: 'Qual é o material das paredes da sua casa?',
      type: Select,
      props: {
          name: 'material_paredes',
          options: handleValueLabelOption(paredesCasaOptions),
      }
    },
    {
      label: 'Qual é o material do telhado da sua casa?',
      type: Select,
      props: {
          name: 'material_telhado',
          options: handleValueLabelOption(telhadoCasaOptions),
      }
    },
    {
      label: 'Sua casa tem energia elétrica?',
      type: Select,
      props: {
          name: 'possui_energia_eletrica',
          options: handleValueLabelOption(energiaEletricaOptions),
      }
    },
],
[
    {
      label: 'Selecione os utensílios que sua casa tem?',
      type: Select,
      props: {
          name: 'utensilios_casa',
          options: handleValueLabelOption(utensiliosCasaOptions),
          isMulti: true,
      }
    },
    {
      label: 'Quais destes equipamentos de trabalho rural que sua casa possui?',
      type: Select,
      props: {
          name: 'utensilios_de_trabalho',
          options: handleValueLabelOption(equipamentosDeTrabalhoRuralEmCasaOptions),
          isMulti: true,
      }
    },
    {
      label: 'A sua casa possui algum meio de transporte?',
      type: Select,
      props: {
          name: 'veiculos',
          options: handleValueLabelOption(veiculosOptions),
          isMulti: true,
      }
    },
    {
      label: 'De onde vem a água?',
      type: Select,
      props: {
          name: 'origem_agua',
          options: handleValueLabelOption(origemAguaOptions),
      }
    },
    {
      label: 'A água da sua casa é boa para beber e cozinhar?',
      type: Select,
      props: {
          name: 'qualidade_agua_para_beber_e_cozinhar',
          options: handleValueLabelOption(yesOrNoOptions),
      },
      hasDependencies: true,
    },
    {
      label: 'Se NÃO é boa a qualidade da água, qual o motivo?',
      type: Select,
      props: {
          name: 'motivo_qualidade_ruim_agua_para_beber_e_cozinhar',
          options: handleValueLabelOption(motivoQualidadeRuimAguaOptions),
      },
      dependencies: {
        qualidade_agua_para_beber_e_cozinhar: ["false"]
      }
    },
    {
      label: 'Como vocês têm acesso à água de uso comum da casa?',
      type: Select,
      props: {
          name: 'forma_acesso_agua',
          options: handleValueLabelOption(acessoAguaCasaOptions),
      }
    },
  ],
  [
    {
      label: 'Onde é o banheiro (onde são feitas as necessidades)?',
      type: Select,
      props: {
          name: 'possui_banheiro',
          options: handleValueLabelOption(banheiroCasaOptions),
      }
    },
    {
      label: 'Para onde vai o esgoto do banheiro, na sua casa?',
      type: Select,
      props: {
          name: 'forma_coleta_esgoto',
          options: handleValueLabelOption(coletaEsgotoCasaOptions),
      }
    },
    {
      label: 'Para onde vai o lixo da casa? (PODE TER MAIS DE 1 RESPOSTA)',
      type: Select,
      props: {
          name: 'destino_lixo_da_residencia',
          options: handleValueLabelOption(destinoLixoOptions),
          isMulti: true,
      }
    },
  ]
]
