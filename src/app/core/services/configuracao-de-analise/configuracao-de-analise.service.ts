import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IConfiguracaoDeAnaliseResponse } from '../../../shared/interfaces/IConfiguracaoDeAnalise.interface';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoDeAnaliseService {
  #http = inject(HttpClient);
  #criarConfiguracaoDeAnaliseUrl = signal(`${environment.api_url}/configuracaoanalises/criar`);
  #editarConfiguracaoDeAnaliseUrl = signal(`${environment.api_url}/configuracaoanalises/editar`);
  #listarConfiguracaoDeAnaliseUrl = signal(`${environment.api_url}/configuracaoanalises/listar`);
  #excluirConfiguracaoDeAnaliseUrl = signal(`${environment.api_url}/configuracaoanalises/deletar`);

  
  #setConfiguracaoDeAnalise = signal<IConfiguracaoDeAnaliseResponse| null>(null);
  public getConfiguracaoDeAnalise = this.#setConfiguracaoDeAnalise.asReadonly();

  public httpCriarConfiguracaoDeAnalise(tipo:string,classe:string): Observable<IConfiguracaoDeAnaliseResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.post<IConfiguracaoDeAnaliseResponse>(this.#criarConfiguracaoDeAnaliseUrl(),{tipo,classe} ,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setConfiguracaoDeAnalise.set(res);
      })
    );   
  }

  #setListarConfiguracaoDeAnalise = signal<IConfiguracaoDeAnaliseResponse| null>(null);
  public getListarConfiguracaoDeAnalise = this.#setListarConfiguracaoDeAnalise.asReadonly();

  public httpListarConfiguracaoDeAnalise(): Observable<IConfiguracaoDeAnaliseResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IConfiguracaoDeAnaliseResponse>(this.#listarConfiguracaoDeAnaliseUrl(),{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarConfiguracaoDeAnalise.set(res);
      })
    );   
  }

  #setEditarConfiguracaoDeAnalise = signal<IConfiguracaoDeAnaliseResponse| null>(null);
  public getEditarConfiguracaoDeAnalise = this.#setEditarConfiguracaoDeAnalise.asReadonly();

  public httpEditarConfiguracaoDeAnalise(id: string,tipo:string,classe:string): Observable<IConfiguracaoDeAnaliseResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.patch<IConfiguracaoDeAnaliseResponse>(`${this.#editarConfiguracaoDeAnaliseUrl()}${id}`,{tipo,classe} ,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setEditarConfiguracaoDeAnalise.set(res);
      })
    );   
  }
  

  #setDeletarConfiguracaoDeAnalise = signal<IConfiguracaoDeAnaliseResponse| null>(null);
  public getDeletarConfiguracaoDeAnalise = this.#setDeletarConfiguracaoDeAnalise.asReadonly();

  public httpDeletarTipoDeAnalise(id:string): Observable<IConfiguracaoDeAnaliseResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.delete<IConfiguracaoDeAnaliseResponse>(`${this.#excluirConfiguracaoDeAnaliseUrl()}/${id}`,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setDeletarConfiguracaoDeAnalise.set(res);
      })
    );   
  }
  
 


  constructor() {}
}
