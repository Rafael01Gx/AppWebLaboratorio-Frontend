import { AnalyticalDemandasComponent } from '../../components/analytical-charts/analytical-demandas/analytical-demandas.component';
import { AnalyticalEmAtrasoComponent } from '../../components/analytical-charts/analytical-em-atraso/analytical-em-atraso.component';
import { AnalyticalEnsaiosComponent } from '../../components/analytical-charts/analytical-ensaios/analytical-ensaios.component';
import { AnalyticalOsComponent } from '../../components/analytical-charts/analytical-os/analytical-os.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { HeaderComponent } from './../../layouts/header/header.component';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,MainComponent,MatCard,AnalyticalOsComponent,AnalyticalEnsaiosComponent,AnalyticalDemandasComponent,AnalyticalEmAtrasoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('dashboard') chartElement!: ElementRef;
public widthAndHeight!:{ width: number, height: number } ;
  pageIco = 'home'; //Materials icons name
  pageTitle = 'Home';

  ngAfterViewInit(): void {
    this.widthAndHeight= this.getChartDimensions()
    console.log(this.widthAndHeight)
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

