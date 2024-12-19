import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-analises',
    imports: [HeaderComponent, MainComponent, SidenavComponent, RouterLink, MatIcon, MatCardModule, RouterLinkActive, RouterOutlet],
    templateUrl: './analises.component.html',
    styleUrl: './analises.component.scss'
})
export class AnalisesComponent {
  pageIco = 'workspaces'; //Materials icons name
  pageTitle = 'Análises';



  linkAnalises= [
    {
      ico: 'block',
      name: 'Aguardando',
      link: 'aguardando-autorizacao',
    },
    {
      ico: 'hourglass_disabled',
      name: 'Aguardando Análise',
      link: 'aguardando-analise',
    },
    {
      ico: 'hourglass_bottom',
      name: 'Em andamento',
      link: 'analise-em-andamento',
    },
    {
      ico: 'check_small',
      name: 'Finalizadas',
      link: 'finalizadas',
    },
  ]


}
