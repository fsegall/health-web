import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { tipoDeComunidadeOptions, yesOrNoOptions } from "../../questions/SelectorOptions/options";

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
            label: 'Você pode ser considerada (o) uma pessoa de referência (líder) da família? (Pessoa acima de 14 anos que trabalhe ou conheça a realidade alimentar e social da casa) ?',
            type: Select,
            props: {
                name: 'responsavel_domicilio',
                isMulti: false,
                options: handleValueLabelOption(yesOrNoOptions)
            }
        },
    ]
]
