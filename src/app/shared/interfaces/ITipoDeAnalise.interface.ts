export interface ITipoAnalise {
    tipo_de_analise:{
    _id:string,
    tipo?: string,
    classe?: string
}[]
}

export interface ITipoDeAnaliseResponse {
  tipo_de_analise?: ITipoAnalise["tipo_de_analise"]
  message?: string
}
