import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AmostraService } from '../../../core/services/amostra/amostra.service';
import { IAmostrasCollection, IAmostrasResponse, IAmostra } from '../../../shared/interfaces/IAmostra.interface';
import { MatDialog } from '@angular/material/dialog';
import { DetalheDeAnaliseComponent } from '../../modal/detalhe-de-analise/detalhe-de-analise.component';

@Component({
  selector: 'app-aguardando-analise',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule,MatFormFieldModule,MatPaginator, MatInputModule, MatSortModule, MatPaginatorModule],
  templateUrl: './aguardando-analise.component.html',
  styleUrl: './aguardando-analise.component.scss'
})
export class AguardandoAnaliseComponent implements OnInit {

  #amostraService = inject(AmostraService)
  #toastr = inject(ToastrService)
  #dialog = inject(MatDialog)

  lista_amostras: IAmostrasCollection[] = [] ;


  displayedColumns: string[] = ['numeroOs','status', 'nome_amostra','data_amostra' ,'solicitante', 'ensaios_solicitados'];
  dataSource = new MatTableDataSource<IAmostrasCollection>();


ngOnInit(): void {
this.#amostraService.httpListarTodasAsAmostras().subscribe((response: IAmostrasResponse) => {
    if (response && response.amostras) {
      this.lista_amostras = Object.values(response.amostras).filter((amostra: IAmostra) => amostra.status === 'Autorizada');
      this.dataSource.data = this.lista_amostras

    } else {
      this.#toastr.error(response.message);
    }
  });  
}


openAnalysisDetail(data: IAmostra) : void {
  this.#dialog.open(DetalheDeAnaliseComponent,{
    minWidth:"90lvw",
    minHeight:"90lvh",
    data:data
  })

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


