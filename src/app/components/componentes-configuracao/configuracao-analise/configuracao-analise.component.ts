import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatOptgroup, MatOption } from '@angular/material/core';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoDeAnaliseService } from '../../../core/services/tipo-de-analise/tipo-de-analise.service';
import { ITipoAnalise, ITipoDeAnaliseResponse } from '../../../shared/interfaces/ITipoDeAnalise.interface';
import { ToastrService } from 'ngx-toastr';
import { MateriaPrimaService } from '../../../core/services/materia-prima/materia-prima.service';
import { IMateriaPrima, IMateriaPrimaResponse } from '../../../shared/interfaces/IMateriasPrimas.interface';
import { IParametrosDeAnalise, IParametrosDeAnaliseCollection } from '../../../shared/interfaces/IConfiguracaoDeAnalise.interface';
import { IParametros, IParametrosResponse } from '../../../shared/interfaces/IParametros.interface';
import { ParametrosService } from '../../../core/services/parametros/parametros.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ConfiguracaoDeAnaliseService } from '../../../core/services/configuracao-de-analise/configuracao-de-analise.service';


@Component({
  selector: 'app-configuracao-analise',
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
    MatSelect,
    MatOption,
    MatPaginator,
    MatTableModule,MatAutocompleteModule,MatOptgroup,AsyncPipe],
  templateUrl: './configuracao-analise.component.html',
  styleUrl: './configuracao-analise.component.scss'
})
export class ConfiguracaoAnaliseComponent implements OnInit{

#tipoDeAnaliseService= inject(TipoDeAnaliseService)
#materiaPrimaService= inject(MateriaPrimaService)
#parametrosService= inject(ParametrosService)
#configuracaoDeAnaliseService= inject(ConfiguracaoDeAnaliseService)
#toastr= inject(ToastrService)


tiposDeAnalises : ITipoAnalise['tipo_de_analise'] = []

materiasPrimas : IMateriaPrima['materiaPrimas'] = []

parametros : IParametros['parametros'] = []

parametros_filtrados : IParametros['parametros']= []

parametros_de_analise: IParametrosDeAnaliseCollection = {
};

displayedColumns: string[] = [ 'num','item', 'unidade_resultado', 'editar', 'remover'];

dataSource = new MatTableDataSource<IParametrosDeAnalise>(
  Object.entries(this.parametros_de_analise).map(([num, parametros_de_analise]) => ({ num: num, ...parametros_de_analise }))
);


editIndex: number | null = null;

  editParametro(row: any) {
    this.editIndex = row.num;
    this.parametrosForm.patchValue({
      item: row.item,
      unidade_resultado: row.unidade_resultado,
      casas_decimais: row.casas_decimais
    });
  }

  removeParametro(row: any) {
    delete this.parametros_de_analise[row.num];
    this.dataSource.data = Object.entries(this.parametros_de_analise).map(([num, parametros_de_analise]) => ({
      num: num,
      ...parametros_de_analise
    }));
  }

  addParametro() {
    const newParametros_de_analise: IParametrosDeAnalise = {
      item: this.parametrosForm.value.item!,
      unidade_resultado: this.parametrosForm.value.unidade_resultado!,
      casas_decimais: this.parametrosForm.value.casas_decimais!
    };

    if (this.editIndex !== null) {

      this.parametros_de_analise[this.editIndex] = newParametros_de_analise;
      this.editIndex = null; 
    } else {
    
      const newId = Object.keys(this.parametros_de_analise).length + 1;
      this.parametros_de_analise[newId] = newParametros_de_analise;
    }

    this.dataSource.data = Object.entries(this.parametros_de_analise).map(([num, parametros_de_analise]) => ({
      num: num,
      ...parametros_de_analise
    }));

    this.parametrosForm.reset();
  }



filtrar(selectedTipoDeAnalise: any) {
  if (selectedTipoDeAnalise && typeof selectedTipoDeAnalise === 'object' && selectedTipoDeAnalise.tipo) {
    this.parametros_filtrados = this.parametros.filter(parametro =>
      parametro.tipo_de_analise.tipo === selectedTipoDeAnalise.tipo
    );
  } else {
    this.parametros_filtrados = this.parametros;
  }
}

ngOnInit(): void {
  
  this.#tipoDeAnaliseService.httpListarTipoDeAnalise().subscribe((response: ITipoDeAnaliseResponse)=>{
    if (response && response.tipo_de_analise) {
      this.tiposDeAnalises = response.tipo_de_analise
  
    } else {
      this.#toastr.error(response.message);
    }
  });

  this.#materiaPrimaService.httpListarMateriaPrima().subscribe((response: IMateriaPrimaResponse)=>{
    if (response && response.materiaPrimas) {
      this.materiasPrimas = response.materiaPrimas
  
    } else {
      this.#toastr.error(response.message);
    }
  });
  this.#parametrosService.httpListarParametros().subscribe((response: IParametrosResponse)=>{
    if (response && response.parametros) {
      this.parametros = response.parametros
  
    } else {
      this.#toastr.error(response.message);
    }
  });

  this.unidadesGroupOptions = this.parametrosForm.get('unidade_resultado')!.valueChanges.pipe(
    startWith(''),
    map(value => this._filterGroup(value || '')),
  );
}

  configDeAnaliseForm = new FormGroup({
    materia_prima : new FormControl('',[Validators.required,Validators.minLength(3)]),
    tipo_de_analise : new FormControl('',[Validators.required,Validators.minLength(3)]),
  })
  
  parametrosForm = new FormGroup({
    item : new FormControl('',Validators.required),  
    unidade_resultado : new FormControl('',Validators.required),  
    casas_decimais : new FormControl('',[Validators.required,Validators.pattern(/[0-9]/)]),  
  })

  public  salvarConfiguracaoDeAnalise() {

 if(Object.keys(this.parametros_de_analise).length > 0){
     this.#configuracaoDeAnaliseService.httpCriarConfiguracaoDeAnalise(this.configDeAnaliseForm.value.tipo_de_analise!,this.configDeAnaliseForm.value.materia_prima!,this.parametros_de_analise!).subscribe({
       next: () => {
         this.#toastr.success("Configuração criada com sucesso!");
       },
       error: (err) => this.#toastr.error(err.error.message),
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
      nomes: ['m', 'm²', 'm³','mm'],
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
        .map(group => ({letra: group.letra, nomes: _filter(group.nomes, value)}))
        .filter(group => group.nomes.length > 0);
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

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};


