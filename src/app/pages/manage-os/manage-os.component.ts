import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../layouts/header/header.component';
import { MainComponent } from '../../layouts/main/main.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';

@Component({
    selector: 'app-manage-os',
    imports: [HeaderComponent, MainComponent, SidenavComponent, RouterLink, MatIcon, MatCardModule, RouterLinkActive, RouterOutlet],
    templateUrl: './manage-os.component.html',
    styleUrl: './manage-os.component.scss'
})
export class ManageOsComponent {
  pageIco = 'manage_search'; //Materials icons name
  pageTitle = 'Gerenciar OS';



  linkAnalises= [
    {
      ico: 'block',
      name: 'Aguardando',
      link: 'aguardando-autorizacao',
    },
    {
      ico: 'start',
      name: 'Autorizada',
      link: 'aguardando-analise',
    },
    {
      ico: 'commit',
      name: 'Em Execução',
      link: 'os-em-andamento',
    },
    {
      ico: 'check_small',
      name: 'Finalizadas',
      link: 'finalizadas',
    },
  ]


}
