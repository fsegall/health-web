import * as Yup from 'yup';

export const SaudeDoencaValidation = Yup.object().shape({
    entrevista_indigena_id: Yup.string().nullable().notRequired(),
    condicao_de_saude: Yup.string().required('Você precisa preencher sobre a condição de saúde'),
    morador_com_desabilidade: Yup.array().required('Você precisa preencher sobre moradores com desabilidade'),
    local_permite_viver_com_saude: Yup.string().required('Você precisa preencher sobre a condição da sua morada'),
    morador_exposto_veneno_lavoura: Yup.array().required('Você precisa preencher sobre a lavoura'),
    doencas_contato_veneno_lavoura: Yup.string().nullable().when("morador_exposto_veneno_lavoura", {
      is: (val: any) => [
          'Veneno (agrotóxico) de plantação',
          'Contaminação de água ou alimentos por mineração (mercúrio)'
      ].find(v => v === String(val)),
        then: Yup.string().nullable().required("Você precisa preencher as doenças do contato com veneno"),
        otherwise: Yup.string().nullable().notRequired(),
    }),
    motivo_doencas_contato_veneno_lavoura: Yup.array().nullable().when("doencas_contato_veneno_lavoura", {
        is: (val: any) => [
          "Sim, veneno (agrotóxico) da plantação",
          "Sim, contaminação mineração"
        ].find(v => v === String(val)),
        then: Yup.array().nullable().required("Você precisa preencher sobre as causas da doença do contato com veneno"),
        otherwise: Yup.array().nullable().notRequired(),
    }),
    acidentes: Yup.array().required('Você precisa preencher se houveram acidentes'),
    ocorrencia_de_ameacas: Yup.array().required('Você precisa precisa preencher sobre ameaças'),
    ocorrencia_violencia_fisica: Yup.array().required('Você precisa sobre violência física'),
    locais_impedido_de_entrar: Yup.array().required('Você precisa preencher sobre locais que foi impedido de entrar'),
    lista_diagnosticos: Yup.array().required('Você precisa preencher sobre tratamentos'),
    lista_diagnosticos_cronico_remedio: Yup.string().nullable().when("lista_diagnosticos", {
      is: (val: any) => [
        "pressao_alta", "diabetes", "doenca_coracao", "doenca_rins", "cancer", "obesidade"
      ].find(v => v === String(val)),
      then: Yup.string().nullable().required("Você precisa preencher sobre os remédios do tratamento crônico"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    lista_diagnosticos_outros: Yup.array().required('Você precisa preencher sobre diagnósticos crônicos'),
    lista_diagnosticos_outros_remedio: Yup.string().nullable().when("lista_diagnosticos_outros", {
      is: (val: any) => [
        "malaria", "gripe", "infeccao_de_pele", "dst", "hepatite", "tuberculose", "pneumonia", "outra_doenca_respiratoria",
        "diarreia", "covid_19"
      ].find(v => v === String(val)),
      then: Yup.string().nullable().required("Você precisa preencher sobre os remédios do tratamento crônico"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    lista_diagnosticos_doencas_infecciosas: Yup.array().required('Você precisa preencher sobre doenças infecciosas'),
    lista_diagnosticos_doencas_infecciosas_remedio: Yup.string().nullable().when("lista_diagnosticos_doencas_infecciosas", {
      is: (val: any) => [
        'anemia_ferropriva', 'desnutricao_peso_baixo', 'vomito', 'dor_de_cabeca', 'ansiedade_ou_depressao', 'doenca_fruto_de_feitico'
      ].find(v => v === String(val)),
      then: Yup.string().nullable().required("Você precisa preencher sobre os remédios do tratamento de doenças infecciosas"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    moradora_entre_13_e_45_anos: Yup.string().required('Você precisa preencher sobre mulher entre 13 e 45 anos'),
    mulheres_e_gestacao: Yup.array().nullable().when("moradora_entre_13_e_45_anos", {
      is: (val: any) => String(val) === "sim",
      then: Yup.array().nullable().required("Você precisa preencher sobre gestação e amamentação"),
      otherwise: Yup.array().nullable().notRequired(),
    }),
    crianca_ate_6_meses: Yup.string().required('Você precisa preencher sobre crianças até 6 meses'),
    crianca_ate_6_meses_leito_do_peito: Yup.string().nullable().when("crianca_ate_6_meses", {
      is: (val: any) => String(val) === "sim",
      then: Yup.string().nullable().required("Você precisa preencher sobre leite materno para crianças até 6 meses"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    crianca_ate_6_meses_outros_alimentos: Yup.array().nullable().when("crianca_ate_6_meses", {
      is: (val: any) => String(val) === "sim",
      then: Yup.array().nullable().required("Você precisa preencher sobre outros alimentos para crianças até 6 meses"),
      otherwise: Yup.array().nullable().notRequired(),
    }),
    crianca_entre_6_meses_e_2_anos: Yup.string().required('Você precisa preencher sobre crianças entre 6 meses e 2 anos'),
    crianca_entre_6_meses_e_2_anos_leite_do_peito: Yup.string().nullable().when("crianca_entre_6_meses_e_2_anos", {
      is: (val: any) => String(val) === "sim",
      then: Yup.string().nullable().required("Você precisa preencher sobre leite materno para crianças entre 6 meses e 2 anos"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    aldeia_possui_posto_de_saude: Yup.string().required('Você precisa preencher sobre a presença de posto de saúde na aldeia'),
    cuidadores_para_aldeia_sem_posto_de_saude: Yup.array().nullable().when("aldeia_possui_posto_de_saude", {
      is: (val: any) => [
        "false", "ns-nr"
      ].find(v => v === String(val)),
      then: Yup.array().nullable().required("Você precisa preencher sobre quem realiza os cuidados na aldeia"),
      otherwise: Yup.array().nullable().notRequired(),
    }),
    acesso_a_equipe_de_saude: Yup.string().required('Você precisa preencher sobre o acesso a equipe de saúde'),
    profissionais_acesso_a_equipe_de_saude: Yup.array().nullable().when("acesso_a_equipe_de_saude", {
      is: (val: any) => [
        "todos_os_dias", "uma_vez_por_semana", "uma_vez_por_mes", "raramente"
      ].find(v => v === String(val)),
      then: Yup.array().nullable().required("Você precisa preencher sobre os profissionais da equipe de saúde"),
      otherwise: Yup.array().nullable().notRequired(),
    }),
    morador_internado: Yup.string().required('Você precisa preencher se houve algum morador internado'),
    possui_morador_menor_ou_igual_a_5_anos: Yup.string().required('Você precisa preencher se possui criança menor ou igual a 5 anos'),
    possui_morador_menor_ou_igual_a_5_anos_desnutricao: Yup.string().nullable().when("possui_morador_menor_ou_igual_a_5_anos", {
      is: (val: any) => [
        "sim"
      ].find(v => v === String(val)),
      then: Yup.string().nullable().required("Você precisa preencher sobre desnutrição para crianças"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    possui_morador_crianca_diarreia: Yup.string().nullable().when("possui_morador_menor_ou_igual_a_5_anos", {
      is: (val: any) => [
        "sim"
      ].find(v => v === String(val)),
      then: Yup.string().nullable().required("Você precisa preencher sobre diarreia para crianças"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    possui_morador_crianca_pneumonia: Yup.string().nullable().when("possui_morador_menor_ou_igual_a_5_anos", {
      is: (val: any) => [
        "sim"
      ].find(v => v === String(val)),
      then: Yup.string().nullable().required("Você precisa preencher sobre pneumonia para crianças"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    morador_problemas_bebidas_alcoolicas: Yup.string().required('Você precisa preencher sobre problemas com bebidas'),
    fuma_cigarro: Yup.string().required('Você precisa preencher sobre cigarro'),
    morador_problemas_uso_drogas: Yup.string().required('Você precisa preencher sobre problemas com drogas'),
});
