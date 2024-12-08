import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {
  IAnalyticResult,
  IDemandaEnsaios,
} from '../../../shared/interfaces/IAnalyticals.interface';
import { HelpersService } from '../../../core/services/helpers/helpers.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};
export type TSeries = {
  name: string;
  data: number[];
};

@Component({
  selector: 'app-analytical-demandas',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './analytical-demandas.component.html',
  styleUrl: './analytical-demandas.component.scss',
})
export class AnalyticalDemandasComponent implements OnInit {
  #helpService = inject(HelpersService);
  @ViewChild('chart') chart!: ChartComponent;
  private route = inject(ActivatedRoute);
  public chartOptions!: Partial<ChartOptions>;
  ngOnInit(): void {
    this.initializeChartFromResolver();
  }

  private initializeChartFromResolver(): void {
    const formater = this.#helpService.getMonthAndWeek
    const resolvedData = this.route.snapshot.data['analyticsData'];
    let values : TSeries[]=[] ;
    let categories : string[]=[];
    let categoriesFormat: string[];
    if (resolvedData.demanda_ensaios) {
      for (let key in resolvedData.demanda_ensaios) {
        if (resolvedData.demanda_ensaios.hasOwnProperty(key)) {
         const data = resolvedData.demanda_ensaios[key].semana
          const series:TSeries = {
            name: key,
            data: resolvedData.demanda_ensaios[key].quantidade,
          };

          categories=data;
         values.push(series);
        }
      }
      categoriesFormat = categories.map((week: string) => formater(week))

      this.initChart(resolvedData.demanda_ensaios,values,categoriesFormat);
    }

  }

  initChart(data: IDemandaEnsaios, values: TSeries[], categories: string[]) {
    this.chartOptions = {
      series: values,
      chart: {
        type: 'bar',
        height: 300,
        width:"100%",
        stacked: true,
        events: {
          mounted: (chart) => {
            chart.windowResizeHandler();
          }}
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Demanda de Ensaios por Semana',
      },
      xaxis: {
        categories: categories,
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + '';
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
  }
}
