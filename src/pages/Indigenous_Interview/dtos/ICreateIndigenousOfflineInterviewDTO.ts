import ICreateAlimentacaoNutricaoDTO from "./ICreateAlimentacaoNutricaoDTO";
import ICreateApoioProtecaoSocialDTO from "./ICreateApoioProtecaoSocialDTO";
import ICreateDemograficoDTO from "./ICreateDemograficoDTO";
import ICreateDomicilioDTO from "./ICreateDomicilioDTO";
import ICreateInformacoesBasicasDTO from "./ICreateInformacoesBasicasDTO";
import ICreateSaudeDoencaDTO from "./ICreateSaudeDoencaDTO";


export default interface ICreateIndigenousOfflineInterviewDTO {
    informacoes_basicas: ICreateInformacoesBasicasDTO;
    demografico: ICreateDemograficoDTO;
    domicilio: ICreateDomicilioDTO;
    saude_doenca: ICreateSaudeDoencaDTO;
    alimentacao_nutricao: ICreateAlimentacaoNutricaoDTO;
    apoio_protecao_social: ICreateApoioProtecaoSocialDTO;
}
