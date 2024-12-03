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
#analyticalChartDataOs = signal(`${environment.api_url}/analytics/analytical-data`);

#setAnalyticalChartDataOs = signal<IAnalyticResult| null>(null);
public getAnalyticalChartDataOs= this.#setAnalyticalChartDataOs.asReadonly();

public httpAnalyticalChartDataOs(): Observable<IAnalyticResult> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`);
  return this.#http.get<IAnalyticResult>(this.#analyticalChartDataOs(),{ headers }).pipe(
    shareReplay(),
    tap((res) => {
      this.#setAnalyticalChartDataOs.set(res);
    })
  );   
}

  constructor() { }
}
