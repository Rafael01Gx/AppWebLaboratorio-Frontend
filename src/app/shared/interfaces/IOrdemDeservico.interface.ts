export interface INovaOs {
    amostras: object,
    observacao: string
}
export interface IOrdemDeServico {
    ordemsDeServico?: {
      _id: string;
      numeroOs?: string;
      solicitante?: ISolicitante;
      amostras: {
        [key: string]: {
          nome_amostra: string;
          data_amostra: string;
          ensaios_solicitados: string;
        };
      };
      data_solicitacao: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    }[];
  }
  export interface IOrdemDeServicoResponse {
    ordemsDeServico: IOrdemDeServico["ordemsDeServico"];
    message: string;
  }

  export interface ISolicitante{
    _id: string;
    name: string;
    email: string;
    phone: string;
  }