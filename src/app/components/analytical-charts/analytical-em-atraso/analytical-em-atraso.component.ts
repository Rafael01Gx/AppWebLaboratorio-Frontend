import {
  Component,
  effect,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ChartComponent,
  NgApexchartsModule,ApexStroke
} from 'ng-apexcharts';
import { IEmAtrasoResultData } from '../../../shared/interfaces/IAnalyticals.interface';
import { IWidthAndHeight } from '../../../shared/interfaces/IDimensoes.interface';
import { NgStyle } from '@angular/common';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
};

@Component({
  selector: 'app-analytical-em-atraso',
  imports: [NgApexchartsModule,NgStyle],
  templateUrl: './analytical-em-atraso.component.html',
  styleUrl: './analytical-em-atraso.component.scss',
})
export class AnalyticalEmAtrasoComponent implements OnInit {
  @Input({ alias: 'widthAndHeight', required: true }) set inputDimensoes(
    widthAndHeight: IWidthAndHeight
  ) {
    this.dimensoes.set(widthAndHeight);
  }

  public dimensoes = signal<IWidthAndHeight>({ width: 0, height: 0 });
  private route = inject(ActivatedRoute);
  public emAtrasoResultData!: IEmAtrasoResultData;
  public ensaios_em_atraso!: TData;
  public exibirGrafico:Boolean = false

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
  //  this.initializeChartFromResolver();
   
  }
  constructor() {
    effect(() => {
      const { width, height } = this.dimensoes();
      this.initializeChartFromResolver()

    });
  }
  /*  ngAfterViewInit(): void {

  } */

  private initializeChartFromResolver(): void {
    const resolvedData = this.route.snapshot.data['analyticsData'];
    const data: IEmAtrasoResultData['ensaios_em_atraso'] =
      resolvedData.ensaios_em_atraso.ensaios_em_atraso;
    if (resolvedData.ensaios_em_atraso) {
      const { y, x } = data.reduce(
        (item: { y: string[]; x: number[] }, [text, value]) => {
          item.y.push(text);
          item.x.push(value);
          return item;
        },
        { y: [], x: [] }
      );
      this.ensaios_em_atraso = { ensaios: y, quantidades: x };
      this.ensaios_em_atraso.quantidades.length
        ? (this.exibirGrafico = true)
        : (this.exibirGrafico = false);
      this.initChart(this.ensaios_em_atraso);
    }
  }

  initChart(data: TData): void {
    this.chartOptions = {
      series: this.ensaios_em_atraso.quantidades,
      chart: {
        type: "polarArea",  
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 0.8
      },
      labels: this.ensaios_em_atraso.ensaios
      ,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
type TData = {
  ensaios: string[];
  quantidades: number[];
};
