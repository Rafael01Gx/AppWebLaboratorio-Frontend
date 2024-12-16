import { Component, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { AnalyticalDemandasComponent } from '../../components/analytical-charts/analytical-demandas/analytical-demandas.component';
import { AnalyticalEmAtrasoComponent } from '../../components/analytical-charts/analytical-em-atraso/analytical-em-atraso.component';
import { AnalyticalEnsaiosComponent } from '../../components/analytical-charts/analytical-ensaios/analytical-ensaios.component';
import { AnalyticalOsComponent } from '../../components/analytical-charts/analytical-os/analytical-os.component';
import { HeaderComponent } from '../../layouts/header/header.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';


@Component({
    selector: 'app-painel-analises-preditivas',
    imports: [HeaderComponent, SidenavComponent, MainComponent, MatCard, AnalyticalOsComponent, AnalyticalEnsaiosComponent, AnalyticalDemandasComponent, AnalyticalEmAtrasoComponent],
    templateUrl: './painel-analises-preditivas.component.html',
    styleUrl: './painel-analises-preditivas.component.scss'
})
export class PainelAnalisesPreditivasComponent implements AfterViewInit {
@ViewChild('dashboard') chartElement!: ElementRef;
public widthAndHeight = signal<{ width: number, height: number}>({width: 0, height: 0});
  pageIco = 'monitoring';
  pageTitle = 'Dashboard';


public pass:boolean = false; 
  ngAfterViewInit(): void {
    setTimeout(() => {this.widthAndHeight.set(this.getChartDimensions())})
  }

  getChartDimensions(): { width: number, height: number }{
    const chart = this.chartElement?.nativeElement;
   const tamanho = {
     width:((chart.clientWidth/2) * 0.90),
     height :((chart.clientHeight/2) * 0.87)
   }
    return chart? tamanho : {width:0, height:0};
  }

}

