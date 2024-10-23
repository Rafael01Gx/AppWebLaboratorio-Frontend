import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TipoDeAnaliseService } from '../../../core/services/tipo-de-analise/tipo-de-analise.service';
import { ITipoAnalise, ITipoDeAnaliseResponse } from '../../../shared/interfaces/ITipoDeAnalise.interface';
import { ToastrService } from 'ngx-toastr';

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
    MatTableModule,],
  templateUrl: './configuracao-analise.component.html',
  styleUrl: './configuracao-analise.component.scss'
})
export class ConfiguracaoAnaliseComponent implements OnInit{

#tipoDeAnaliseService= inject(TipoDeAnaliseService)
#toastr= inject(ToastrService)

tiposDeAnalises : ITipoAnalise['tipo_de_analise'] = []

ngOnInit(): void {
  
  this.#tipoDeAnaliseService.httpListarTipoDeAnalise().subscribe((response: ITipoDeAnaliseResponse)=>{
    if (response && response.tipo_de_analise) {
      this.tiposDeAnalises = response.tipo_de_analise

    } else {
      this.#toastr.error(response.message);
    }
  });


  }


}



