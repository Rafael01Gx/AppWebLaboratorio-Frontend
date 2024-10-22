import { Component, inject, ViewChild } from '@angular/core';
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
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {
  ITipoAnalise,
  ITipoDeAnaliseResponse,
} from '../../../shared/interfaces/ITipoDeAnalise.interface';
import { TipoDeAnaliseService } from '../../../core/services/tipo-de-analise/tipo-de-analise.service';
import { DeletModalComponent } from '../../modal/delete-user-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { U } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-tipo-de-analise',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    ReactiveFormsModule,
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
  templateUrl: './tipo-de-analise.component.html',
  styleUrl: './tipo-de-analise.component.scss',
})
export class TipoDeAnaliseComponent {
  // #ordemDeServicoService = inject(OrdemDeServicoService);
  #toastr = inject(ToastrService);
  #tipoDeAnaliseService = inject(TipoDeAnaliseService);

  public tipoDeAnaliseForm = new FormGroup({
    tipo: new FormControl('', [Validators.required, Validators.minLength(2)]),
    classe: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  classe = [
    { value: 'Física', viewValue: 'Física' },
    { value: 'Metalúrgica', viewValue: 'Metalúrgica' },
    { value: 'Química', viewValue: 'Química' },
    { value: 'Térmica', viewValue: 'Térmica' },
    { value: 'Física/Química', viewValue: 'Física/Química' },
  ];

  listTipoDeAnalise: ITipoAnalise['tipo_de_analise'] = [];
  dataSource = new MatTableDataSource(this.listTipoDeAnalise);

  displayedColumns: string[] = ['item','tipo', 'classe','Excluir'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.#tipoDeAnaliseService
    .httpListarTipoDeAnalise()
    .subscribe((response: ITipoDeAnaliseResponse) => {
      if (response && response.tipo_de_analise) {
        this.listTipoDeAnalise = response.tipo_de_analise.map((item, index) => ({
          ...item,
          item: index + 1 
        }));
        this.dataSource.data = this.listTipoDeAnalise;
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

  incluir(){
    if(this.tipoDeAnaliseForm.valid){
      this.#tipoDeAnaliseService.httpCriarTipoDeAnalise(this.tipoDeAnaliseForm.value.tipo!,this.tipoDeAnaliseForm.value.classe!).subscribe({
        next: () => {
          this.#toastr.success("Análise/Ensaio cadastrada com sucesso!");
        },
        error: (err) => this.#toastr.error(err.error.message),
        complete:() => this.loadListAnalise()
      });
     }
    }
  


  loadListAnalise(): void {
    this.#tipoDeAnaliseService.httpListarTipoDeAnalise().subscribe(response => {
      if (response && response.tipo_de_analise) {
        this.listTipoDeAnalise = response.tipo_de_analise.map((item, index) => ({
          ...item,
          item: index + 1
        }));
        this.dataSource.data = this.listTipoDeAnalise;
      } else {
        this.#toastr.error(response.message);
      }
    });
  }



  openDialogDelet(enterAnimationDuration: string, exitAnimationDuration: string, tipo_de_analise: ITipoAnalise): void {
    const dialogDelete = this.dialog.open(DeletModalComponent, {
      width: '250px',
      data: { ...tipo_de_analise },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  
     dialogDelete.afterClosed().subscribe(result => {
      
      if (result) {
        this.#tipoDeAnaliseService.httpDeletarTipoDeAnalise(result).subscribe({
          next: () => {
            this.#toastr.success("Análise removida!");
            this.loadListAnalise();
          },
          error: (err) => {
            this.#toastr.error(err.error.message);                         
          }
        });
      } else {
        console.log('Modal fechada sem exclusão');
      }
    });  
  }
  constructor(private dialog: MatDialog) { 

  }
  
}