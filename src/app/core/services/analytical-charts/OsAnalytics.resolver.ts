import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnalyticalChartsService } from './analytical-charts.service';
import { IAnalyticResult } from '../../../shared/interfaces/IAnalyticals.interface';

@Injectable({
  providedIn: 'root'
})
export class OsAnalyticsResolver implements Resolve<{
  total: number[];
  finalizadas: number[];
  datas: string[];
}> {
 analyticalChartsService= inject(AnalyticalChartsService)

  resolve(): Observable<{
    total: number[];
    finalizadas: number[];
    datas: string[];
  }> {
    return this.analyticalChartsService.httpAnalyticalChartDataOs().pipe(
      map((response: IAnalyticResult) => {
        if (!response || !response.ordem_de_servico_analytics) {
          return { total: [], finalizadas: [], datas: [] };
        }

        const totaisData = response.ordem_de_servico_analytics['ordens_de_servicos_totais'] || [];
        const finalizadasData = response.ordem_de_servico_analytics['ordens_de_servico_finalizadas'] || [];

        const total = totaisData.map(item => item.quantidade);
        const finalizadas = finalizadasData.map(item => item.quantidade);
        
        const datas = [...new Set([
          ...totaisData.map(item => item.data),
          ...finalizadasData.map(item => item.data)
        ])];

        return { total, finalizadas, datas };
      }),
      catchError((error) => {
        console.error('Erro no resolver de analytics:', error);
        // Retorna um objeto vazio em caso de erro
        return of({ total: [], finalizadas: [], datas: [] });
      })
    );
  }
}