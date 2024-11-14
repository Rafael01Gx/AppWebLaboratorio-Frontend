import { Component, inject, Input, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  IAmostra,
  IResultado,
} from '../../../shared/interfaces/IAmostra.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { HelpersService } from '../../../core/services/helpers/helpers.service';
import { ConfiguracaoDeAnaliseService } from '../../../core/services/configuracao-de-analise/configuracao-de-analise.service';
import {
  IConfigAnalise,
  IConfiguracaoDeAnaliseResponse,
  IParametrosDeAnaliseCollection,
} from '../../../shared/interfaces/IConfiguracaoDeAnalise.interface';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { ConfiguracaoAnaliseComponent } from '../../componentes-configuracao/configuracao-analise/configuracao-analise.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
  selector: 'app-lancamento-de-resultados',
  standalone: true,
  imports: [
    MatCardModule,
    MatIcon,
    MatInputModule,
    ReactiveFormsModule,
    NgClass,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
   ],
  templateUrl: './lancamento-de-resultados.component.html',
  styleUrl: './lancamento-de-resultados.component.scss',
})
export class LancamentoDeResultadosComponent implements OnInit {
  @Input() title: string ="";
  dialogRef = inject(MatDialogRef<LancamentoDeResultadosComponent>);
  #dialog = inject(MatDialog);
  #configuracaoDeAnaliseService = inject(ConfiguracaoDeAnaliseService);
  #toastr = inject(ToastrService);
  data = inject(MAT_DIALOG_DATA);
  helpersService = inject(HelpersService);
  amostra: IAmostra = this.data[0];
  ensaio: string = this.data[1];
  listConfigAnalises: IConfigAnalise[] = [];

  configuracaoSelecionada = signal<IParametrosDeAnaliseCollection>({});
  #prazo = inject(HelpersService).calcularPrazoEmDias;
  prazo_atual = this.#prazo(this.amostra.prazo_inicio_fim!.split('-')[1]);
  resultados: IResultado = {};

  constructor() {}

  ngOnInit(): void {
    this.#configuracaoDeAnaliseService
      .httpListarConfiguracaoDeAnalise()
      .subscribe((response: IConfiguracaoDeAnaliseResponse) => {
        if (response && response.configuracaoDeAnalise) {
          this.listConfigAnalises = response.configuracaoDeAnalise.filter(configuracaoDeAnalise => configuracaoDeAnalise.tipo_de_analise.tipo.trim().toLowerCase() === this.ensaio.trim().toLowerCase());
          console.log(response.configuracaoDeAnalise)
          console.log(this.ensaio)
        } else {
          this.#toastr.error(response.message);
        }
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getParamsValues(select: IParametrosDeAnaliseCollection) {
    return Object.values(select);
  }

  selecionarConfiguracao(id: string): void {
    const configuracao = this.listConfigAnalises.find(
      (config) => config._id === id
    );
    if (configuracao) {
      let teste = Object.values(configuracao.parametros_de_analise);
      this.configuracaoSelecionada.set(teste);
    } else {
      this.#toastr.error('Configuração não encontrada');
    }
  }

  openDialogConfigAnalise(): void {
    this.#dialog.open(ConfiguracaoAnaliseComponent, {
      minHeight: '85vh',
      maxHeight: '85vh',
      minWidth: '65vw',
      maxWidth: '65vw',
    });
  }
  limitarCasasDecimais(event: any, casasDecimais: number): void {
    this.helpersService.limitarCasasDecimais(event.target, casasDecimais);
  }
}
