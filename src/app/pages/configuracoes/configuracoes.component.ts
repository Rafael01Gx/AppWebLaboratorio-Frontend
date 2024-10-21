import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { MainComponent } from '../../layouts/main/main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NovaOsComponent } from '../../components/nova-os/nova-os.component';
import { OsFinalizadasComponent } from '../../components/os-finalizadas/os-finalizadas.component';
import { OsPendentesComponent } from '../../components/os-pendentes/os-pendentes.component';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,MainComponent,MatTabsModule,NovaOsComponent,OsFinalizadasComponent,OsPendentesComponent],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss'
})
export class ConfiguracoesComponent {
  pageIco = 'settings'; //Materials icons name
  pageTitle = 'configurações';

}
