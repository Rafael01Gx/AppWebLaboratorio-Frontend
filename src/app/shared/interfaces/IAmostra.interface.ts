export interface IAmostra{   
_id?:string,
numeroOs?:string,
nome_amostra?:string,
data_amostra?:string,
ensaios_solicitados?:string
solicitante?: object,
resultado?:object,
createdAt?:string;
updatedAt?: string,
}

export interface IAmostrasCollection {
    [key: string]: IAmostra;
  }