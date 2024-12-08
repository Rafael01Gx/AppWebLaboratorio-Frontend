import { AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent,
  NgApexchartsModule,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { IEmAtrasoResultData } from '../../../shared/interfaces/IAnalyticals.interface';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-analytical-em-atraso',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './analytical-em-atraso.component.html',
  styleUrl: './analytical-em-atraso.component.scss',
})
export class AnalyticalEmAtrasoComponent implements OnInit, AfterViewInit {
  @Input({ alias:"widthAndHeight",required:true}) widthAndHeight!: { width: number, height: number };
  private route = inject(ActivatedRoute);
  public emAtrasoResultData!: IEmAtrasoResultData;
  public ensaios_em_atraso!: TData;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptions2!: Partial<ChartOptions>;

  ngOnInit(): void {
    this.initializeChartFromResolver();
  }
  ngAfterViewInit(): void {
    this.chartOptions.chart!.height = this.widthAndHeight.height;
    this.chartOptions.chart!.width = "100%";
  }

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

      this.initChart(this.ensaios_em_atraso);
    }
  }

  initChart(data: TData): void {
    this.chartOptions = {
      series: data.quantidades,
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          offsetX: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      labels: data.ensaios,
      legend: {
        show: true,
        floating: true,
        fontSize: '12px',
        position: 'left',
        offsetX: 20,
        offsetY: 20,
        labels: {
          useSeriesColors: true,
        },
        formatter: function (seriesName, opts) {
          seriesName =
            seriesName.length > 5 ? seriesName.slice(0, 5) + '...' : seriesName;
          return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    };
  }
}
type TData = {
  ensaios: string[];
  quantidades: number[];
};
