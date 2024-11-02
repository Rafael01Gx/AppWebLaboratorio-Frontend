import { IAmostrasCollection } from "./IAmostra.interface";

export interface INovaOs {
    amostras: object,
    observacao: string
}
export interface IOrdensDeServico {
    ordemsDeServico?: IOrdemDeServico[];
  }
  export interface IOrdemDeServicoResponse {
    ordemsDeServico: IOrdensDeServico["ordemsDeServico"];
    message: string;
  }

  export interface ISolicitante{
    _id: string;
    name: string;
    email: string;
    phone: string;
  }

  export interface IOrdemDeServico{ 
    _id: string;
    numeroOs?: string;
    solicitante?: ISolicitante;
    amostras: IAmostrasCollection
    data_solicitacao: string;
    status: string;
    data_recepcao?:string;
    prazo_inicio_fim?:string;
    observacao?:string;
    createdAt: string;
    updatedAt: string;
  }