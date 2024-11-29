
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  IAmostra,
  IResultado,
  IResultadoCollection,
} from '../../../shared/interfaces/IAmostra.interface';
import { NgxMaskDirective} from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { HelpersService } from '../../../core/services/helpers/helpers.service';
import { MatButtonModule } from '@angular/material/button';
import { LancamentoDeResultadosComponent } from '../lancamento-de-resultados/lancamento-de-resultados.component';
import { DecimalFormatPipe } from '../../../shared/pipes/decimal-format.pipe';
import { DeletarResultadoAmostraComponent } from '../deletar-resultado-amostra/deletar-resultado-amostra.component';
import { AmostraService } from '../../../core/services/amostra/amostra.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhe-de-analise',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgClass,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,CommonModule, DecimalFormatPipe
  ],
  templateUrl: './detalhe-de-analise.component.html',
  styleUrl: './detalhe-de-analise.component.scss',
})
export class DetalheDeAnaliseComponent implements OnInit {
  dialogRef = inject(MatDialogRef<DetalheDeAnaliseComponent>);
  dialog = inject(MatDialog);
  #amostraService = inject(AmostraService);
  data: IAmostra = inject(MAT_DIALOG_DATA);
  #toast = inject(ToastrService)
  #prazo = inject(HelpersService).calcularPrazoEmDias;
  prazo_atual = this.#prazo(this.data.prazo_inicio_fim!.split('-')[1]);
  resultados: IResultadoCollection = {};
  public analises: string[] = this.data.ensaios_solicitados?.split(',') || [];
  exibirBtt = false;

  analiseForm = new FormGroup({
    nome_solicitante: new FormControl(''),
    area: new FormControl(''),
    funcao: new FormControl(''),
    email_solicitante: new FormControl(''),
    contato_solicitante: new FormControl(''),
    nome_amostra: new FormControl(''),
    data_amostra: new FormControl(''),
    status_amostra: new FormControl(''),
  });

  ngOnInit(): void {
    this.analiseForm.patchValue({
      nome_solicitante: this.data.solicitante?.name,
      area: this.data.solicitante?.area,
      funcao: this.data.solicitante?.funcao,
      email_solicitante: this.data.solicitante?.email,
      contato_solicitante: this.data.solicitante?.phone,
      nome_amostra: this.data.nome_amostra,
      data_amostra: this.data.data_amostra,
      status_amostra: this.data.status,
    });
    this.resultados = this.data.resultados || {};
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openDialog(ensaio: string): void {
    const dialogRef = this.dialog.open(LancamentoDeResultadosComponent, {
      minWidth: '40vw',
      maxHeight: '90vh',
      data: [this.data, ensaio],
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.resultados = res.resultados || {}     
      }
    });
  }
  objectToArray(item: Object) {
    return Object.values(item);
  }

removerResultado(item:string){
const remove =this.dialog.open(DeletarResultadoAmostraComponent,{
})
remove.afterClosed().subscribe((res) => {
  if(res){
    delete this.resultados[item]
    this.exibirBtt = true
  }
})}

salvarAlteracoes():void{
  const id= this.data._id;
  const amostra = this.data
  amostra.progresso = this.#amostraService.calcularProgresso(amostra);
  if(id){
try {
  this.#amostraService.httpEditarAmostra(id,amostra).subscribe(
    {
      next: () => {
        this.#toast.success('Alterações aplicadas com sucesso!');
      },
      error: (error) => {
        this.#toast.error(
          'Erro ao salvar alterações: ',
          error.error.message
        );
      },
    }
  )
} catch (error) {
  this.#toast.error("Não foi possível atualizar, tente novamente mais tarde...")
}
}}
 
 
}
