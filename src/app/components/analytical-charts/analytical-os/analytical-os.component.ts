import { Component, OnInit } from '@angular/core';
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
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './analytical-os.component.html',
  styleUrl: './analytical-os.component.scss',
})
export class AnalyticalOsComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeChartFromResolver();
  }

  private initializeChartFromResolver(): void {
    // Obtém os dados do resolver
    const resolvedData = this.route.snapshot.data['analyticsData'];

    // Verifica se há dados válidos
    if (resolvedData) {
      this.configureChartOptions(
        resolvedData.total, 
        resolvedData.finalizadas, 
        resolvedData.datas
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
        height: 350,
        type: 'line',
        toolbar: {
          show: true,
        },
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: 'Análise de Ordens de Serviço',
        align: 'left',
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