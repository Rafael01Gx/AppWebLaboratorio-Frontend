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
    MatIcon
  ],
  templateUrl: './os-pendentes.component.html',
  styleUrl: './os-pendentes.component.scss'
})
export class OsPendentesComponent implements OnInit {
  pageIco = 'manage_accounts';
  pageTitle = 'Gerenciar contas';
  #ordemDeServicoService = inject(OrdemDeServicoService);
  #toast = inject(ToastrService)
  
  listOs: IOrdensDeServico['ordemsDeServico'] = []; 
  
  dataSource = new MatTableDataSource(this.listOs);
  displayedColumns: string[] = ['numeroOs', 'data_solicitacao', 'status','excluir'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private MatDialog: MatDialog) { }

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
  excluirOs(id: IOrdemDeServico['_id']){
    this.#ordemDeServicoService.httpExcluirOrdemDeServico(id).subscribe( (response) => {
      if(response.message === 'Ordem de Serviço excluída com sucesso.'){
        this.#toast.success(response.message);
        this.listarDados()
        
      } else {
        this.#toast.error(response.message);
      }
    }, (error) => { this.#toast.error(error.error.message);
  })
    
  }

listarDados(){
  this.#ordemDeServicoService.httpListarOrdemDeServicoByUserId().subscribe((response: IOrdemDeServicoResponse) => {
    if (response && response.ordemsDeServico) {
      this.listOs = response.ordemsDeServico.filter(os => os.status !== EStatus.Finalizada);
      this.dataSource.data = this.listOs; 
    } else {
      console.error('Nenhuma ordem de serviço encontrada na resposta');
    }
  });
}
}
