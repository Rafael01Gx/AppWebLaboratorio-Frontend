export interface IAnalyticResult {
  ordem_de_servico_analytics: {
    ordens_de_servicos_totais: IAnalyticResultData[];
    ordens_de_servico_finalizadas: IAnalyticResultData[];
  };
  message?: string;
}

export interface IAnalyticResultData {
  quantidade: number;
  data: string;
}
