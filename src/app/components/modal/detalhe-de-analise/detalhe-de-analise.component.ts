import { style } from '@angular/animations';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IAmostra } from '../../../shared/interfaces/IAmostra.interface';
import { NgxMaskDirective } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HelpersService } from '../../../core/services/helpers/helpers.service';
import { MatButtonModule } from '@angular/material/button';
import { LancamentoDeResultadosComponent } from '../lancamento-de-resultados/lancamento-de-resultados.component';

@Component({
  selector: 'app-detalhe-de-analise',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgClass,
    MatButtonModule,MatIconModule
  ],
  templateUrl: './detalhe-de-analise.component.html',
  styleUrl: './detalhe-de-analise.component.scss',
})
export class DetalheDeAnaliseComponent implements OnInit {
  dialogRef = inject(MatDialogRef<DetalheDeAnaliseComponent>);
  dialog = inject(MatDialog);
  data: IAmostra = inject(MAT_DIALOG_DATA);
  #prazo = inject(HelpersService).calcularPrazoEmDias;
  prazo_atual = this.#prazo(this.data.prazo_inicio_fim!.split('-')[1]);

  public analises: string[] = this.data.ensaios_solicitados?.split(',') || [];


  analiseForm = new FormGroup({
    nome_solicitante: new FormControl(''),
    email_solicitante: new FormControl(''),
    contato_solicitante: new FormControl(''),
    nome_amostra: new FormControl(''),
    data_amostra: new FormControl(''),
    status_amostra: new FormControl(''),
  });

  ngOnInit(): void {
    this.analiseForm.patchValue({
      nome_solicitante: this.data.solicitante?.name,
      email_solicitante: this.data.solicitante?.email,
      contato_solicitante: this.data.solicitante?.phone,
      nome_amostra: this.data.nome_amostra,
      data_amostra: this.data.data_amostra,
      status_amostra: this.data.status,
    });

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openDialog(ensaio:string): void {
    const dialogRef = this.dialog.open(LancamentoDeResultadosComponent, {
      minWidth: '40vw',
      minHeight:'50vh',
      maxHeight:'90vh',
      data: [this.data,ensaio] ,
    });
    this.dialogRef.close()
  }

  
}
