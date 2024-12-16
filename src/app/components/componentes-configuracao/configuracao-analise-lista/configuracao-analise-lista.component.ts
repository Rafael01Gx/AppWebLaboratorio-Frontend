import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IConfiguracaoDeAnalise, IConfiguracaoDeAnaliseResponse } from '../../../shared/interfaces/IConfiguracaoDeAnalise.interface';
import { MatSort } from '@angular/material/sort';
import { ConfiguracaoDeAnaliseService } from '../../../core/services/configuracao-de-analise/configuracao-de-analise.service';
import { ToastrService } from 'ngx-toastr';
import { DeletModalComponent } from '../../modal/delete-user-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfiguracaoAnaliseComponent } from '../configuracao-analise/configuracao-analise.component';
import { EditConfigAnaliseComponent } from '../../modal/edit-config-analise/edit-config-analise.component';
import { IResponseData } from '../../../shared/models/IResponseData';

@Component({
  selector: 'app-configuracao-analise-lista',
  standalone: true,
  imports: [MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatTableModule],
  templateUrl: './configuracao-analise-lista.component.html',
  styleUrl: './configuracao-analise-lista.component.scss'
})

export class ConfiguracaoAnaliseListaComponent implements OnInit {
  #configuracaoDeAnaliseService = inject(ConfiguracaoDeAnaliseService)
  #toastr = inject(ToastrService)
 #dialog= inject(MatDialog) 
  listConfigAnalises: IConfiguracaoDeAnalise['configuracaoDeAnalise'] = [];
  dataSource = new MatTableDataSource(this.listConfigAnalises);
  displayedColumns: string[] = [
    'item',
    'materia_prima',
    'tipo_de_analise',
    'editar',
    'excluir',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.#configuracaoDeAnaliseService.httpListarConfiguracaoDeAnalise().subscribe((response: IConfiguracaoDeAnaliseResponse) => {
        if (response && response.configuracaoDeAnalise) {
          this.listConfigAnalises = response.configuracaoDeAnalise.map(
            (item, index) => ({
              ...item,
              item: index + 1,
            })
          );
          this.dataSource.data = this.listConfigAnalises;
        } else {
          this.#toastr.error(response.message);
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

  openDialogDelet(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    tipo_de_analise:IConfiguracaoDeAnalise
  ): void {
    const dialogDelete = this.#dialog.open(DeletModalComponent, {
      width: '250px',
      data: { ...tipo_de_analise },
      enterAnimationDuration,
      exitAnimationDuration,

      
    });

    dialogDelete.afterClosed().subscribe((result) => {
      if (result) {
        this.#configuracaoDeAnaliseService.httpDeletarConfiguracaoDeAnalise(result).subscribe({
          next: () => {
            this.#toastr.success('Análise removida!');
            this.loadListConfigAnalise();
          },
          error: (err) => {
            this.#toastr.error(err.error.message);
          },
        });
      } else {
        console.log('Modal fechada sem exclusão');
      }
    });
  }
  loadListConfigAnalise(): void {
    this.#configuracaoDeAnaliseService
      .httpListarConfiguracaoDeAnalise()
      .subscribe((response) => {
        if (response && response.configuracaoDeAnalise) {
          this.listConfigAnalises = response.configuracaoDeAnalise.map(
            (item, index) => ({
              ...item,
              item: index + 1,
            })
          );
          this.dataSource.data = this.listConfigAnalises;
        } else {
          this.#toastr.error(response.message);
        }
      });
  }


  openDialogConfigAnalise(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    const dialogEdit = this.#dialog.open(ConfiguracaoAnaliseComponent, {
      minHeight: '85vh',
      maxHeight: '85vh',
      minWidth: '65vw',
      maxWidth: '65vw',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogEdit.afterClosed().subscribe((result) => {
      if (result) {
        this.loadListConfigAnalise();
      }
    });
  }

  openDialogEditAnalise(enterAnimationDuration: string, exitAnimationDuration: string,row:IResponseData): void {
    const dialogEdit = this.#dialog.open(EditConfigAnaliseComponent, {
      minHeight: '85vh',
      maxHeight: '85vh',
      minWidth: '65vw',
      maxWidth: '65vw',
      data: [row],

      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogEdit.afterClosed().subscribe((result) => {
      if (result) {
        this.loadListConfigAnalise();
      }
    });
  }
}
