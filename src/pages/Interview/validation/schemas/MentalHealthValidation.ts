import * as Yup from 'yup';

export const MentalHealthValidation = Yup.object().shape({
  nervoso_tenso_preocupado: Yup.string().required('Você precisa preencher a questão nº 1 sobre saúde mental'),
  facilidade_assustar: Yup.string().required('Você precisa preencher a questão nº 2 sobre saúde mental'),
  sentimento_tristeza: Yup.string().required('Você precisa preencher a questão nº 3 sobre saúde mental'),
  chora_mais_que_de_costume: Yup.string().required('Você precisa preencher a questão nº 4 sobre saúde mental'),
  dor_de_cabeca_frequente: Yup.string().required('Você precisa preencher a questão nº 5 sobre saúde mental'),
  dorme_mal: Yup.string().required('Você precisa preencher a questão nº 6 sobre saúde mental'),
  desconforto_estomacal: Yup.string().required('Você precisa preencher a questão nº 7 sobre saúde mental'),
  ma_digestao: Yup.string().required('Você precisa preencher a questão nº 8 sobre saúde mental'),
  falta_de_apetite: Yup.string().required('Você precisa preencher a questão nº 9 sobre saúde mental'),
  tremores_nas_maos: Yup.string().required('Você precisa preencher a questão nº 10 sobre saúde mental'),
  cansa_com_facilidade: Yup.string().required('Você precisa preencher a questão nº 11 sobre saúde mental'),
  dificuldade_tomada_de_decisao: Yup.string().required('Você precisa preencher a questão nº 12 sobre saúde mental'),
  dificuldade_satisfacao_em_tarefas: Yup.string().required('Você precisa preencher a questão nº 13 sobre saúde mental'),
  trabalho_traz_sofrimento: Yup.string().required('Você precisa preencher a questão nº 14 sobre saúde mental'),
  cansado_tempo_todo: Yup.string().required('Você precisa preencher a questão nº 15 sobre saúde mental'),
  dificuldade_pensar_claramente: Yup.string().required('Você precisa preencher a questão nº 16 sobre saúde mental'),
  incapaz_desempenhar_papel_util: Yup.string().required('Você precisa preencher a questão nº 17 sobre saúde mental'),
  perdeu_interesse_pelas_coisas: Yup.string().required('Você precisa preencher a questão nº 18 sobre saúde mental'),
  pensado_dar_fim_na_vida: Yup.string().required('Você precisa preencher a questão nº 19 sobre saúde mental'),
  sentimento_inutilidade_em_sua_vida: Yup.string().required('Você precisa preencher a questão nº 20 sobre saúde mental')
});
