import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { MainComponent } from '../../layouts/main/main.component';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-os-page',
  standalone: true,
  imports: [HeaderComponent,MainComponent,SidenavComponent,RouterLink,MatIcon,MatCardModule,RouterLinkActive,RouterOutlet],
  templateUrl: './os-page.component.html',
  styleUrl: './os-page.component.scss'
})
export class OsPageComponent {
  pageIco = 'description'; //Materials icons name
  pageTitle = 'Ordens de Serviço';

  linkOS= [
    {
      ico: 'edit_note',
      name: 'Nova',
      link: 'nova-ordem-de-servico',
    },
    {
      ico: 'pending_actions',
      name: 'Pendentes',
      link: 'aguardando-analise',
    },
    {
      ico: 'done_all',
      name: 'Finalizadas',
      link: 'ordem-de-servico-concluidas',
    }
  ]

}
