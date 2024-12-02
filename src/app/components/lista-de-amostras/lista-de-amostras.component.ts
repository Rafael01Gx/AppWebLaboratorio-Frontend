import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { IAmostra, IAmostrasCollection, IAmostrasResponse } from '../../shared/interfaces/IAmostra.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AmostraService } from '../../core/services/amostra/amostra.service';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EStatus } from '../../shared/Enum/status.enum';
import { KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-lista-de-amostras',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCard,MatIconModule,MatButtonModule,KeyValuePipe,MatProgressBarModule],
    animations: [
      trigger('detailExpand', [
        state('collapsed,void', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
  templateUrl: './lista-de-amostras.component.html',
  styleUrl: './lista-de-amostras.component.scss'
})
export class ListaDeAmostrasComponent {
 status = EStatus
  #amostraService = inject(AmostraService);
  
  listAmostras: IAmostrasCollection[]= []; 
  
  dataSource = new MatTableDataSource(this.listAmostras);
  displayedColumns: string[] = ['numeroOs', 'nome_amostra','data_amostra','ensaios_solicitados','status'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: IAmostra | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.listarOS()
  }
  listarOS(){
    this.#amostraService.httpListarAmostra().subscribe((response: IAmostrasResponse) => {
      if (response && response.amostras) {
        this.listAmostras = response.amostras;
        this.dataSource.data = this.listAmostras; 
        
      } else {
        console.error('Nenhuma amostra encontrada na resposta');
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
