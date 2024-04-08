import * as Yup from 'yup';

export const ViolenceValidation = Yup.object().shape({
  ofensa_humilhacao_ridicularizacao: Yup.string().required('Você precisa preencher a questão nº 1 sobre violência'),
  ofensa_humilhacao_ridicularizacao_local: Yup.string()
  .nullable()
  .when('ofensa_humilhacao_ridicularizacao', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  ofensa_humilhacao_ridicularizacao_local_outro: Yup.string()
    .nullable()
    .when('ofensa_humilhacao_ridicularizacao_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  gritou_xingou: Yup.string().required('Você precisa preencher a questão nº 2 sobre violência'),
  gritou_xingou_local: Yup.string()
  .nullable()
  .when('gritou_xingou', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  gritou_xingou_local_outro: Yup.string()
    .nullable()
    .when('gritou_xingou_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  ameacas_ofensas_exposicao_por_redes_sociais: Yup.string().required('Você precisa preencher a questão nº 3 sobre violência'),
  ameacas_ofensas_exposicao_por_redes_sociais_local: Yup.string()
  .nullable()
  .when('ameacas_ofensas_exposicao_por_redes_sociais', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  ameacas_ofensas_exposicao_por_redes_sociais_local_outro: Yup.string()
    .nullable()
    .when('ameacas_ofensas_exposicao_por_redes_sociais_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  ameacas_verbais: Yup.string().required('Você precisa preencher a questão nº 4 sobre violência'),
  ameacas_verbais_local: Yup.string()
  .nullable()
  .when('ameacas_verbais', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  ameacas_verbais_local_outro: Yup.string()
    .nullable()
    .when('ameacas_verbais_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  destruiu_pertences_de_proposito: Yup.string().required('Você precisa preencher a questão nº 5 sobre violência'),
  destruiu_pertences_de_proposito_local: Yup.string()
  .nullable()
  .when('destruiu_pertences_de_proposito', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  destruiu_pertences_de_proposito_local_outro: Yup.string()
    .nullable()
    .when('destruiu_pertences_de_proposito_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  tapa_bofetada: Yup.string().required('Você precisa preencher a questão nº 6 sobre violência'),
  tapa_bofetada_local: Yup.string()
  .nullable()
  .when('tapa_bofetada', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  tapa_bofetada_local_outro: Yup.string()
    .nullable()
    .when('tapa_bofetada_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar: Yup.string().required('Você precisa preencher a questão nº 7 sobre violência'),
  empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar_local: Yup.string()
  .nullable()
  .when('empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar_local_outro: Yup.string()
    .nullable()
    .when('empurrou_segurou_ou_jogou_algo_com_intencao_de_machucar_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  soco_chute_ou_arrastou_pelo_cabelo: Yup.string().required('Você precisa preencher a questão nº 8 sobre violência'),
  soco_chute_ou_arrastou_pelo_cabelo_local: Yup.string()
  .nullable()
  .when('soco_chute_ou_arrastou_pelo_cabelo', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  soco_chute_ou_arrastou_pelo_cabelo_local_outro: Yup.string()
    .nullable()
    .when('soco_chute_ou_arrastou_pelo_cabelo_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  tentou_ou_estrangulou_asfixiou_ou_queimou: Yup.string().required('Você precisa preencher a questão nº 9 sobre violência'),
  tentou_ou_estrangulou_asfixiou_ou_queimou_local: Yup.string()
  .nullable()
  .when('tentou_ou_estrangulou_asfixiou_ou_queimou', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  tentou_ou_estrangulou_asfixiou_ou_queimou_local_outro: Yup.string()
    .nullable()
    .when('tentou_ou_estrangulou_asfixiou_ou_queimou_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  ameacou_ou_feriu_com_faca_arma_ou_outros_objetos: Yup.string().required('Você precisa preencher a questão nº 10 sobre violência'),
  ameacou_ou_feriu_com_faca_arma_ou_outros_objetos_local: Yup.string()
  .nullable()
  .when('ameacou_ou_feriu_com_faca_arma_ou_outros_objetos', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  ameacou_ou_feriu_com_faca_arma_ou_outros_objetos_local_outro: Yup.string()
    .nullable()
    .when('ameacou_ou_feriu_com_faca_arma_ou_outros_objetos_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  tocou_manipulou_beijou_expos_corpo_contra_vontade: Yup.string().required('Você precisa preencher a questão nº 11 sobre violência'),
  tocou_manipulou_beijou_expos_corpo_contra_vontade_local: Yup.string()
  .nullable()
  .when('tocou_manipulou_beijou_expos_corpo_contra_vontade', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  tocou_manipulou_beijou_expos_corpo_contra_vontade_local_outro: Yup.string()
    .nullable()
    .when('tocou_manipulou_beijou_expos_corpo_contra_vontade_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
  ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade: Yup.string().required('Você precisa preencher a questão nº 12 sobre violência'),
  ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade_local: Yup.string()
  .nullable()
  .when('ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade', {
    is: (val: any) => String(val) === 'sim',
    then: Yup.string()
      .nullable()
      .required(
        'Você precisa preencher sobre o local',
      ),
    otherwise: Yup.string().nullable().notRequired(),
  }),
  ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade_local_outro: Yup.string()
    .nullable()
    .when('ameacou_forcou_relacoes_ou_atos_sexuais_contra_vontade_local', {
      is: (val: any) => String(val) === 'outros',
      then: Yup.string()
        .nullable()
        .required(
          'Você precisa preencher sobre o local',
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
});
