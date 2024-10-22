export interface IMateriaPrima{
    materiaPrimas:{
        _id?: string,
        nome_descricao?: string,
        classe_tipo? :string
      
    }[]
}

export interface IMateriaPrimaResponse{
    materiaPrimas?: IMateriaPrima['materiaPrimas'],
    message?: string,
}