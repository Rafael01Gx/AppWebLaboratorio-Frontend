import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { MainComponent } from '../../layouts/main/main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfiguracaoAnaliseComponent } from '../../components/componentes-configuracao/configuracao-analise/configuracao-analise.component';
import { MateriaPrimaComponent } from '../../components/componentes-configuracao/materia-prima/materia-prima.component';
import { ParametrosComponent } from '../../components/componentes-configuracao/parametros/parametros.component';
import { TipoDeAnaliseComponent } from '../../components/componentes-configuracao/tipo-de-analise/tipo-de-analise.component';
import { ConfiguracaoAnaliseListaComponent } from '../../components/componentes-configuracao/configuracao-analise-lista/configuracao-analise-lista.component';


@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,MainComponent,MatTabsModule,ConfiguracaoAnaliseComponent,MateriaPrimaComponent,ParametrosComponent,TipoDeAnaliseComponent,ConfiguracaoAnaliseListaComponent],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss'
})
export class ConfiguracoesComponent {
  pageIco = 'settings'; //Materials icons name
  pageTitle = 'Configurações';


  
}

