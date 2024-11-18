import { ISolicitante, TStatus } from "./IOrdemDeservico.interface";

export interface IAmostra{   
_id?:string,
numeroOs?:string,
nome_amostra?:string,
data_amostra?:string,
ensaios_solicitados?:string
solicitante?: ISolicitante,
status?: TStatus,
resultados?:IResultadoCollection,
data_recepcao?:string,
prazo_inicio_fim?:string,
progresso?: number;
createdAt?:string;
updatedAt?: string,
}

export interface IResultadoCollection{ 
  [key: string]: IResultado
}
export interface IResultado{ 
    [key: string | number]:{
      item: string,
    valor_resultado:string | number,
    unidade_resultado: string,
    casas_decimais: number ,
    }
}

export interface IAmostrasCollection {
    [key: string]: IAmostra;
  }
export interface IAmostrasResponse {
  amostras:IAmostrasCollection[],
  message:string,
  }
  