import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { HeaderComponent } from '../../layouts/header/header.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { ListaDeAmostrasComponent } from '../../components/lista-de-amostras/lista-de-amostras.component';

@Component({
    selector: 'app-amostras',
    imports: [HeaderComponent, SidenavComponent, MainComponent, MatCard, ListaDeAmostrasComponent],
    templateUrl: './amostras.component.html',
    styleUrl: './amostras.component.scss'
})
export class AmostrasComponent {
  pageIco = 'task'; //Materials icons name
  pageTitle = 'Amostras';

}
