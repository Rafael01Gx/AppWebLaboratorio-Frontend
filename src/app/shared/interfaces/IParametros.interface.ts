import { ITipoDeAnalise } from "../models/IResponseData";
import { ITipoAnalise } from "./ITipoDeAnalise.interface";

export interface IParametros{
    parametros:IParametro[]
      
    }

export interface IParametrosResponse{
    parametros?: IParametros['parametros'],
    message?: string,
}

export interface IParametro{
    _id:string,
        tipo_de_analise:ITipoDeAnalise,
        unidade_de_medida:string,
        descricao:string,
}

