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
  IDemandaEnsaios,
} from '../../../shared/interfaces/IAnalyticals.interface';
import { HelpersService } from '../../../core/services/helpers/helpers.service';
import { IWidthAndHeight } from '../../../shared/interfaces/IDimensoes.interface';

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
    imports: [NgApexchartsModule],
    templateUrl: './analytical-demandas.component.html',
    styleUrl: './analytical-demandas.component.scss'
})
export class AnalyticalDemandasComponent implements OnInit {
  @Input({ alias: 'widthAndHeight', required: true }) set inputDimensoes(
    widthAndHeight: IWidthAndHeight
  ) {
    this.dimensoes.set(widthAndHeight);
  }

  public dimensoes = signal<IWidthAndHeight>({ width: 0, height: 0 });
  #helpService = inject(HelpersService);
  @ViewChild('chart') chart!: ChartComponent;
  private route = inject(ActivatedRoute);
  public chartOptions!: Partial<ChartOptions>;
  ngOnInit(): void {
    this.initializeChartFromResolver();
  }
  constructor() {
    effect(() => {
      const { width, height } = this.dimensoes();
      this.initializeChartFromResolver()

    });
  }
  

  private initializeChartFromResolver(): void {
    const formater = this.#helpService.getMonthAndWeek;
    const resolvedData = this.route.snapshot.data['analyticsData'];
    let values: TSeries[] = [];
    let categories: string[] = [];
    let categoriesFormat: string[];
    if (resolvedData.demanda_ensaios) {
      for (let key in resolvedData.demanda_ensaios) {
        if (resolvedData.demanda_ensaios.hasOwnProperty(key)) {
          const data = resolvedData.demanda_ensaios[key].semana;
          const series: TSeries = {
            name: key,
            data: resolvedData.demanda_ensaios[key].quantidade,
          };

          categories = data;
          values.push(series);
        }
      }
      categoriesFormat = categories.map((week: string) => formater(week));

      this.initChart(resolvedData.demanda_ensaios, values, categoriesFormat);
    }
  }

  initChart(data: IDemandaEnsaios, values: TSeries[], categories: string[]) {
    this.chartOptions = {
      series: values,
      chart: {
        type: 'bar',
        height: this.dimensoes().height,
        width: this.dimensoes().width,
        stacked: true,
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
        position: 'bottom',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
  }
}
