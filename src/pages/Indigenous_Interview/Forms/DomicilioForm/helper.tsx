import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { pisoCasaOptions, paredesCasaOptions, telhadoCasaOptions, utensiliosCasaOptions, yesOrNoOptions, origemAguaOptions, qualidadeAguaOptions, acessoAguaCasaOptions, banheiroCasaOptions, coletaEsgotoCasaOptions, destinoLixoOptions, veiculosOptions, renda30dOptions, ultimaMoradaOptions, moradaHojeOptions } from "../../questions/SelectorOptions/options";

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
            label: 'Quantos cômodos tem na sua residência, incluindo banheiros?',
            type: Input,
            props: {
                name: 'quantidade_comodos',
                type: 'number',
                placeholder: 'Digite o total de cômodos'
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
            label: 'Tem acesso a água na sua casa?',
            type: Select,
            props: {
                name: 'acesso_agua',
                options: handleValueLabelOption(yesOrNoOptions),
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
            label: 'Você acha que a qualidade da água que você usa para beber e cozinhar é:',
            type: Select,
            props: {
                name: 'qualidade_agua_para_beber_e_cozinhar',
                options: handleValueLabelOption(qualidadeAguaOptions),
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
            label: 'Existe banheiro na casa?',
            type: Select,
            props: {
                name: 'possui_banheiro',
                options: handleValueLabelOption(banheiroCasaOptions),
            }
        },
        {
            label: 'Como é feita a coleta de esgoto na sua residência?',
            type: Select,
            props: {
                name: 'forma_coleta_esgoto',
                options: handleValueLabelOption(coletaEsgotoCasaOptions),
            }
        },
        {
            label: 'Para onde vai o lixo da casa? Atenção: pode ter mais de uma resposta.',
            type: Select,
            props: {
                name: 'destino_lixo_da_residencia',
                options: handleValueLabelOption(destinoLixoOptions),
                isMulti: true,
            }
        },
        {
            label: 'Sua família tem algum veículo para transporte? Qual? Atenção: pode ter mais de uma resposta.',
            type: Select,
            props: {
                name: 'veiculos',
                options: handleValueLabelOption(veiculosOptions),
                isMulti: true,
            }
        },
        {
            label: 'Nos últimos 30 dias qual foi a renda total da sua família (sustento familiar)? (Somando DE TODOS OS MORADORES da casa) (de trabalho com carteira assinada ou não, de pensão, de aposentadorias, de benefícios como o bolsa família ou de outros programas de transferência de renda, de seguro desemprego, de doações ou outras formas de renda)',
            type: Select,
            props: {
                name: 'renda_total_30_dias',
                options: handleValueLabelOption(renda30dOptions),
            }
        },
    ]
]
