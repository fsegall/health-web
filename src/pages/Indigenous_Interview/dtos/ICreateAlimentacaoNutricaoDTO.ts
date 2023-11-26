export default interface ICreateAlimentacaoNutricaoDTO {
  id?: string;
  entrevista_indigena_id: string;

  possui_moradores_menores_de_16?: string;
  preocupação_nao_conseguir_comida?: string;
  nao_comeu_comida_cultura?: string;
  nao_comeu_comida_saudavel?: string;
  faltou_comida?: string;
  dia_todo_sem_comer?: string;
  comeu_menos_para_deixar_comida_crianca?: string;
  crianca_comeu_menos?: string;
  criança_dia_todo_sem_comer?: string;
  constrangimento_pedir_ajuda_alimentos: string;
  morador_faz_horta: string;
  motivo_morador_nao_faz_horta?: string[];
  alimentos_da_horta?: string[];
  alimentos_da_horta_outros?: string;
  frutiferas_nas_proximidades: string;
  coleta_castanhas_cocos_frutas: string[];
  funcao_cultivo_horta?: string[];
  origem_semente_plantio?: string[];
  adiciona_veneno_na_plantacao?: string;
  dificuldade_com_horta?: string;
  lista_dificuldades_com_horta?: string[];
  animais_de_criacao_alimentacao_ou_venda: string;
  lista_animais_de_criacao_alimentacao_ou_venda?: string[];
  realizam_caca: string;
  realizam_pesca: string;
  possui_cultivo_plantas_medicinais: string;
  alimentos_consumidos_dia_anterior: string[];
}
