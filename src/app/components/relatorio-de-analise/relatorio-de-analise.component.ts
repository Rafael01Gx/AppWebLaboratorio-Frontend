import { Component, inject, Input, OnInit } from '@angular/core';
import { IOrdemDeServico } from '../../shared/interfaces/IOrdemDeservico.interface';
import { NgxMaskPipe } from 'ngx-mask';
import { IAmostrasCollection } from '../../shared/interfaces/IAmostra.interface';
import { AmostraService } from '../../core/services/amostra/amostra.service';
import { NgFor} from '@angular/common';
import { DecimalFormatPipe } from '../../shared/pipes/decimal-format.pipe';
import { PdfGeneratorServiceService } from '../../core/services/helpers/pdf-generator-service.service';

@Component({
  selector: 'app-relatorio-de-analise',
  standalone: true,
  imports: [NgxMaskPipe,NgFor,DecimalFormatPipe],
  templateUrl: './relatorio-de-analise.component.html',
  styleUrl: './relatorio-de-analise.component.scss'
})
export class RelatorioDeAnaliseComponent implements OnInit {
#amoastraService = inject(AmostraService)
#pdfGenerator = inject(PdfGeneratorServiceService)
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
    setTimeout(()=>{
      this.gerarPDF()
    },1000)
  }
  objectEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }
  objectEntries2(obj: any): any[] {
    return Object.entries(obj).map(entry => entry[1]);
  }

  gerarPDF() {
    if (this.ordemDeServico && this.amostras.length > 0) {
      this.#pdfGenerator.generatePdfFromElement(
        this.ordemDeServico, 
        this.amostras
      );
    } else {
      console.warn('Não há dados para gerar PDF');
    }
  }

}