import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { INovaOs, IOrdemDeServico, IOrdemDeServicoResponse } from '../../../shared/interfaces/IOrdemDeservico.interface';
import { IAmostra } from '../../../shared/interfaces/IAmostra.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdemDeServicoService {
  #http = inject(HttpClient);
  #criarOsUrl = signal(`${environment.api_url}/ordemdeservico/criar`);
  #listarOsByUserIdUrl = signal(`${environment.api_url}/ordemdeservico/listar`);
  #listarTodasOrdensDeServicoUrl = signal(`${environment.api_url}/ordemdeservico/listar/todas`);

  


  #setOrdemDeServico = signal<IOrdemDeServicoResponse| null>(null);
  public getOrdemDeServico = this.#setOrdemDeServico.asReadonly();

  public httpCriarOrdemDeServico(amostras:IAmostra,observacao:string): Observable<IOrdemDeServicoResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
    return this.#http.post<IOrdemDeServicoResponse>(this.#criarOsUrl(),{amostras,observacao} ,{ headers }).pipe(
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



  constructor() {}
}
