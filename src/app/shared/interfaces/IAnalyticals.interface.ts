export interface IAnalyticResult {
  os_analytics: IOsData;
  ensaios_analytics: TEnsaiosData;
  demanda_ensaios:IDemandaEnsaios;
  message?: string;
}

export interface IAnalyticResultData {
  quantidade: number;
  data: string;
}

export interface IOsData {
  total: number[] | [null];
  finalizadas: number[]  | [null];
  datas: string[]  | [null];
}
export interface IDemandaEnsaios{
  [key: string]: {
    semana: string[],
    quantidade: number[]
  }
}

export type TEnsaiosData = [number, number][]
