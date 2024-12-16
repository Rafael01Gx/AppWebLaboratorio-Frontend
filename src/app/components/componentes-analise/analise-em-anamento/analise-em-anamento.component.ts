import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AmostraService } from '../../../core/services/amostra/amostra.service';
import { IAmostrasCollection, IAmostrasResponse, IAmostra } from '../../../shared/interfaces/IAmostra.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EStatus } from '../../../shared/Enum/status.enum';
import { DetalheDeAnaliseComponent } from '../../modal/detalhe-de-analise/detalhe-de-analise.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxMaskPipe } from 'ngx-mask';
import { HelpersService } from '../../../core/services/helpers/helpers.service';

@Component({
    selector: 'app-analise-em-anamento',
    imports: [MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatPaginator, MatInputModule, MatSortModule, MatPaginatorModule, NgxMaskPipe],
    templateUrl: './analise-em-anamento.component.html',
    styleUrl: './analise-em-anamento.component.scss'
})
export class AnaliseEmAnamentoComponent implements OnInit,AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  #dialog = inject(MatDialog)
  #amostraService = inject(AmostraService)
  #toastr = inject(ToastrService)
  #prazo = inject(HelpersService).calcularPrazoEmDias;

  lista_amostras: IAmostrasCollection[] = [] ;

  displayedColumns: string[] = ['numeroOs','status', 'nome_amostra','data_amostra' ,'solicitante', 'ensaios_solicitados','prazo_inicio_fim', 'editar'];
  dataSource = new MatTableDataSource<IAmostrasCollection>();


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


listarDados(){
  this.#amostraService.httpListarTodasAsAmostras().subscribe((response: IAmostrasResponse) => {
    if (response && response.amostras) {
      this.lista_amostras = Object.values(response.amostras).filter((amostra: IAmostra) => amostra.status === EStatus.EmExecucao);
      this.dataSource.data = this.lista_amostras

    } else {
      this.#toastr.error(response.message);
    }
  });
  
}
openAnalysisDetail(data: IAmostra) : void {
  const detalhesAnalise= this.#dialog.open(DetalheDeAnaliseComponent,{
     width:"auto",
     minWidth:"50lvw",
     maxWidth:"90lvw",
     maxHeight:"90lvh",
     data:data
   })
 }

 

}


