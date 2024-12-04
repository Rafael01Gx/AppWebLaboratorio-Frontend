export interface IAnalyticResult {
  os_analytics: IOsData;
  ensaios_analytics: TEnsaiosData;
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

export type TEnsaiosData = [number, number][]
