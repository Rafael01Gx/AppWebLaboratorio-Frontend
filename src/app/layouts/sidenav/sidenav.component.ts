import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  showText = true;

  menu = [
    {
      ico: 'description',
      name: 'OS',
      link: '/ordensdeservico',
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
      link: '',
    },
  ];

  toggleText() {
    this.showText = !this.showText;
  }
}
