import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { IAtualizarOrdemDeServico, INovaOs, IOrdemDeServico, IOrdemDeServicoByOsResponse, IOrdemDeServicoResponse } from '../../../shared/interfaces/IOrdemDeservico.interface';
import { IAmostra } from '../../../shared/interfaces/IAmostra.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdemDeServicoService {
  #http = inject(HttpClient);
  #criarOsUrl = signal(`${environment.api_url}/ordemdeservico/criar`);
  #listarOsByUserIdUrl = signal(`${environment.api_url}/ordemdeservico/listar`);
  #listarTodasOrdensDeServicoUrl = signal(`${environment.api_url}/ordemdeservico/listar/todas`);
  #ListarOrdensDeServicoByOsNumberUrl = signal(`${environment.api_url}/ordemdeservico/os-number`);
  #editarOrdemDeServicoUrl = signal(`${environment.api_url}/ordemdeservico/editar`);
  #removerOrdemDeServicoUrl = signal(`${environment.api_url}/ordemdeservico/deletar`);

  


  #setOrdemDeServico = signal<IOrdemDeServicoByOsResponse| null>(null);
  public getOrdemDeServico = this.#setOrdemDeServico.asReadonly();

  public httpCriarOrdemDeServico(amostras:IAmostra,observacao:string): Observable<IOrdemDeServicoByOsResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.post<IOrdemDeServicoByOsResponse>(this.#criarOsUrl(),{amostras,observacao} ,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setOrdemDeServico.set(res);
      })
    );   
  }

  

  #setListarOrdemDeServicoByUserId = signal<IOrdemDeServicoResponse| null>(null);
  public getListarOrdemDeServicoByUserId = this.#setListarOrdemDeServicoByUserId.asReadonly();

  public httpListarOrdemDeServicoByUserId(): Observable<IOrdemDeServicoResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IOrdemDeServicoResponse>(`${this.#listarOsByUserIdUrl()}`,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarOrdemDeServicoByUserId.set(res);
      })
    );   
  }

  #setListarTodasOrdensDeServico = signal<IOrdemDeServicoResponse| null>(null);
  public getListarTodasOrdensDeServico = this.#setListarTodasOrdensDeServico.asReadonly();

  public httpListarTodasOrdensDeServico(): Observable<IOrdemDeServicoResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IOrdemDeServicoResponse>(`${this.#listarTodasOrdensDeServicoUrl()}`,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarTodasOrdensDeServico.set(res);
      })
    );   
  }


  #setListarEditarOrdensDeServico = signal<IOrdemDeServicoResponse| null>(null);
  public getEditarOrdensDeServico = this.#setListarEditarOrdensDeServico.asReadonly();

  public httpEditarOrdemDeServico(ordemDeServico:IAtualizarOrdemDeServico): Observable<IOrdemDeServicoResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.patch<IOrdemDeServicoResponse>(`${this.#editarOrdemDeServicoUrl()}/${ordemDeServico._id}`,{ordemDeServico},{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarEditarOrdensDeServico.set(res);
      })
    );   
  }

  #setExcluirEditarOrdensDeServico = signal<IOrdemDeServicoResponse| null>(null);
  public getExcluirEditarOrdensDeServico = this.#setExcluirEditarOrdensDeServico.asReadonly();

  public httpExcluirOrdemDeServico(id:IOrdemDeServico['_id']): Observable<IOrdemDeServicoResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.delete<IOrdemDeServicoResponse>(`${this.#removerOrdemDeServicoUrl()}/${id}`,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setListarEditarOrdensDeServico.set(res);
      })
    );   
  }

  #setOrdemDeServicoByOsNumber = signal<IOrdemDeServicoByOsResponse| null>(null);
  public getOrdemDeServicoByOsNumber = this.#setOrdemDeServicoByOsNumber.asReadonly();

  public httpOrdemDeServicoByOsNumber(os:IOrdemDeServico['numeroOs']): Observable<IOrdemDeServicoByOsResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.get<IOrdemDeServicoByOsResponse>(`${this.#ListarOrdensDeServicoByOsNumberUrl()}/${os}`,{ headers }).pipe(
      shareReplay(),
      tap((res) => {
        this.#setOrdemDeServicoByOsNumber.set(res);
      })
    );   
  }



  constructor() {}
}
