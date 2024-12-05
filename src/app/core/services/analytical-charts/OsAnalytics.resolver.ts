import { IDemandaEnsaios, TEnsaiosData } from './../../../shared/interfaces/IAnalyticals.interface';
import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnalyticalChartsService } from './analytical-charts.service';
import { IAnalyticResult, IOsData } from '../../../shared/interfaces/IAnalyticals.interface';

@Injectable({
  providedIn: 'root'
})
export class OsAnalyticsResolver implements Resolve<{
  osData:IOsData,
  ensaiosData : TEnsaiosData,
  demanda_ensaios?:IDemandaEnsaios
}> {

 analyticalChartsService= inject(AnalyticalChartsService)

  resolve(): Observable<{
    osData:IOsData,
    ensaiosData : TEnsaiosData,
    demanda_ensaios?: IDemandaEnsaios
  }> {
    return this.analyticalChartsService.httpAnalyticalChartData().pipe(
      map((response: IAnalyticResult) => {
        if (!response || !response.os_analytics) {
          return { osData:{datas:[],finalizadas:[],total:[]} , ensaiosData : [] };
        }
       const osData: IOsData = {
        total : response.os_analytics.total,
        finalizadas : response.os_analytics.finalizadas,    
        datas : response.os_analytics.datas
       }
       const ensaiosData: TEnsaiosData = response.ensaios_analytics
       const demanda_ensaios:IDemandaEnsaios = response.demanda_ensaios
        return { osData , ensaiosData,demanda_ensaios};
      }),
      catchError((error) => {
        console.error('Erro no resolver de analytics:', error);

        return of({  osData:{datas:[],finalizadas:[],total:[]},ensaiosData : []});
      })
    );
  }
}