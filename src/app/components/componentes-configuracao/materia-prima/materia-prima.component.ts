import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MateriaPrimaService } from '../../../core/services/materia-prima/materia-prima.service';
import {
  IMateriaPrima,
  IMateriaPrimaResponse,
} from '../../../shared/interfaces/IMateriasPrimas.interface';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeletModalComponent } from '../../modal/delete-user-modal/delete-modal.component';
//-----
@Component({
  selector: 'app-materia-prima',
  standalone: true,
  imports: [
    MatFormField,
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
    MatTableModule,
  ],
  templateUrl: './materia-prima.component.html',
  styleUrl: './materia-prima.component.scss',
})
export class MateriaPrimaComponent implements OnInit {
  #toastr = inject(ToastrService);
  #materiaPrimaService = inject(MateriaPrimaService);

  public materiaprimaForm = new FormGroup({
    nome_descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    classe_tipo: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  classeTipo = [
    { value: 'Combustível', viewValue: 'Combustível' },
    { value: 'Fundente', viewValue: 'Fundente' },
    { value: 'Matéria-prima', viewValue: 'Matéria-prima' },
    { value: 'Térmica', viewValue: 'Térmica' },
    { value: 'Aglutinante', viewValue: 'Aglutinante' },
    { value: 'Resíduo de processo', viewValue: 'Resíduo de processo' },
    { value: 'Variável', viewValue: 'Variável' },
  ];

  listMateriasPrimas: IMateriaPrima['materiaPrimas'] = [];
  dataSource = new MatTableDataSource(this.listMateriasPrimas);

  displayedColumns: string[] = [
    'item',
    'nome_descricao',
    'classe_tipo',
    'excluir',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.#materiaPrimaService.httpListarMateriaPrima().subscribe((response: IMateriaPrimaResponse) => {
        if (response && response.materiaPrimas) {
          this.listMateriasPrimas = response.materiaPrimas.map(
            (item, index) => ({
              ...item,
              item: index + 1,
            })
          );
          this.dataSource.data = this.listMateriasPrimas;
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
    if (this.materiaprimaForm.valid) {
      this.#materiaPrimaService
        .httpCriarMateriaPrima(
          this.materiaprimaForm.value.nome_descricao!,
          this.materiaprimaForm.value.classe_tipo!
        )
        .subscribe({
          next: () => {
            this.#toastr.success('Materia-prima cadastrada com sucesso!');
          },
          error: (err) => this.#toastr.error(err.error.message),
          complete: () => this.loadListAnalise(),
        });
    }
  }

  loadListAnalise(): void {
    this.#materiaPrimaService
      .httpListarMateriaPrima()
      .subscribe((response) => {
        if (response && response.materiaPrimas) {
          this.listMateriasPrimas = response.materiaPrimas.map(
            (item, index) => ({
              ...item,
              item: index + 1,
            })
          );
          this.dataSource.data = this.listMateriasPrimas;
        } else {
          this.#toastr.error(response.message);
        }
      });
  }

  openDialogDelet(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    tipo_de_analise: IMateriaPrima
  ): void {
    const dialogDelete = this.dialog.open(DeletModalComponent, {
      width: '250px',
      data: { ...tipo_de_analise },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogDelete.afterClosed().subscribe((result) => {
      if (result) {
        this.#materiaPrimaService.httpDeletarTipoDeAnalise(result).subscribe({
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
