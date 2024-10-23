import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';
import { IMateriaPrimaResponse } from '../../../shared/interfaces/IMateriasPrimas.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  #http = inject(HttpClient);
  #criarMateriaPrimaUrl = signal(`${environment.api_url}/materiaprima/criar`);
  #editarMateriaPrimaUrl = signal(`${environment.api_url}/materiaprima/editar`);
  #listarMateriaPrimaUrl = signal(`${environment.api_url}/materiaprima/listar`);
  #excluirMateriaPrimaUrl = signal(`${environment.api_url}/materiaprima/deletar`);

  
  #setMateriaPrima = signal<IMateriaPrimaResponse| null>(null);
  public getMateriaPrima = this.#setMateriaPrima.asReadonly();

  public httpCriarMateriaPrima(nome_descricao:string,classe_tipo:string): Observable<IMateriaPrimaResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.post<IMateriaPrimaResponse>(this.#criarMateriaPrimaUrl(),{nome_descricao,classe_tipo} ,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setMateriaPrima.set(res);
      })
    );   
  }

  #setListarMateriaPrima = signal<IMateriaPrimaResponse| null>(null);
  public getListarMateriaPrima = this.#setListarMateriaPrima.asReadonly();

  public httpListarMateriaPrima(): Observable<IMateriaPrimaResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IMateriaPrimaResponse>(this.#listarMateriaPrimaUrl(),{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarMateriaPrima.set(res);
      })
    );   
  }

  #setEditarMateriaPrima = signal<IMateriaPrimaResponse| null>(null);
  public getEditarMateriaPrima = this.#setEditarMateriaPrima.asReadonly();

  public httpEditarMateriaPrima(id: string,nome_descricao:string,classe_tipo:string): Observable<IMateriaPrimaResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.patch<IMateriaPrimaResponse>(`${this.#editarMateriaPrimaUrl()}${id}`,{nome_descricao,classe_tipo} ,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setEditarMateriaPrima.set(res);
      })
    );   
  }
  

  #setDeletarMateriaPrima = signal<IMateriaPrimaResponse| null>(null);
  public getDeletarMateriaPrima = this.#setDeletarMateriaPrima.asReadonly();

  public httpDeletarTipoDeAnalise(id:string): Observable<IMateriaPrimaResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.delete<IMateriaPrimaResponse>(`${this.#excluirMateriaPrimaUrl()}/${id}`,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setDeletarMateriaPrima.set(res);
      })
    );   
  }
  
 


  constructor() {}
}
