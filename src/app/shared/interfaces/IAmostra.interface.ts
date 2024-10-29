import { ISolicitante } from "./IOrdemDeservico.interface";

export interface IAmostra{   
_id?:string,
numeroOs?:string,
nome_amostra?:string,
data_amostra?:string,
ensaios_solicitados?:string
solicitante?: ISolicitante,
status?: string,
resultado?:object,
createdAt?:string;
updatedAt?: string,
}

export interface IAmostrasCollection {
    [key: string]: IAmostra;
  }
export interface IAmostrasResponse {
  amostras:IAmostrasCollection[],
  message:string,
  }