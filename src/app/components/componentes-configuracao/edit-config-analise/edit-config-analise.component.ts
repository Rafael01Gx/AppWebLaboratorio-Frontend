import { AsyncPipe } from '@angular/common';
import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatOption, MatOptgroup } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatFormField,
  MatLabel,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { startWith, map, Observable } from 'rxjs';
import { ConfiguracaoDeAnaliseService } from '../../../core/services/configuracao-de-analise/configuracao-de-analise.service';
import { MateriaPrimaService } from '../../../core/services/materia-prima/materia-prima.service';
import { ParametrosService } from '../../../core/services/parametros/parametros.service';
import { TipoDeAnaliseService } from '../../../core/services/tipo-de-analise/tipo-de-analise.service';
import {
  IConfiguracaoDeAnalise,
  IParametrosDeAnaliseCollection,
  IParametrosDeAnalise,
} from '../../../shared/interfaces/IConfiguracaoDeAnalise.interface';
import {
  IMateriaPrima,
  IMateriaPrimaResponse,
} from '../../../shared/interfaces/IMateriasPrimas.interface';
import {
  IParametros,
  IParametrosResponse,
} from '../../../shared/interfaces/IParametros.interface';
import {
  ITipoAnalise,
  ITipoDeAnaliseResponse,
} from '../../../shared/interfaces/ITipoDeAnalise.interface';
import { IResponseData } from '../../../shared/models/IResponseData';

@Component({
  selector: 'app-edit-config-analise',
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
    MatAutocompleteModule,
    MatOptgroup,
    AsyncPipe,
  ],
  templateUrl: './edit-config-analise.component.html',
  styleUrl: './edit-config-analise.component.scss',
})
export class EditConfigAnaliseComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditConfigAnaliseComponent>);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public MatDialogRef: MatDialogRef<EditConfigAnaliseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IResponseData
  ) {

  }
  
   id : string = ""


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  #tipoDeAnaliseService = inject(TipoDeAnaliseService);
  #materiaPrimaService = inject(MateriaPrimaService);
  #parametrosService = inject(ParametrosService);
  #configuracaoDeAnaliseService = inject(ConfiguracaoDeAnaliseService);
  #toastr = inject(ToastrService);

  tiposDeAnalises: ITipoAnalise['tipo_de_analise'] = [];

  materiasPrimas: IMateriaPrima['materiaPrimas'] = [];

  parametros: IParametros['parametros'] = [];

  parametros_de_analise: IParametrosDeAnaliseCollection = {};

  displayedColumns: string[] = ['num', 'item', 'unidade_resultado', 'remover'];

  dataSource = new MatTableDataSource<IParametrosDeAnalise>(
    Object.entries(this.parametros_de_analise).map(
      ([num, parametros_de_analise]) => ({ num: num, ...parametros_de_analise })
    )
  );

  removeParametro(row: any) {
    delete this.parametros_de_analise[row.num];
    this.dataSource.data = Object.entries(this.parametros_de_analise).map(
      ([num, parametros_de_analise]) => ({
        num: num,
        ...parametros_de_analise,
      })
    );
  }

  addParametro() {
    const items: string[] = Array.isArray(this.parametrosForm.value.item)
      ? (this.parametrosForm.value.item as string[])
      : [this.parametrosForm.value.item || ''];

    if (Array.isArray(items) && items.length > 0) {
      items.forEach((item) => {
        const newParametros_de_analise: IParametrosDeAnalise = {
          item: item,
          unidade_resultado: this.parametrosForm.value.unidade_resultado!,
          casas_decimais: this.parametrosForm.value.casas_decimais!,
        };
        const newId = Object.keys(this.parametros_de_analise).length + 1;
        this.parametros_de_analise[newId] = newParametros_de_analise;

        this.dataSource.data = Object.entries(this.parametros_de_analise).map(
          ([num, parametros_de_analise]) => ({
            num: num,
            ...parametros_de_analise,
          })
        );
      });
    } else {
      console.error('O campo "item" não é válido.');
    }

    this.parametrosForm.reset();
  }

  ngOnInit(): void {
    this.#tipoDeAnaliseService
      .httpListarTipoDeAnalise()
      .subscribe((response: ITipoDeAnaliseResponse) => {
        if (response && response.tipo_de_analise) {
          this.tiposDeAnalises = response.tipo_de_analise;
        } else {
          this.#toastr.error(response.message);
        }
      });

    this.#materiaPrimaService
      .httpListarMateriaPrima()
      .subscribe((response: IMateriaPrimaResponse) => {
        if (response && response.materiaPrimas) {
          this.materiasPrimas = response.materiaPrimas;
        } else {
          this.#toastr.error(response.message);
        }
      });
    this.#parametrosService
      .httpListarParametros()
      .subscribe((response: IParametrosResponse) => {
        if (response && response.parametros) {
          this.parametros = response.parametros;
        } else {
          this.#toastr.error(response.message);
        }
      });

    this.unidadesGroupOptions = this.parametrosForm
      .get('unidade_resultado')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGroup(value || ''))
      );

    if (this.data && this.data[0][0]?.parametros_de_analise) {
      this.parametros_de_analise = this.data[0][0].parametros_de_analise;

      this.dataSource.data = Object.entries(this.parametros_de_analise).map(
        ([num, parametros_de_analise]) => ({
          num: num,
          ...parametros_de_analise,
        })
      );
    }
    this.configDeAnaliseForm.patchValue({
      materia_prima: this.data[0][0].materia_prima.nome_descricao,
      tipo_de_analise: this.data[0][0].tipo_de_analise.tipo,
    });

this.id = this.data[1]
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  configDeAnaliseForm = new FormGroup({
    materia_prima: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    tipo_de_analise: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  parametrosForm = new FormGroup({
    item: new FormControl('', Validators.required),
    unidade_resultado: new FormControl('', Validators.required),
    casas_decimais: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]/),
    ]),
  });

  public salvarConfiguracaoDeAnalise() {
    console.log(this.parametros_de_analise)
    if (Object.keys(this.parametros_de_analise).length > 0) {
      this.#configuracaoDeAnaliseService.httpEditarConfiguracaoDeAnalise( this.id, this.parametros_de_analise)
        .subscribe({
          next: () => {
            this.#toastr.success('Configuração criada com sucesso!');
          },
          error: (err) => this.#toastr.error(err.error.message),
          complete: () => this.dialogRef.close(true),
        });
    }
  }

  unidadesGroupOptions!: Observable<UnidadesGroup[]>;

  unidadesGroup = [
    {
      letra: 'A',
      nomes: ['atm'],
    },
    {
      letra: 'B',
      nomes: ['bar'],
    },
    {
      letra: 'C',
      nomes: ['cm', 'cm³', 'cal', 'kcal'],
    },
    {
      letra: 'D',
      nomes: ['d'],
    },
    {
      letra: 'G',
      nomes: ['g', 'g/cm³', 'g/L', 'g/mL'],
    },
    {
      letra: 'H',
      nomes: ['ha'],
    },
    {
      letra: 'K',
      nomes: ['kg', 'kg/m³', 'kg/L', 'kJ', 'kWh'],
    },
    {
      letra: 'L',
      nomes: ['L', 'mL'],
    },
    {
      letra: 'M',
      nomes: ['m', 'm²', 'm³', 'mm'],
    },
    {
      letra: 'P',
      nomes: ['Pa'],
    },
    {
      letra: 'Q',
      nomes: ['Q'],
    },
    {
      letra: 'S',
      nomes: ['s'],
    },
    {
      letra: 'T',
      nomes: ['t'],
    },
    {
      letra: '%',
      nomes: ['t'],
    },
  ];

  private _filterGroup(value: string): UnidadesGroup[] {
    if (value) {
      return this.unidadesGroup
        .map((group) => ({
          letra: group.letra,
          nomes: _filter(group.nomes, value),
        }))
        .filter((group) => group.nomes.length > 0);
    }

    return this.unidadesGroup;
  }
}

// MatFilter
export interface UnidadesGroup {
  letra: string;
  nomes: string[];
}
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};
