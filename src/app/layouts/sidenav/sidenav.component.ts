import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidenavService } from '../../core/services/sidenav/exibir-txt.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  ngOnInit() {
    this.exibirTxt = this.sidenavService.getExibirTxt();
  }

  exibirTxt: boolean;

  constructor(private sidenavService: SidenavService) {
    this.exibirTxt = this.sidenavService.getExibirTxt();
  }

  toggleTxt() {
    this.exibirTxt = !this.exibirTxt;
    this.sidenavService.setExibirTxt(this.exibirTxt);
  }

  menu = [
    {
      ico: 'description',
      name: 'Minhas OS',
      link: '/ordensdeservico',
    },
    {
      ico: 'task',
      name: 'Amostras',
      link: '',
    },

    {
      ico: 'science',
      name: 'SGS',
      link: '',
    },
    {
      ico: 'manage_accounts',
      name: 'Contas',
      link: '/gerenciar-contas',
    },
    {
      ico: 'settings',
      name: 'Configurações',
      link: '/configuracoes',
    },
  ];
}
