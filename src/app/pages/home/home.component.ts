import { AnalyticalDemandasComponent } from '../../components/analytical-charts/analytical-demandas/analytical-demandas.component';
import { AnalyticalEmAtrasoComponent } from '../../components/analytical-charts/analytical-em-atraso/analytical-em-atraso.component';
import { AnalyticalEnsaiosComponent } from '../../components/analytical-charts/analytical-ensaios/analytical-ensaios.component';
import { AnalyticalOsComponent } from '../../components/analytical-charts/analytical-os/analytical-os.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { HeaderComponent } from './../../layouts/header/header.component';
import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,MainComponent,MatCard,AnalyticalOsComponent,AnalyticalEnsaiosComponent,AnalyticalDemandasComponent,AnalyticalEmAtrasoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pageIco = 'home'; //Materials icons name
  pageTitle = 'Home';


}

