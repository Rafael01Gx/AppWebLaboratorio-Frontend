import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrdemDeServicoService } from '../../../../core/services/ordem-de-servico/ordem-de-servico.service';
import {
  IAtualizarOrdemDeServico,
  IOrdemDeServico,
  TStatus,
} from '../../../../shared/interfaces/IOrdemDeservico.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { EStatus } from '../../../../shared/Enum/status.enum';

@Component({
  selector: 'app-autorizar-os',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckbox,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  providers: [provideNativeDateAdapter(),DatePipe],

  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autorizar-os.component.html',
  styleUrl: './autorizar-os.component.scss',
})
export class AutorizarOsComponent implements OnInit {
  #toastr = inject(ToastrService);
  #ordemDeServicoService = inject(OrdemDeServicoService);
  

  constructor(
    public dialogRef: MatDialogRef<AutorizarOsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrdemDeServico,
    private datePipe: DatePipe
  ) {
    this.ordem_de_servico = data;
  }

  programar_analise = false;

  ngOnInit(): void {
    this.osStatusForm.patchValue({
      numeroOs: this.data.numeroOs,
    });
    if (this.data.data_recepcao) {
      this.programar_analise = true;

      this.programarAnaliseForm.patchValue({
        numeroOs: this.data.numeroOs,
      });
    }
  }

  ordem_de_servico: IOrdemDeServico;

  osStatusForm = new FormGroup({
    numeroOs: new FormControl(''),
    status: new FormControl('', Validators.required),
  });
  programarAnaliseForm = new FormGroup({
    numeroOs: new FormControl(''),
    data_recepcao: new FormControl('', Validators.required),
    data_inicio: new FormControl('', Validators.required),
    data_fim: new FormControl('', Validators.required),
    observacao: new FormControl(''),
  });

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  formatDate(date: Date | null): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  public httpEditarOrdemDeServico() {

    const data_recepcao = this.formatDate(this.programarAnaliseForm.value.data_recepcao ? new Date(this.programarAnaliseForm.value.data_recepcao) : null )
    const data_inicio = this.formatDate(this.programarAnaliseForm.value.data_inicio ? new Date(this.programarAnaliseForm.value.data_inicio) : null )
    const data_fim = this.formatDate(this.programarAnaliseForm.value.data_fim ? new Date(this.programarAnaliseForm.value.data_fim) : null )
    try {
      const ordemDeServico: IAtualizarOrdemDeServico = { _id: this.data._id };
      if (this.osStatusForm.valid) {
        ordemDeServico.status = this.osStatusForm.value.status as TStatus;
      }
      if (this.programarAnaliseForm.valid) {
        
        ordemDeServico.prazo_inicio_fim = `${data_inicio} - ${data_fim}`;
        ordemDeServico.data_recepcao = data_recepcao;
        ordemDeServico.observacao_adm = this.programarAnaliseForm.value.observacao!;
        ordemDeServico.status = EStatus.EmExecucao;
      }
      
      this.#ordemDeServicoService
        .httpEditarOrdemDeServico(ordemDeServico)
        .subscribe({
          next: () => {
            this.#toastr.success('Status atualizado com sucesso!');
            this.#toastr.info(this.osStatusForm.value.status!);
            this.dialogRef.close(true);
          },
          error: (err) => this.#toastr.error(err.error.message),
        });
        this.dialogRef.close(true);
        
    } catch (err) {
      console.log(err);
      this.#toastr.error("Ocorreu um erro ao atualizar a 'Ordem de Serviço'");
    }
  
  }

  opcoes_status: string[] = Object.values(EStatus);
}
