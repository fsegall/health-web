import * as Yup from 'yup';

export const AlimentacaoNutricaoValidation = Yup.object().shape({
    morar_retomada_mudou_alimentacao: Yup.string().nullable().required('Você precisa preencher sobre a retomada'),
    entrevista_indigena_id: Yup.string().required('Esse módulo deve estar vinculado com uma entrevista indígena'),
    sem_alimentacao_por_conflito_com_terras: Yup.string().nullable().when("luta_por_terra", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre os conflitos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    motivo_sem_alimentacao_por_conflito_com_terras: Yup.string().nullable().when("sem_alimentacao_por_conflito_com_terras", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre os conflitos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    origem_comida: Yup.string().required('Você precisa preencher a origem das comidas'),
    possui_moradores_menores_de_16: Yup.string().required('Você precisa preencher se há moradores menores de 16 anos'),
    alimentacao_saudavel_diariamente_30d: Yup.string().nullable().when("possui_moradores_menores_de_16", {
        is: (val: any) => String(val) === "false",
        then: Yup.string().nullable().required("Você precisa preencher sobre alimentação"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    alimentacao_do_gosto_30d: Yup.string().nullable().when("possui_moradores_menores_de_16", {
        is: (val: any) => String(val) === "false",
        then: Yup.string().nullable().required("Você precisa preencher sobre alimentação"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    comeu_menos_para_alimentar_os_jovens_30d: Yup.string().nullable().when("possui_moradores_menores_de_16", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre alimentação"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    jovens_comeram_menos_do_necessario_30d: Yup.string().nullable().when("possui_moradores_menores_de_16", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre alimentação"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    jovens_passaram_algum_dia_sem_alimentos_30d: Yup.string().nullable().when("possui_moradores_menores_de_16", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre alimentação"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    consumiram_sempre_alimentos_da_cultura: Yup.string().required('Você precisa preencher se comeu alimentos da cultura'),
    acao_quando_falta_comida: Yup.string().nullable().when([
        "alimentacao_saudavel_diariamente_30d",
        "alimentacao_do_gosto_30d",
        "comida_disponivel_todos_os_dias_30d",
        "dia_sem_alimentos_30d",
        "comeu_menos_para_alimentar_os_jovens_30d",
    ], {
        is: (saudavel, gosto, disponivel, sem, menos: any) => {
            return (saudavel === "false") || (gosto === "false") || (disponivel === "false") || (sem === "true") || (menos === "true")
        },
        then: Yup.string().nullable().required("Você precisa preencher sobre alimentação"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    morador_faz_horta: Yup.string().required('Você precisa preencher sobre fazer horta'),
    motivo_morador_nao_faz_horta: Yup.string().nullable().when("morador_faz_horta", {
        is: (val: any) => (String(val) === "nao" || String(val) === "ns-nr"),
        then: Yup.string().nullable().required("Você precisa preencher sobre não fazer horta"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    alimentos_da_horta: Yup.string().nullable().when("morador_faz_horta", {
        is: (val: any) => ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"].includes(String(val)),
        then: Yup.string().nullable().required("Você precisa preencher sobre os alimentos da horta"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    frutiferas_nas_proximidades: Yup.string().nullable().when("morador_faz_horta", {
        is: (val: any) => ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"].includes(String(val)),
        then: Yup.string().nullable().required("Você precisa preencher sobre frutíferas"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    producao_de_comida_ano_todo: Yup.string().nullable().when("morador_faz_horta", {
        is: (val: any) => ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"].includes(String(val)),
        then: Yup.string().nullable().required("Você precisa preencher sobre frutíferas"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    origem_semente_plantio: Yup.string().nullable().when("morador_faz_horta", {
        is: (val: any) => ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"].includes(String(val)),
        then: Yup.string().nullable().required("Você precisa preencher sobre sementes"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    armazenamento_semente_plantio: Yup.string().nullable().when("morador_faz_horta", {
        is: (val: any) => ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"].includes(String(val)),
        then: Yup.string().nullable().required("Você precisa preencher sobre sementes"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    adiciona_veneno_na_plantacao: Yup.string().nullable().when("morador_faz_horta", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre veneno"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    dificuldade_com_horta: Yup.string().nullable().when("morador_faz_horta", {
        is: (val: any) => ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"].includes(String(val)),
        then: Yup.string().nullable().required("Você precisa preencher sobre dificuldades com horta"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    finalidade_horta: Yup.string().nullable().when("morador_faz_horta", {
        is: (val: any) => ["roca_em_casa", "roca_fora_de_casa", "roca_comunitaria"].includes(String(val)),
        then: Yup.string().nullable().required("Você precisa preencher sobre a finalidade da horta"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    lista_dificuldades_com_horta: Yup.string().nullable().when("dificuldade_com_horta", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre dificuldades com horta"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    animais_de_criacao_alimentacao_ou_venda: Yup.string().required('Você precisa preencher sobre os animais'),
    lista_animais_de_criacao_alimentacao_ou_venda: Yup.string().nullable().when("animais_de_criacao_alimentacao_ou_venda", {
        is: (val: any) => String(val) === "true",
        then: Yup.string().nullable().required("Você precisa preencher sobre animais"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    domicilio_possui_agua_para_animais: Yup.string().required('Você precisa preencher sobre a água para animais'),
    domicilio_possui_agua_para_producao_alimentos: Yup.string().required('Você precisa preencher sobre a água para alimentos'),
    precisou_comprar_alimentos_3m: Yup.string().required('Você precisa preencher sobre a necessidade de comprar alimentos'),
    lugar_precisou_comprar_alimentos_3m: Yup.string().nullable().when("precisou_comprar_alimentos_3m", {
        is: (val: any) => (val === "sim" || val === "troca_parentes" || val === "troca_mercado"),
        then: Yup.string().nullable().required("Você precisa preencher sobre compra de alimentos"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    possui_cultivo_plantas_medicinais: Yup.string().required('Você precisa preencher sobre o cultivo de plantas medicinais'),
    faz_remedios_com_plantas: Yup.string().required('Você precisa preencher sobre a produção de remédios'),
    moradia_possui_fogao_ou_lenha: Yup.string().required('Você precisa preencher sobre o material para fazer fogo'),
    alimentos_consumidos_dia_anterior: Yup.string().required('Você precisa preencher sobre os alimentos do dia anterior'),
    comida_disponivel_todos_os_dias_30d: Yup.string().required('Você precisa preencher se teve comida todos os dias'),
    dia_sem_alimentos_30d: Yup.string().required('Você precisa preencher sobre os dias sem alimentos'),
    preocupacao_em_conseguir_comida_30d: Yup.string().nullable().when("possui_moradores_menores_de_16", {
        is: (val: any) => String(val) === "false",
        then: Yup.string().nullable().required("Você precisa preencher sobre preocupações em conseguir comida"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
});
