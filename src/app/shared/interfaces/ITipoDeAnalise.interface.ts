import { ITipoDeAnalise } from './../models/IResponseData';
export interface ITipoAnalise {
    tipo_de_analise:ITipoDeAnalise[]
}

export interface ITipoDeAnaliseResponse {
  tipo_de_analise?: ITipoAnalise["tipo_de_analise"]
  message?: string
}

