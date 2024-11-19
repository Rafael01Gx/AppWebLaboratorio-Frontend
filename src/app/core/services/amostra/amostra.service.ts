import { inject, Injectable, signal } from '@angular/core';
import { IAmostra, IAmostrasResponse, IResultadoCollection } from '../../../shared/interfaces/IAmostra.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IOrdemDeServico } from '../../../shared/interfaces/IOrdemDeservico.interface';

@Injectable({
  providedIn: 'root'
})
export class AmostraService {

  #http = inject(HttpClient);

  #editarAmostraUrl = signal(`${environment.api_url}/amostras/editar/`);
  #listarTodasAsAmostrasUrl = signal(`${environment.api_url}/amostras/listar-all`);
  #listarAmostraByUserUrl = signal(`${environment.api_url}/amostras/listar`);
  #listarAmostraByOrdemDeServicoUrl = signal(`${environment.api_url}/amostras/listar/listar-by-os`);
  #excluirAmostraUrl = signal(`${environment.api_url}/amostras/deletar`);


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

  #setListarAmostraByOrdemDeServico = signal<IAmostrasResponse| null>(null);
  public getListarAmostraByOrdemDeServico = this.#setListarAmostraByOrdemDeServico.asReadonly();

  public httpListarAmostraByOrdemDeServico(id:IOrdemDeServico['numeroOs']): Observable<IAmostrasResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IAmostrasResponse>(`${this.#listarAmostraByOrdemDeServicoUrl()}/${id}`,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarAmostraByOrdemDeServico.set(res);
      })
    );   
  }

  #setEditarAmostra = signal<IAmostrasResponse| null>(null);
  public getEditarAmostra = this.#setEditarAmostra.asReadonly();

  public httpEditarAmostra(id: string,amostra: IAmostra): Observable<IAmostrasResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.patch<IAmostrasResponse>(`${this.#editarAmostraUrl()}${id}`,{amostra} ,{ headers }).pipe(
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
