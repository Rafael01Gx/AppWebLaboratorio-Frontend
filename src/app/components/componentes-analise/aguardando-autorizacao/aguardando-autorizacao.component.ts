import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AmostraService } from '../../../core/services/amostra/amostra.service';
import { IAmostra, IAmostrasCollection, IAmostrasResponse } from '../../../shared/interfaces/IAmostra.interface';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-aguardando-autorizacao',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [MatTableModule, MatButtonModule, MatIconModule,MatFormFieldModule,MatPaginator, MatInputModule, MatSortModule, MatPaginatorModule],
  templateUrl: './aguardando-autorizacao.component.html',
  styleUrl: './aguardando-autorizacao.component.scss'
})
export class AguardandoAutorizacaoComponent implements OnInit {

  #amostraService = inject(AmostraService)
  #toastr = inject(ToastrService)

  lista_amostras: IAmostrasCollection[] = [] ;


  displayedColumns: string[] = ['numeroOs','status', 'nome_amostra','data_amostra' ,'solicitante', 'ensaios_solicitados'];
  dataSource = new MatTableDataSource<IAmostrasCollection>();


ngOnInit(): void {
this.#amostraService.httpListarTodasAsAmostras().subscribe((response: IAmostrasResponse) => {
    if (response && response.amostras) {
      this.lista_amostras = Object.values(response.amostras).filter((amostra: IAmostra) => amostra.status === 'Aguardando Autorização');
      this.dataSource.data = this.lista_amostras

    } else {
      this.#toastr.error(response.message);
    }
  });

}


@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

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


