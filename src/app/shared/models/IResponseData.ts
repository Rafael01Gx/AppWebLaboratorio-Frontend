export interface IConfiguracaoAnaliseData {
    _id: string;
    tipo_de_analise: ITipoDeAnalise;
    materia_prima: IMateriaPrima;
    parametros_de_analise: IParametrosDeAnalise;
    createdAt: string;
    updatedAt: string;
    item: number;
  }
  
  export interface ITipoDeAnalise {
    _id: string;
    tipo: string;
    classe: string;
  }
  
  export interface IMateriaPrima {
    _id: string;
    nome_descricao: string;
    classe_tipo: string;
  }
  
  export interface IParametrosDeAnalise {
    [key: string]: IParametroItem;
  }
  
  export interface IParametroItem {
    item: string;
    unidade_resultado: string;
    casas_decimais: number;
  }
  
  export type IResponseData = [IConfiguracaoAnaliseData[], string];