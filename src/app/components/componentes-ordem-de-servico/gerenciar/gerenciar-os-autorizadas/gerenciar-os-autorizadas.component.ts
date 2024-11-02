import { Component, inject, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { OrdemDeServicoService } from '../../../../core/services/ordem-de-servico/ordem-de-servico.service';
import {IOrdemDeServico, IOrdemDeServicoResponse, IOrdensDeServico } from '../../../../shared/interfaces/IOrdemDeservico.interface';
import { DetalharOrdemDeServicoComponent } from '../../../modal/detalhar-ordem-de-servico/detalhar-ordem-de-servico.component';

@Component({
  selector: 'app-gerenciar-os-autorizadas',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCard],
  templateUrl: './gerenciar-os-autorizadas.component.html',
  styleUrl: './gerenciar-os-autorizadas.component.scss'
})
export class GerenciarOsAutorizadasComponent {
  #dialog = inject(MatDialog)
  #ordemDeServicoService = inject(OrdemDeServicoService);
  
  listOs: IOrdensDeServico['ordemsDeServico'] = []; 
  
  dataSource = new MatTableDataSource(this.listOs);
  displayedColumns: string[] = ['numeroOs', 'data_solicitacao', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private MatDialog: MatDialog) { }

  ngOnInit(): void {
    this.#ordemDeServicoService.httpListarTodasOrdensDeServico().subscribe((response: IOrdemDeServicoResponse) => {
      if (response && response.ordemsDeServico) {
        this.listOs = response.ordemsDeServico.filter(os => os.status == "Autorizada");
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


  openOsDetails(data: IOrdemDeServico){
    this.#dialog.open(DetalharOrdemDeServicoComponent,{
      minWidth:'50lvw',
      minHeight:'70lvh',
      maxHeight:'90lvh',
      data:data,
    })
  }
}
