export interface IParametros{
    parametros:{
        _id:string,
        tipo_de_analise:{
            _id: string,
            tipo:string,
            classe:string,
            },
        unidade_de_medida:string,
        descricao:string,
        }[]
      
    }

export interface IParametrosResponse{
    parametros?: IParametros['parametros'],
    message?: string,
}