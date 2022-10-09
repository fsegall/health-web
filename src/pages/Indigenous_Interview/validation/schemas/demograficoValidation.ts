import * as Yup from 'yup';

export const DemograficoValidation = Yup.object().shape({
    total_moradores: Yup.number().required('Você precisa digitar o total de moradores').min(1, 'Nao pode ser um número negativo'),
    trabalho_colheita_de_maca: Yup.string().nullable(), //GK-ONLY
    quadro_social_demografico: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required('ID obrigatório'),
        nome: Yup.string().required('Você precisa digitar um nome'),
        relacao_com_chefe: Yup.string().required('Você precisa digitar a relação com o chefe'),
        idade: Yup.number().required('Você precisa digitar uma idade').min(0, 'A idade não pode ser menor que zero'),
        sexo: Yup.string().required('Você precisa digitar o sexo'),
        raca: Yup.string().required('Você precisa digitar a raça'),
        povo_etnia: Yup.string().required('Você precisa digitar uma etnia'),
        lingua_indigena: Yup.string().required('Você precisa preencher sobre a lingua indígena'),
        crenca_religiao: Yup.string().nullable(),
        grau_escolaridade: Yup.string().required('Você precisa preencher o grau de escolaridade'),
        situacao_no_trabalho: Yup.string().nullable(),
        profissao: Yup.string().nullable(),
      })
    ).required('Você precisa preencher as informações dos moradores'),
});