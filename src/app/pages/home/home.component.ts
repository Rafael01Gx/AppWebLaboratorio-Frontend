import { AnalyticalOsComponent } from '../../components/analytical-charts/analytical-os/analytical-os.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { HeaderComponent } from './../../layouts/header/header.component';
import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,MainComponent,MatCard,AnalyticalOsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pageIco = 'home'; //Materials icons name
  pageTitle = 'Home';


}

