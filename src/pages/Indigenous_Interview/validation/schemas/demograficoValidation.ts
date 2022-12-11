import * as Yup from 'yup';

export const DemograficoValidation = Yup.object().shape({
    total_moradores: Yup.number()
    .test('validate-moradores', 'Você deve gerar a grade com o número correto de moradores', function(value){
      return this.parent.moradores.length === value
    }),
    morador_trabalhou_fazendas: Yup.array().required('Você deve preencher sobre a colheita'),
    morador_trabalhou_catacao: Yup.string().required('Você deve preencher sobre a colheita'),
    entrevista_indigena_id: Yup.string().required('Esse módulo deve estar vinculado com uma entrevista indígena'),
    moradores: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required('ID obrigatório'),
        nome: Yup.string().required('Você precisa digitar um nome'),
        relacao_com_lider: Yup.string().required('Você precisa digitar a relação com o chefe'),
        idade: Yup.number().required('Você precisa digitar uma idade').min(0, 'A idade não pode ser menor que zero'),
        sexo: Yup.string().required('Você precisa digitar o sexo'),
        indigena: Yup.string().required('Você precisa digitar a raça'),
        povo_etnia: Yup.string().required('Você precisa digitar uma etnia'),
        crenca_religiao: Yup.string().nullable().when("idade", {
          is: (val: any) => Number(val) > 14,
          then: Yup.array().nullable().required("Você precisa preencher as sobre a religião"),
          otherwise: Yup.array().nullable().notRequired(),
        }),
        situacao_no_trabalho: Yup.string().nullable().when("idade", {
          is: (val: any) => Number(val) > 14,
          then: Yup.string().nullable().required("Você precisa preencher sobre a situação no trabalho"),
          otherwise: Yup.string().nullable().notRequired(),
        }),
        ocupacao_principal: Yup.string().nullable().when("idade", {
          is: (val: any) => Number(val) > 14,
          then: Yup.string().nullable().required("Você precisa preencher sobre a profissão"),
          otherwise: Yup.string().nullable().notRequired(),
        }),
        serie_frequentada_escola: Yup.string().required('Você precisa preencher o grau de escolaridade'),
      })
    ).required('Você precisa preencher as informações dos moradores'),
});
