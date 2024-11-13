import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAmostra, IResultado } from '../../../shared/interfaces/IAmostra.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { HelpersService } from '../../../core/services/helpers/helpers.service';
import { ConfiguracaoDeAnaliseService } from '../../../core/services/configuracao-de-analise/configuracao-de-analise.service';
import { IConfigAnalise, IConfiguracaoDeAnalise, IConfiguracaoDeAnaliseResponse } from '../../../shared/interfaces/IConfiguracaoDeAnalise.interface';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-lancamento-de-resultados',
  standalone: true,
  imports: [ MatCardModule,
    MatIcon,
    MatInputModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgClass,
    MatButton,MatSelectModule],
  templateUrl: './lancamento-de-resultados.component.html',
  styleUrl: './lancamento-de-resultados.component.scss'
})
export class LancamentoDeResultadosComponent implements OnInit {
  dialogRef = inject(MatDialogRef<LancamentoDeResultadosComponent>);
  #configuracaoDeAnaliseService = inject(ConfiguracaoDeAnaliseService)
  #toastr = inject(ToastrService)
  data = inject(MAT_DIALOG_DATA);
  amostra : IAmostra = this.data[0]
  ensaio : string = this.data[1]
  listConfigAnalises: IConfigAnalise[] = [];

  #prazo = inject(HelpersService).calcularPrazoEmDias;
  prazo_atual = this.#prazo(this.amostra.prazo_inicio_fim!.split('-')[1]);
  resultados : IResultado = {}
  configuracaoSelecionada = signal<IConfigAnalise['parametros_de_analise'] | undefined>(undefined);

  constructor(
    private cdRef: ChangeDetectorRef

  ) { }
  

  ngOnInit(): void {
    this.#configuracaoDeAnaliseService.httpListarConfiguracaoDeAnalise().subscribe((response: IConfiguracaoDeAnaliseResponse) => {
      if (response && response.configuracaoDeAnalise) {
        this.listConfigAnalises = response.configuracaoDeAnalise.map(
          (item, index) => ({
            ...item,
            item: index + 1,
          })
        ).filter(os => os.tipo_de_analise.tipo == this.ensaio )
        console.log(this.listConfigAnalises)
      } else {
        this.#toastr.error(response.message);
      }
    });
  }
  closeDialog(){
    this.dialogRef.close()
  }
  getParamsValues(select:  any ) {
    return Object.values(select);

  }

  selecionarConfiguracao(id: string): void {
    const configuracao = this.listConfigAnalises.find(config => config._id === id);
    if (configuracao) {
      this.configuracaoSelecionada.set(configuracao.parametros_de_analise); 
      console.log('Configuração selecionada:', this.configuracaoSelecionada());
    } else {
      this.#toastr.error('Configuração não encontrada');
    }
  }
  


}
