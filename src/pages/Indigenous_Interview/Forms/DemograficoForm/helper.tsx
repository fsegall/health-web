import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { yesOrNoOptions } from "../../../Interview/questions/SelectorOptions/options";
import { crencasOptionsArray, etniaOptionsArray, grauEscolaridadeOptionsArray, ocupacaoPrincipalOptionsArray, racaOptionsArray, sexoOptionsArray, situacaoTrabalhoOptionsArray, yesOrNoOptionsArray } from "../../questions/SelectorOptions/options";

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
        }
    },
    {
        label: 'Qual o sexo do MORADOR?',
        type: Select,
        props: {
            name: 'sexo',
            options: sexoOptionsArray,
            isMulti: false
        }
    },
    {
        label: 'Como se define o MORADOR: indígena ou não indígena?',
        type: Select,
        props: {
            name: 'raca',
            options: racaOptionsArray,
            isMulti: false
        }
    },
    {
        label: 'Qual o povo/etnia do MORADOR? (Pode ser marcada mais de 1 opção)',
        type: Select,
        props: {
            name: 'povo_etnia',
            options: etniaOptionsArray,
            isMulti: true
        }
    },
    {
        label: 'Qual lingua indígena o MORADOR fala?',
        type: Input,
        props: {
            name: 'lingua_indigena',
            placeholder: 'Digite a lingua inígena que o morador fala'
        }
    },
    {
        label: 'Qual a crença/ religião do MORADOR? (Maiores de 14 anos)',
        type: Select,
        props: {
            name: 'crenca_religiao',
            options: crencasOptionsArray,
            isMulti: false
        }
    },
    {
        label: 'O morador frequenta a escola atualmente?',
        type: Select,
        props: {
            name: 'frequenta_escola',
            options: yesOrNoOptions,
            isMulti: false
        }
    },
    {
        label: 'Até que série (grau) o Morador X completou a escola?',
        type: Select,
        props: {
            name: 'grau_escolaridade',
            options: grauEscolaridadeOptionsArray,
            isMulti: false
        }
    },
    {
        label: 'Qual a situação de trabalho PRINCIPAL DO MORADOR neste momento?  (Maiores de 14 anos)',
        type: Select,
        props: {
            name: 'situacao_no_trabalho',
            options: situacaoTrabalhoOptionsArray,
            isMulti: false
        }
    },
    {
        label: 'Qual a ocupação profissional PRINCIPAL do MORADOR?  (Maiores de 14 anos)',
        type: Select,
        props: {
            name: 'ocupacao_profissao',
            options: ocupacaoPrincipalOptionsArray,
            isMulti: false
        }
    },
]