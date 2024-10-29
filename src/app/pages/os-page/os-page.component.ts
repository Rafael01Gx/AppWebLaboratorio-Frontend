import { OsFinalizadasComponent } from '../../components/componentes-ordem-de-servico/os-finalizadas/os-finalizadas.component';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { MainComponent } from '../../layouts/main/main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NovaOsComponent } from '../../components/componentes-ordem-de-servico/nova-os/nova-os.component';
import { OsPendentesComponent } from '../../components/componentes-ordem-de-servico/os-pendentes/os-pendentes.component';

@Component({
  selector: 'app-os-page',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,MainComponent,MatTabsModule,NovaOsComponent,OsFinalizadasComponent,OsPendentesComponent],
  templateUrl: './os-page.component.html',
  styleUrl: './os-page.component.scss'
})
export class OsPageComponent {
  pageIco = 'description'; //Materials icons name
  pageTitle = 'Ordens de Serviço';
}
