import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { AnalyticalDemandasComponent } from '../../components/analytical-charts/analytical-demandas/analytical-demandas.component';
import { AnalyticalEmAtrasoComponent } from '../../components/analytical-charts/analytical-em-atraso/analytical-em-atraso.component';
import { AnalyticalEnsaiosComponent } from '../../components/analytical-charts/analytical-ensaios/analytical-ensaios.component';
import { AnalyticalOsComponent } from '../../components/analytical-charts/analytical-os/analytical-os.component';
import { InfoPageComponent } from '../../components/info-page/info-page.component';
import { HeaderComponent } from '../../layouts/header/header.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';


@Component({
  selector: 'app-painel-analises-preditivas',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,MainComponent,MatCard,AnalyticalOsComponent,AnalyticalEnsaiosComponent,AnalyticalDemandasComponent,AnalyticalEmAtrasoComponent,InfoPageComponent],
  templateUrl: './painel-analises-preditivas.component.html',
  styleUrl: './painel-analises-preditivas.component.scss'
})
export class PainelAnalisesPreditivasComponent implements AfterViewInit {
@ViewChild('dashboard') chartElement!: ElementRef;
public widthAndHeight!:{ width: number, height: number };
  pageIco = 'monitoring'; //Materials icons name
  pageTitle = 'Dashboard';


public pass:boolean = false; 
  ngAfterViewInit(): void {
    this.widthAndHeight = this.getChartDimensions()
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

