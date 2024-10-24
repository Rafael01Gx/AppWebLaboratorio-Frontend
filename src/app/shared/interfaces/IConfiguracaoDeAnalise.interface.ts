import { IMateriaPrima } from "./IMateriasPrimas.interface";

export interface IConfiguracaoDeAnalise {
  configuracaoDeAnalise: {
    _id: string;
    tipo_de_analise: {
      _id: string;
      tipo: string;
      classe: string;
    };
    materia_prima:IMateriaPrima
    parametros_de_analise: IParametrosDeAnalise
  
  }[];
}

export interface IConfiguracaoDeAnaliseResponse {
  configuracaoDeAnalise?: IConfiguracaoDeAnalise['configuracaoDeAnalise'];
  message?: string;
}
export interface IParametrosDeAnaliseCollection{
    [key: string]: IParametrosDeAnalise
}
export interface IParametrosDeAnalise{
  
    item: string,
    unidade_resultado: string,
    casas_decimais: string,
}
