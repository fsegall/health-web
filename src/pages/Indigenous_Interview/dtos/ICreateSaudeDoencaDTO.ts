export default interface ICreateSaudeDoencaDTO {
  id?: string;
  condicao_de_saude: string
  morador_com_desabilidade: string[]
  local_permite_viver_com_saude: string
  morador_exposto_veneno_lavoura: string[];

  doencas_contato_veneno_lavoura?: string

  motivo_doencas_contato_veneno_lavoura?: string[]

  acidentes: string[];

  ocorrencia_de_ameacas: string[];

  ocorrencia_violencia_fisica: string[];

  locais_impedido_de_entrar: string[];
  lista_diagnosticos: string[];
  lista_diagnosticos_cronico_remedio?: string;

  lista_diagnosticos_doencas_infecciosas: string[];
  lista_diagnosticos_doencas_infecciosas_remedio?: string;

  lista_diagnosticos_outros: string[];
  lista_diagnosticos_outros_remedio?: string;


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

  morador_internado: string;

  possui_morador_menor_ou_igual_a_5_anos: string;
  possui_morador_menor_ou_igual_a_5_anos_desnutricao: string;
  possui_morador_crianca_diarreia: string;
  possui_morador_crianca_pneumonia: string;

  morador_problemas_bebidas_alcoolicas: string;
  fuma_cigarro: string;
  morador_problemas_uso_drogas: string;
}
