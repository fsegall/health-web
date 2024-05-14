import * as Yup from 'yup';

export const AlimentacaoNutricaoValidation = Yup.object().shape({
  possui_moradores_menores_de_16: Yup.string().required(
    'Você precisa preencher se há moradores menores de 16 anos',
  ),
  preocupação_nao_conseguir_comida: Yup.string()
    .nullable()
    .when('possui_moradores_menores_de_16', {
      is: (val: any) => String(val) === 'nao',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre preocupações em conseguir comida',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  comeu_sempre_comida_da_cultura: Yup.string()
    .nullable()
    .when('possui_moradores_menores_de_16', {
      is: (val: any) => String(val) === 'nao',
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher se comeu alimentos da cultura'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  comeram_sempre_comida_saudavel: Yup.string()
    .nullable()
    .when('possui_moradores_menores_de_16', {
      is: (val: any) => String(val) === 'nao' || String(val) === 'sim',
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher se comeu alimentos saudáveis'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  teve_comida_todos_os_dias: Yup.string()
    .nullable()
    .when('possui_moradores_menores_de_16', {
      is: (val: any) => String(val) === 'nao' || String(val) === 'sim',
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher se faltou comida'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  dia_todo_sem_comer: Yup.string()
    .nullable()
    .when('possui_moradores_menores_de_16', {
      is: (val: any) => String(val) === 'nao' || String(val) === 'sim',
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher sobre passar o dia sem comer'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  comeu_menos_para_deixar_comida_crianca: Yup.string()
    .nullable()
    .when('possui_moradores_menores_de_16', {
      is: (val: any) => String(val) === 'sim',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre precisar deixar alimento para criança',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  crianca_comeu_menos: Yup.string()
    .nullable()
    .when('possui_moradores_menores_de_16', {
      is: (val: any) => String(val) === 'sim',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre criança comer menos que o necessário',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  criança_dia_todo_sem_comer: Yup.string()
    .nullable()
    .when('possui_moradores_menores_de_16', {
      is: (val: any) => String(val) === 'sim',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre criança passar o dia sem comer',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  constrangimento_pedir_ajuda_alimentos: Yup.string()
    .nullable()
    .required('Você precisa preencher sobre pedir ajuda'),
  morador_faz_horta: Yup.string().required(
    'Você precisa preencher sobre fazer horta',
  ),
  motivo_morador_nao_faz_horta: Yup.string()
    .nullable()
    .when('morador_faz_horta', {
      is: (val: any) => String(val) === 'nao',
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher sobre não fazer horta'),
      otherwise: Yup.string().nullable().notRequired(),
    }),

  entrevista_indigena_id: Yup.string().nullable().notRequired(),

  alimentos_da_horta: Yup.string()
    .nullable()
    .when('morador_faz_horta', {
      is: (val: any) =>
        ['roca_em_casa', 'roca_comunitaria'].includes(String(val)),
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher sobre os alimentos da horta'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  alimentos_da_horta_outros: Yup.string()
    .nullable()
    .when('alimentos_da_horta', {
      is: (val: any) => ['outros'].find((v) => v === String(val)),
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher outras frutíferas'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  frutiferas_nas_proximidades: Yup.string()
    .nullable()
    .required('Você precisa preencher sobre frutíferas'),
    frutiferas_nas_proximidades_quais: Yup.string()
    .nullable()
    .when('frutiferas_nas_proximidades', {
      is: (val: any) => String(val) === 'true',
      then: Yup.string()
        .nullable()
        .required('Você precisa citar as frutíferas mais comuns na sua área'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  coleta_castanhas_cocos_frutas: Yup.string()
    .nullable()
    .required('Você precisa preencher sobre frutíferas'),
  funcao_cultivo_horta: Yup.string()
    .nullable()
    .when('morador_faz_horta', {
      is: (val: any) =>
        ['roca_em_casa', 'roca_comunitaria'].includes(String(val)),
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher sobre a finalidade da horta'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  origem_semente_plantio: Yup.string()
    .nullable()
    .when('morador_faz_horta', {
      is: (val: any) =>
        ['roca_em_casa', 'roca_comunitaria'].includes(String(val)),
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher sobre sementes'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  adiciona_veneno_na_plantacao: Yup.string()
    .nullable()
    .when('morador_faz_horta', {
      is: (val: any) =>
        ['roca_em_casa', 'roca_comunitaria'].includes(String(val)),
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher sobre veneno'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  dificuldade_com_horta: Yup.string()
    .nullable()
    .when('morador_faz_horta', {
      is: (val: any) =>
        ['roca_em_casa', 'roca_comunitaria'].includes(String(val)),
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher sobre dificuldades com horta'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  lista_dificuldades_com_horta: Yup.string()
    .nullable()
    .when('dificuldade_com_horta', {
      is: (val: any) => String(val) === 'true',
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher sobre dificuldades com horta'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  animais_de_criacao_alimentacao_ou_venda: Yup.string().required(
    'Você precisa preencher sobre os animais',
  ),
  lista_animais_de_criacao_alimentacao_ou_venda: Yup.string()
    .nullable()
    .when('animais_de_criacao_alimentacao_ou_venda', {
      is: (val: any) => String(val) === 'true',
      then: Yup.string()
        .nullable()
        .required('Você precisa preencher sobre animais'),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  realizam_caca: Yup.string().required('Você precisa preencher sobre caça'),
  realizam_pesca: Yup.string().required('Você precisa preencher sobre pesca'),
  possui_cultivo_plantas_medicinais: Yup.string().required(
    'Você precisa preencher sobre o cultivo de plantas medicinais',
  ),
  alimentos_consumidos_dia_anterior: Yup.string().required(
    'Você precisa preencher sobre os alimentos do dia anterior',
  ),
});
