import ICreateAlimentacaoNutricaoDTO from "./ICreateAlimentacaoNutricaoDTO";
import ICreateApoioProtecaoSocialDTO from "./ICreateApoioProtecaoSocialDTO";
import ICreateDemograficoDTO from "./ICreateDemograficoDTO";
import ICreateDomicilioDTO from "./ICreateDomicilioDTO";
import ICreateInformacoesBasicasDTO from "./ICreateInformacoesBasicasDTO";
import ICreateSaudeDoencaDTO from "./ICreateSaudeDoencaDTO";


export default interface ICreateIndigenousOfflineInterviewDTO {
  indigenous_informacoes_basicas: ICreateInformacoesBasicasDTO;
  indigenous_demografico: ICreateDemograficoDTO;
  indigenous_domicilio: ICreateDomicilioDTO;
  indigenous_saude_doenca?: ICreateSaudeDoencaDTO; // Opcional - pode ser desabilitado na próxima pesquisa
  indigenous_alimentacao_nutricao: ICreateAlimentacaoNutricaoDTO;
  indigenous_apoio_protecao_social: ICreateApoioProtecaoSocialDTO;
}
