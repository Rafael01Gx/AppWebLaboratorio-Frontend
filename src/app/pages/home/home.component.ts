import { InfoPageComponent } from '../../components/info-page/info-page.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { HeaderComponent } from './../../layouts/header/header.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SidenavComponent,
    MainComponent,
    MatCard,
    InfoPageComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('dashboard') chartElement!: ElementRef;
  public widthAndHeight: { width: number; height: number } = {
    width: 0,
    height: 0,
  };
  pageIco = 'home'; //Materials icons name
  pageTitle = 'Home';
  #lvl!: string;
  public pass: boolean = false;
}
