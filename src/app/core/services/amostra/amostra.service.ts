import { inject, Injectable, signal } from '@angular/core';
import { IAmostrasResponse } from '../../../shared/interfaces/IAmostra.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AmostraService {

  #http = inject(HttpClient);
  // #criarAmostraUrl = signal(`${environment.api_url}/amostras/criar`);
  #editarAmostraUrl = signal(`${environment.api_url}/amostras/editar/:id`);
  #listarTodasAsAmostrasUrl = signal(`${environment.api_url}/amostras/listar-all`);
  #listarAmostraByUserUrl = signal(`${environment.api_url}/amostras/listar`);
  #excluirAmostraUrl = signal(`${environment.api_url}/amostras/deletar`);

  /*
  #setAmostra = signal<IAmostrasResponse| null>(null);
  public getAmostra = this.#setAmostra.asReadonly();

  public httpCriarAmostra(tipo:string,classe:string): Observable<IAmostrasResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.post<IAmostrasResponse>(this.#criarAmostraUrl(),{tipo,classe} ,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setAmostra.set(res);
      })
    );   
  }  */

  #setListarAmostra = signal<IAmostrasResponse| null>(null);
  public getListarAmostra = this.#setListarAmostra.asReadonly();

  public httpListarAmostra(): Observable<IAmostrasResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IAmostrasResponse>(this.#listarAmostraByUserUrl(),{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarAmostra.set(res);
      })
    );   
  }

  #setListarTodasAsAmostras = signal<IAmostrasResponse| null>(null);
  public getListarTodasAsAmostras = this.#setListarTodasAsAmostras.asReadonly();

  public httpListarTodasAsAmostras(): Observable<IAmostrasResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IAmostrasResponse>(this.#listarTodasAsAmostrasUrl(),{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarTodasAsAmostras.set(res);
      })
    );   
  }

  #setEditarAmostra = signal<IAmostrasResponse| null>(null);
  public getEditarAmostra = this.#setEditarAmostra.asReadonly();

  public httpEditarAmostra(id: string,tipo:string,resultado:{}): Observable<IAmostrasResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.patch<IAmostrasResponse>(`${this.#editarAmostraUrl()}/${id}`,{resultado} ,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setEditarAmostra.set(res);
      })
    );   
  }
  

  #setDeletarAmostra = signal<IAmostrasResponse| null>(null);
  public getDeletarAmostra = this.#setDeletarAmostra.asReadonly();

  public httpDeletarAmostra(id:string): Observable<IAmostrasResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.delete<IAmostrasResponse>(`${this.#excluirAmostraUrl()}/${id}`,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setDeletarAmostra.set(res);
      })
    );   
  }
  
 


  constructor() {}
}
