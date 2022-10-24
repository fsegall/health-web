import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { handleValueLabelOption } from "../../questions/handleValueLabelOption";
import { yesOrNoOptions } from "../../questions/SelectorOptions/options";

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
            label: 'Qual Terra indígena?',
            type: Input,
            props: {
                name: 'terra_indigena',
                placeholder: 'Terra indígena',
            }
        },
    ],
    [
        {
            label: 'Qual Área de Retomada?',
            type: Input,
            props: {
                name: 'area_retomada',
                placeholder: 'Área de Retomada',
            }
        },
        {
            label: 'Qual Acampamento?',
            type: Input,
            props: {
                name: 'acampamento',
                placeholder: 'Acampamento',
            }
        },
    ],
    [
        {
            label: 'Indique o número do Projeto de Pesquisa',
            type: Input,
            props: {
                name: 'numero_projeto',
                type: 'number',
                placeholder: 'Número do Projeto'
            }
        },
        {
            label: 'Você pode ser considerada (o) uma pessoa de referência (chefe) da família? (Pessoa acima de 14 anos que trabalhe ou conheça a realidade alimentar e social da casa) ?',
            type: Select,
            props: {
                name: 'primeiro_contato_responsavel',
                isMulti: false,
                options: handleValueLabelOption(yesOrNoOptions)
            }
        },
    ]
]