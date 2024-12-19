import { Component, effect, ElementRef, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
  NgApexchartsModule,
  
} from 'ng-apexcharts';
import { IWidthAndHeight } from '../../../shared/interfaces/IDimensoes.interface';
import { NgStyle } from '@angular/common';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: { width: number[] };
  dataLabels: { enabled: boolean; enabledOnSeries: number[] };
  fill: ApexFill;
  tooltip: ApexTooltip;

}

@Component({
    selector: 'app-analytical-os',
    imports: [NgApexchartsModule,NgStyle],
    templateUrl: './analytical-os.component.html',
    styleUrl: './analytical-os.component.scss'
})
export class AnalyticalOsComponent implements OnInit {
  public exibirGrafico:Boolean = false
  @Input({ alias: 'widthAndHeight', required: true }) set inputDimensoes(
    widthAndHeight: IWidthAndHeight
  ) {
    this.dimensoes.set(widthAndHeight);
  }

  public dimensoes = signal<IWidthAndHeight>({ width: 0, height: 0 });
  public chartOptions!: Partial<ChartOptions>;
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
   // this.initializeChartFromResolver();
 
  }
  constructor() {
    effect(() => {
      const { width, height } = this.dimensoes();
      this.initializeChartFromResolver()

    });
  }
  

  private initializeChartFromResolver(): void {
    const resolvedData = this.route.snapshot.data['analyticsData'];
    if (resolvedData.osData && resolvedData.osData.total.length > 0) {
    this.exibirGrafico = true
      this.configureChartOptions(
        resolvedData.osData.total, 
        resolvedData.osData.finalizadas, 
        resolvedData.osData.datas,
      );
    }
  }

  private configureChartOptions(
    total: number[], 
    finalizadas: number[], 
    datas: string[]
  ): void {
    this.chartOptions = {
      series: [
        {
          name: 'Total Ordens de Serviço',
          type: 'column',
          data: total,
        },
        {
          name: 'Ordens de Serviço Finalizadas',
          type: 'line',
          data: finalizadas,
        },
      ],
      chart: {
        type: 'line',
        height:this.dimensoes().height,
        width:this.dimensoes().width,
        stacked: true,
        toolbar: {
          show: true,
          tools:{
            download:true,
            selection:true,
            zoom: false,
            pan: false,
            zoomin:false,
            zoomout:false,
            reset: false,

          }
        }
      },
    
      stroke: {
        width: [0, 4],
      },
      
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: datas,
      xaxis: {
        type: 'category',
        categories: datas,
        title: {
          text: 'Períodos',
        },
      },
      yaxis: [
        {
          title: {
            text: 'Total de Ordens',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Ordens Finalizadas',
          },
        },
      ],

    };
  }

}