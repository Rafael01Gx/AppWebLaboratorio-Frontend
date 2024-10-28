import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';

@Component({
  selector: 'app-analises',
  standalone: true,
  imports: [HeaderComponent,MainComponent,SidenavComponent],
  templateUrl: './analises.component.html',
  styleUrl: './analises.component.scss'
})
export class AnalisesComponent {
  pageIco = 'task'; //Materials icons name
  pageTitle = 'Análises';
}
