import { Component, inject, Input, OnInit } from '@angular/core';
import { IOrdemDeServico } from '../../shared/interfaces/IOrdemDeservico.interface';
import { NgxMaskPipe } from 'ngx-mask';
import { IAmostrasCollection } from '../../shared/interfaces/IAmostra.interface';
import { AmostraService } from '../../core/services/amostra/amostra.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe, JsonPipe, NgFor} from '@angular/common';
import { DecimalFormatPipe } from '../../shared/pipes/decimal-format.pipe';

@Component({
  selector: 'app-relatorio-de-analise',
  standalone: true,
  imports: [NgxMaskPipe,AsyncPipe,JsonPipe,NgFor,DecimalFormatPipe],
  templateUrl: './relatorio-de-analise.component.html',
  styleUrl: './relatorio-de-analise.component.scss'
})
export class RelatorioDeAnaliseComponent implements OnInit {
#amoastraService = inject(AmostraService)
#toastr = inject(ToastrService)

ordemDeServico! : IOrdemDeServico ;
amostras: IAmostrasCollection[]=[]
  ngOnInit() {
    const storedOs = sessionStorage.getItem('ordemDeServico');
    if (storedOs) {
      this.ordemDeServico = JSON.parse(storedOs);
      sessionStorage.removeItem('ordemDeServico');
    }
    try {
    this.#amoastraService.httpListarAmostraByOrdemDeServico(this.ordemDeServico.numeroOs).subscribe((response=>{
      this.amostras = Object.values(response.amostras);
    }))
    } catch (error) {
     console.log(error)
    }
  }
  objectEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }
  objectEntries2(obj: any): any[] {
    return Object.entries(obj).map(entry => entry[1]); // Retorna apenas os valores, não as chaves
  }

}