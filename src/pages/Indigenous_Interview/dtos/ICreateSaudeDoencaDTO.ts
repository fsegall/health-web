export default interface ICreateSaudeDoencaDTO {
  id?: string;
  condicao_de_saude: string //select
  morador_com_desabilidade: string //select
  local_permite_viver_com_saude: string //select
  morador_exposto_veneno_lavoura: string; //select
  // depende anterior "sim"
  doencas_contato_veneno_lavoura?: string //select
  // depende anterior "sim"
  motivo_doencas_contato_veneno_lavoura?: string[] //select

  acidentes: string[]; //select

  ocorrencia_de_ameacas: string; //select
  // dependa da anterior
  ocorrencia_violencia_fisica: string; //select
  local_ocorrencia_violencia_fisica?: string[]; //multi-select

  locais_impedido_de_entrar: string[];
  lista_diagnosticos: string[]; //multi-select
  lista_diagnosticos_cronico_remedio?: string;

  lista_diagnosticos_outros: string[];
  lista_diagnosticos_outros_remedio?: string;

  //
  moradora_entre_13_e_45_anos: string;
  mulheres_e_gestacao?: string[];

  crianca_ate_6_meses: string;
  crianca_ate_6_meses_leito_do_peito?: string;
  crianca_ate_6_meses_outros_alimentos?: string;

  crianca_entre_6_meses_e_2_anos: string;
  crianca_entre_6_meses_e_2_anos_leite_do_peito?: string

  aldeia_possui_posto_de_saude: string;
  cuidadores_para_aldeia_sem_posto_de_saude?: string;

  acesso_a_equipe_de_saude: string;
  profissionais_acesso_a_equipe_de_saude?: string;

  morador_internado: string; //select

  possui_morador_menor_ou_igual_a_5_anos: string;

  morador_problemas_bebidas_alcoolicas: string; //select
  fuma_cigarro: string; //select
  morador_problemas_uso_drogas: string; //select
}
