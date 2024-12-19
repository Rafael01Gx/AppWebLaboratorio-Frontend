import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { OrdemDeServicoService } from '../../../../core/services/ordem-de-servico/ordem-de-servico.service';
import {
  IOrdemDeServico,
  IOrdemDeServicoResponse,
  IOrdensDeServico,
} from '../../../../shared/interfaces/IOrdemDeservico.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskPipe } from 'ngx-mask';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EStatus } from '../../../../shared/Enum/status.enum';
import { Router } from '@angular/router';
import { RevisaoDeOsComponent } from '../../../modal/revisao-de-os/revisao-de-os.component';

@Component({
    selector: 'app-gerenciar-os-em-execucao',
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        NgxMaskPipe,
        MatProgressBarModule,
    ],
    templateUrl: './gerenciar-os-em-execucao.component.html',
    styleUrl: './gerenciar-os-em-execucao.component.scss'
})
export class GerenciarOsEmExecucaoComponent implements OnInit, AfterViewInit {
  #ordemDeServicoService = inject(OrdemDeServicoService);
  #dialog = inject(MatDialog);

  listOs: IOrdensDeServico['ordemsDeServico'] = [];

  dataSource = new MatTableDataSource(this.listOs);

  progresso: number = 0;

  displayedColumns: string[] = ['numeroOs', 'data_solicitacao', 'status'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: IOrdensDeServico | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private MatDialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.#ordemDeServicoService
      .httpListarTodasOrdensDeServico()
      .subscribe((response: IOrdemDeServicoResponse) => {
        if (response && response.ordemsDeServico) {
          this.listOs = response.ordemsDeServico.filter(
            (os) => os.status == EStatus.EmExecucao
          );
          this.listOs = this.listOs
            .map((os) => {
              const progressoCalculado = this.getOsProgresso(os);
              return { ...os, progresso_calculado: progressoCalculado };
            })
            .sort((a, b) => b.progresso_calculado - a.progresso_calculado);
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

  getOsProgresso(os: IOrdemDeServico): number {
    if (!os.progresso) {
      return 0;
    }
    const keys = Object.keys(os.progresso);
    const qnt_keys = keys.length;
    const somaPercentuais = keys.reduce((soma, key) => {
      const valor = os.progresso![key];
      return soma + (typeof valor === 'number' ? valor : 0);
    }, 0);
    const progresso = somaPercentuais / qnt_keys;
    return progresso;
  }

  getObjectKeysLength(amostras: object): number {
    const contagem_amostras = Object.keys(amostras).length;
    return contagem_amostras;
  }

  navegarParaRelatorio(element: IOrdemDeServico) {
    sessionStorage.setItem('ordemDeServico', JSON.stringify(element));
    const revisao = this.#dialog.open(RevisaoDeOsComponent, {
      minWidth: '25cm',
      minHeight: '95lvh',
      maxHeight: '95lvh',
      data: element,
    });
  }
}
