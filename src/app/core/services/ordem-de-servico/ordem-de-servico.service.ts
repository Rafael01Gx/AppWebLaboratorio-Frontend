import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { INovaOs, IOrdemDeServico, IOrdemDeServicoResponse } from '../../../shared/interfaces/ordemdeservico';
import { IAmostra } from '../../../shared/interfaces/amostra';

@Injectable({
  providedIn: 'root'
})
export class OrdemDeServicoService {
  #http = inject(HttpClient);
  #criarOsUrl = signal(`${environment.api_url}/ordemdeservico/criar`);

  

  //Criar OS
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

  constructor() {}
}
