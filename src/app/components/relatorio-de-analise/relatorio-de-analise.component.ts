import { Component, inject, Input, OnInit } from '@angular/core';
import { IOrdemDeServico } from '../../shared/interfaces/IOrdemDeservico.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorio-de-analise',
  standalone: true,
  imports: [],
  templateUrl: './relatorio-de-analise.component.html',
  styleUrl: './relatorio-de-analise.component.scss'
})
export class RelatorioDeAnaliseComponent implements OnInit {
ordemDeServico! : IOrdemDeServico ;

  ngOnInit() {
    const storedOs = sessionStorage.getItem('ordemDeServico');
    if (storedOs) {
      this.ordemDeServico = JSON.parse(storedOs);
      sessionStorage.removeItem('ordemDeServico');
    }
    console.log(this.ordemDeServico)
  }
}