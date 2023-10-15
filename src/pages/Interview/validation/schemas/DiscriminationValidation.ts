import * as Yup from 'yup';

export const DiscrimiationValidation = Yup.object().shape({
  gentileza: Yup.string(),
  respeito: Yup.string(),
  atendimento: Yup.string(),
  inteligencia: Yup.string(),
  medo: Yup.string(),
  honestidade: Yup.string(),
  agir_como_se_fossem_melhor_que_voce: Yup.string(),
  xingamentos: Yup.string(),
  ameacado_ou_assediado: Yup.string(),
  seguido_ou_observado: Yup.string(),
  razao_discriminacao: Yup.string(),
});
