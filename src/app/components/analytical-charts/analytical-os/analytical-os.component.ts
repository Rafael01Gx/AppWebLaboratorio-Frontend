import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
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
    imports: [NgApexchartsModule],
    templateUrl: './analytical-os.component.html',
    styleUrl: './analytical-os.component.scss'
})
export class AnalyticalOsComponent implements OnInit,AfterViewInit {

  @Input({ alias:"widthAndHeight",required:true}) widthAndHeight!: { width: number, height: number };
  public chartOptions!: Partial<ChartOptions>;
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    this.initializeChartFromResolver();
 
  }
ngAfterViewInit(): void {
  this.chartOptions.chart!.height = this.widthAndHeight.height;
  this.chartOptions.chart!.width = "100%";
}
  

  private initializeChartFromResolver(): void {
    const resolvedData = this.route.snapshot.data['analyticsData'];

    if (resolvedData.osData) {
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
        height:300,
        width:"100%",
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