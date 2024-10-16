import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { HeaderComponent } from './../../layouts/header/header.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pageIco = 'home'; //Materials icons name
  pageTitle = 'Home';
}
