import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { OrdemDeServicoService } from '../../../core/services/ordem-de-servico/ordem-de-servico.service';
import {IOrdemDeServicoResponse, IOrdensDeServico } from '../../../shared/interfaces/IOrdemDeservico.interface';
import { MatDialog } from '@angular/material/dialog';
import { EStatus } from '../../../shared/Enum/status.enum';
import { PdfGeneratorServiceService } from '../../../core/services/helpers/pdf-generator-service.service';

@Component({
  selector: 'app-os-aguardando-autorizacao',
  standalone: true,
  imports: [    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCard],
  templateUrl: './os-aguardando-autorizacao.component.html',
  styleUrl: './os-aguardando-autorizacao.component.scss'
})
export class OsAguardandoAutorizacaoComponent implements OnInit, AfterViewInit {
  #ordemDeServicoService = inject(OrdemDeServicoService);
  listOs: IOrdensDeServico['ordemsDeServico'] = []; 
  
  dataSource = new MatTableDataSource(this.listOs);
  displayedColumns: string[] = ['numeroOs', 'data_solicitacao', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private MatDialog: MatDialog) { }

  ngOnInit(): void {
    this.#ordemDeServicoService.httpListarOrdemDeServicoByUserId().subscribe((response: IOrdemDeServicoResponse) => {
      if (response && response.ordemsDeServico) {
        this.listOs = response.ordemsDeServico.filter(os => os.status == EStatus.AguardandoAutorizacao);
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
