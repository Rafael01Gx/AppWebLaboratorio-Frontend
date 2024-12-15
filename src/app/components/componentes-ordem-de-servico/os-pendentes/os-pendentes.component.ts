import { MatDialog } from '@angular/material/dialog';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { OrdemDeServicoService } from '../../../core/services/ordem-de-servico/ordem-de-servico.service';
import { IOrdemDeServico, IOrdemDeServicoResponse, IOrdensDeServico } from '../../../shared/interfaces/IOrdemDeservico.interface';
import { EStatus } from '../../../shared/Enum/status.enum';
import { ToastrService } from 'ngx-toastr';
import { MatIcon } from '@angular/material/icon';
import { NgxMaskPipe } from 'ngx-mask';
import { DeletModalComponent } from '../../modal/delete-user-modal/delete-modal.component';
import { PdfGeneratorServiceService } from '../../../core/services/helpers/pdf-generator-service.service';

@Component({
  selector: 'app-os-pendentes',
  standalone: true,
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCard,
    MatIcon,NgxMaskPipe
  ],
  templateUrl: './os-pendentes.component.html',
  styleUrl: './os-pendentes.component.scss'
})
export class OsPendentesComponent implements OnInit {
  pageIco = 'manage_accounts';
  pageTitle = 'Gerenciar contas';
  #ordemDeServicoService = inject(OrdemDeServicoService);
  #toast = inject(ToastrService)
  #dialog= inject(MatDialog)
  #pdfService = inject(PdfGeneratorServiceService)
  listOs: IOrdensDeServico['ordemsDeServico'] = []; 
  
  dataSource = new MatTableDataSource(this.listOs);
  displayedColumns: string[] = ['numeroOs', 'data_solicitacao', 'status','prazo_inicio_fim','etiqueta','excluir'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  ngOnInit(): void {
  this.listarDados()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogDelet(id: IOrdemDeServico['_id']): void {
    const dialogDelete = this.#dialog.open(DeletModalComponent, {
      width: '250px',
    });  
    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
       this.excluirOs(id)
    }});
  }

  excluirOs(id: IOrdemDeServico['_id']){
    this.#ordemDeServicoService.httpExcluirOrdemDeServico(id).subscribe( (response) => {
      if(response.message){
        this.#toast.success(response.message);
        this.listarDados()      
      } else {
        
      }
    }, (error) => {

       this.#toast.error(error.error.message);
  })
    
  }

listarDados(){
  this.#ordemDeServicoService.httpListarOrdemDeServicoByUserId().subscribe((response: IOrdemDeServicoResponse) => {
    if (response && response.ordemsDeServico) {
      this.listOs = response.ordemsDeServico.filter(os => os.status !== EStatus.Finalizada);
      this.dataSource.data = this.listOs.map(os => {
        const progressoCalculado = this.getOsProgresso(os);
        return { ...os, progresso_calculado: progressoCalculado };
      });
    } else {
      console.error('Nenhuma ordem de serviço encontrada na resposta');
    }
  });
}

getOsProgresso(os: IOrdemDeServico): number {
  if (!os.progresso) {
    return 0 ;
  }
  const keys = Object.keys(os.progresso);
  const qnt_keys = keys.length;
  const somaPercentuais = keys.reduce((soma, key) => {
    const valor = os.progresso![key];
    return soma + (typeof valor === 'number' ? valor : 0);
  }, 0);
  const progresso = somaPercentuais / qnt_keys;
  return progresso ;
}
gerarPDF_Etiqueta(ordemDeServico:IOrdemDeServico){
  this.#pdfService.gerarPDFEtiqueta(ordemDeServico)
}
excluirEmAndamento(){
  this.#toast.info('A exclusão da ordem de serviço em andamento não é permitida !')
}
}
