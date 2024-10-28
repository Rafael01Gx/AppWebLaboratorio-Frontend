export interface IMateriaPrima{
    materiaPrimas:IMateria_Prima[]
}

export interface IMateriaPrimaResponse{
    materiaPrimas?: IMateriaPrima['materiaPrimas'],
    message?: string,
}

export interface IMateria_Prima{
    _id: string,
    nome_descricao: string,
    classe_tipo :string
}