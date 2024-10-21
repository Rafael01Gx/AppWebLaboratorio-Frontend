import { MatDialog } from '@angular/material/dialog';
import { Component, inject, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrdemDeServicoService } from '../../core/services/ordem-de-servico/ordem-de-servico.service';
import { IOrdemDeServico, IOrdemDeServicoResponse } from '../../shared/interfaces/ordemdeservico';

@Component({
  selector: 'app-os-finalizadas',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCard],
  templateUrl: './os-finalizadas.component.html',
  styleUrl: './os-finalizadas.component.scss'
})
export class OsFinalizadasComponent {
  pageIco = 'manage_accounts';
  pageTitle = 'Gerenciar contas';
  #ordemDeServicoService = inject(OrdemDeServicoService);
  
  listOs: IOrdemDeServico['ordemsDeServico'] = []; 
  
  dataSource = new MatTableDataSource(this.listOs);
  displayedColumns: string[] = ['numeroOs', 'data_solicitacao', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private MatDialog: MatDialog) { }

  ngOnInit(): void {
    this.#ordemDeServicoService.httpListarOrdemDeServicoByUserId().subscribe((response: IOrdemDeServicoResponse) => {
      if (response && response.ordemsDeServico) {
        this.listOs = response.ordemsDeServico.filter(os => os.status == 'Concluída');
        this.dataSource.data = this.listOs; 
      } else {
        console.error('Nenhuma ordem de serviço encontrada na resposta');
      }
    });
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
}
