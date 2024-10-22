export interface IConfiguracaoDeAnalise {
  configuracaoDeAnalise: {
    _id: string;
    tipo_de_analise: {
      _id: string;
      tipo: string;
      classe: string;
    };
    materia_prima: {
      _id: string;
      nome_descricao: string;
      classe_tipo: string;
    };
    parametros_de_analise: {
      [key: string]: {
        
      };
    };
  }[];
}

export interface IConfiguracaoDeAnaliseResponse {
  configuracaoDeAnalise?: IConfiguracaoDeAnalise['configuracaoDeAnalise'];
  message?: string;
}
