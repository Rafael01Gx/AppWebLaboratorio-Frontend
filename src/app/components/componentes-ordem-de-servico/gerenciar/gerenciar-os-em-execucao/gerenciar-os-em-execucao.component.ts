import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { OrdemDeServicoService } from '../../../../core/services/ordem-de-servico/ordem-de-servico.service';
import { IOrdemDeServicoResponse, IOrdensDeServico } from '../../../../shared/interfaces/IOrdemDeservico.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgxMaskPipe } from 'ngx-mask';
import { IAmostrasCollection } from '../../../../shared/interfaces/IAmostra.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EStatus } from '../../../../shared/Enum/status.enum';


@Component({
  selector: 'app-gerenciar-os-em-execucao',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,MatIconModule,MatButtonModule,NgxMaskPipe,MatProgressBarModule],
  templateUrl: './gerenciar-os-em-execucao.component.html',
  styleUrl: './gerenciar-os-em-execucao.component.scss'
})
export class GerenciarOsEmExecucaoComponent {

  #ordemDeServicoService = inject(OrdemDeServicoService);
  
  listOs: IOrdensDeServico['ordemsDeServico'] = []; 
  
  dataSource = new MatTableDataSource(this.listOs);

  progresso : number = 0

  displayedColumns: string[] = ['numeroOs', 'data_solicitacao', 'status'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: IOrdensDeServico | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private MatDialog: MatDialog) { }

  ngOnInit(): void {
    this.#ordemDeServicoService.httpListarTodasOrdensDeServico().subscribe((response: IOrdemDeServicoResponse) => {
      if (response && response.ordemsDeServico) {
        this.listOs = response.ordemsDeServico.filter(os => os.status == EStatus.EmExecucao);
        this.dataSource.data = this.listOs; 
        console.log(this.listOs)
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

  getAmostrasValues(amostras:  IAmostrasCollection) {
    return Object.values(amostras);
  }

  getObjectKeysLength(amostras: object): number {
 const contagem_amostras = Object.keys(amostras).length;
    return contagem_amostras
  }
  

}
