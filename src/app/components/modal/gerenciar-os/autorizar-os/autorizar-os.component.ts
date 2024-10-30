import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrdemDeServicoService } from '../../../../core/services/ordem-de-servico/ordem-de-servico.service';
import { IOrdemDeServico } from '../../../../shared/interfaces/IOrdemDeservico.interface';
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

  ],
  templateUrl: './autorizar-os.component.html',
  styleUrl: './autorizar-os.component.scss',
})
export class AutorizarOsComponent implements OnInit {
  #toastr = inject(ToastrService);
  #ordemDeServicoService = inject(OrdemDeServicoService);

  constructor(
    public dialogRef: MatDialogRef<AutorizarOsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrdemDeServico
  ) {
    this.ordem_de_servico = data;
  }
  ngOnInit(): void {
    this.osStatusForm.patchValue({
      numeroOs: this.data.numeroOs,
    });
  }

  ordem_de_servico: IOrdemDeServico;

  osStatusForm = new FormGroup({
    numeroOs: new FormControl(''),
    status: new FormControl('', Validators.required),
  });

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  public httpEditarOrdemDeServico() {
    this.#ordemDeServicoService
      .httpEditarOrdemDeServico(this.data._id, this.osStatusForm.value.status!)
      .subscribe({
        next: () => {
          this.#toastr.success('Status atualizado com sucesso!');
          this.#toastr.info(this.osStatusForm.value.status!);
          this.dialogRef.close(true);
        },
        error: (err) => this.#toastr.error(err.error.message),
      });

  }

  opcoes_status = [
    'Aguardando Autorização',
    'Autorizada',
    'Em Execução',
    'Finalizada',
    'Cancelada',
  ];
}
