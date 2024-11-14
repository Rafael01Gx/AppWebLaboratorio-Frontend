import { IMateriaPrima } from "./IMateriasPrimas.interface";

export interface IConfiguracaoDeAnalise {
  configuracaoDeAnalise: {
    _id: string;
    tipo_de_analise: {
      _id: string;
      tipo: string;
      classe: string;
    };
    materia_prima:{
      _id: string,
        nome_descricao: string,
        classe_tipo :string
    }
    parametros_de_analise: IParametrosDeAnalise
  
  }[];
}
export interface IConfigAnalise {

    _id: string;
    tipo_de_analise: {
      _id: string;
      tipo: string;
      classe: string;
    };
    materia_prima:{
      _id: string,
        nome_descricao: string,
        classe_tipo :string
    }
    parametros_de_analise: IParametrosDeAnalise
  
  ;
}

export interface IConfiguracaoDeAnaliseResponse {
  configuracaoDeAnalise?: IConfigAnalise[];
  message?: string;
}
export interface IParametrosDeAnaliseCollection{
    [key:number]: IParametrosDeAnalise
}
export interface IParametrosDeAnalise{
  item: string,
  unidade_resultado: string,
  casas_decimais: number ,
 
}
