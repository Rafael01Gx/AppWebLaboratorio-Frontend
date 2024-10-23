import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DeletModalComponent } from '../../modal/delete-user-modal/delete-modal.component';
import { ParametrosService } from '../../../core/services/parametros/parametros.service';
import { TipoDeAnaliseService } from '../../../core/services/tipo-de-analise/tipo-de-analise.service';
import { ITipoAnalise, ITipoDeAnaliseResponse } from '../../../shared/interfaces/ITipoDeAnalise.interface';
import { IParametros } from '../../../shared/interfaces/IParametros.interface';

@Component({
  selector: 'app-parametros',
  standalone: true,
  imports: [ MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelect,
    MatOption,
    MatPaginator,
    MatTableModule,],
  templateUrl: './parametros.component.html',
  styleUrl: './parametros.component.scss'
})
export class ParametrosComponent implements OnInit{
  #toastr = inject(ToastrService);
  #parametrosService = inject(ParametrosService);
  #tipoDeAnaliseService = inject(TipoDeAnaliseService);

  public parametrosForm = new FormGroup({
    tipo_de_analise: new FormControl('', Validators.required),
    descricao: new FormControl('',Validators.required),
    unidade_de_medida: new FormControl('',Validators.required),
  });


  public classeTipo: ITipoAnalise ['tipo_de_analise'] =[];

  listParâmetro: IParametros['parametros'] = [];
  dataSource = new MatTableDataSource(this.listParâmetro);

  displayedColumns: string[] = [
    'item',
    'descricao',
    'unidade_de_medida',
    'tipo_de_analise.tipo',
    'tipo_de_analise.classe',
    'excluir',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.#tipoDeAnaliseService
      .httpListarTipoDeAnalise()
      .subscribe((response: ITipoDeAnaliseResponse) => {
        if (response && response.tipo_de_analise) {
          this.classeTipo = response.tipo_de_analise
        } else {
          this.#toastr.error(response.message);
        }
      });

      this.#parametrosService
      .httpListarParametros()
      .subscribe((response) => {
        if (response && response.parametros) {
          this.listParâmetro = response.parametros.map(
            (item, index) => ({
              ...item,
              item: index + 1,
            })
          );
          this.dataSource.data = this.listParâmetro;
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

  incluir() {
    if (this.parametrosForm.valid) {
      this.#parametrosService
        .httpCriarParametros(
          this.parametrosForm.value.tipo_de_analise!,
          this.parametrosForm.value.descricao!,
          this.parametrosForm.value.unidade_de_medida!
        )
        .subscribe({
          next: () => {
            this.#toastr.success('Parâmetro cadastrado com sucesso!');
          },
          error: (err) => this.#toastr.error(err.error.message),
          complete: () => this.loadListAnalise(),
        });
    }
  }

  loadListAnalise(): void {
    this.#parametrosService
      .httpListarParametros()
      .subscribe((response) => {
        if (response && response.parametros) {
          this.listParâmetro = response.parametros.map(
            (item, index) => ({
              ...item,
              item: index + 1,
            })
          );
          this.dataSource.data = this.listParâmetro;
        } else {
          this.#toastr.error(response.message);
        }
      });
  }

  openDialogDelet(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    tipo_de_analise: IParametros
  ): void {
    const dialogDelete = this.dialog.open(DeletModalComponent, {
      width: '250px',
      data: { ...tipo_de_analise },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogDelete.afterClosed().subscribe((result) => {
      if (result) {
        this.#parametrosService.httpDeletarParametros(result).subscribe({
          next: () => {
            this.#toastr.success('Análise removida!');
            this.loadListAnalise();
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
  constructor(private dialog: MatDialog) {}
}

