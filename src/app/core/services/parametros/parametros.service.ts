import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IParametrosResponse } from '../../../shared/interfaces/IParametros.interface';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  #http = inject(HttpClient);
  #criarParametrosUrl = signal(`${environment.api_url}/parametros/criar`);
  #editarParametrosUrl = signal(`${environment.api_url}/parametros/editar`);
  #listarParametrosUrl = signal(`${environment.api_url}/parametros/listar`);
  #excluirParametrosUrl = signal(`${environment.api_url}/parametros/deletar`);

  
  #setParametros = signal<IParametrosResponse| null>(null);
  public getParametros = this.#setParametros.asReadonly();

  public httpCriarParametros(tipo_de_analise:{},descricao:string,unidade_de_medida:string): Observable<IParametrosResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.post<IParametrosResponse>(this.#criarParametrosUrl(),{tipo_de_analise,descricao,unidade_de_medida} ,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setParametros.set(res);
      })
    );   
  }

  #setListarParametros = signal<IParametrosResponse| null>(null);
  public getListarParametros = this.#setListarParametros.asReadonly();

  public httpListarParametros(): Observable<IParametrosResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IParametrosResponse>(this.#listarParametrosUrl(),{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarParametros.set(res);
      })
    );   
  }

  #setEditarParametros = signal<IParametrosResponse| null>(null);
  public getEditarParametros = this.#setEditarParametros.asReadonly();

  public httpEditarParametros(id: string,tipo_de_analise:string,unidade_de_medida:string,descricao:string): Observable<IParametrosResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.patch<IParametrosResponse>(`${this.#editarParametrosUrl()}${id}`,{tipo_de_analise,unidade_de_medida,descricao} ,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setEditarParametros.set(res);
      })
    );   
  }
  

  #setDeletarParametros = signal<IParametrosResponse| null>(null);
  public getDeletarParametros = this.#setDeletarParametros.asReadonly();

  public httpDeletarParametros(id:string): Observable<IParametrosResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.delete<IParametrosResponse>(`${this.#excluirParametrosUrl()}/${id}`,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setDeletarParametros.set(res);
      })
    );   
  }
  
 


  constructor() {}
}
