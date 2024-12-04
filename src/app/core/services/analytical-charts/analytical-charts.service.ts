import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAnalyticResult } from '../../../shared/interfaces/IAnalyticals.interface';


@Injectable({
  providedIn: 'root'
})
export class AnalyticalChartsService {
  #http = inject(HttpClient);
#analyticalChartData = signal(`${environment.api_url}/analytics/analytical-data`);


#setAnalyticalChartData = signal<IAnalyticResult| null>(null);
public getAnalyticalChartData = this.#setAnalyticalChartData.asReadonly();

public httpAnalyticalChartData(): Observable<IAnalyticResult> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
  return this.#http.get<IAnalyticResult>(this.#analyticalChartData(),{ headers }).pipe(
    shareReplay(),
    tap((res) => {
      this.#setAnalyticalChartData.set(res);
    })
  );   
}
/*
#setAnalyticalChartDataEnsaios = signal<IAnalyticResult| null>(null);
public getAnalyticalChartDataEnsaios= this.#setAnalyticalChartDataEnsaios.asReadonly();

public httpAnalyticalChartDataEnsaios(): Observable<IAnalyticResult> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
  return this.#http.get<IAnalyticResult>(this.#analyticalChartDataEnsaios(),{ headers }).pipe(
    shareReplay(),
    tap((res) => {
      this.#setAnalyticalChartDataEnsaios.set(res);
    })
  );   
}
  */

  constructor() { }
}
