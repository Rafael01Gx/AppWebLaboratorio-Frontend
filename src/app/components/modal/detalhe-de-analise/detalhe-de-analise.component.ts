import { map } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { IAmostra } from '../../../shared/interfaces/IAmostra.interface';
import { IOrdemDeServico } from '../../../shared/interfaces/IOrdemDeservico.interface';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-detalhe-de-analise',
  standalone: true,
  imports: [MatCardModule,MatIcon,NgxMaskPipe],
  templateUrl: './detalhe-de-analise.component.html',
  styleUrl: './detalhe-de-analise.component.scss'
})
export class DetalheDeAnaliseComponent implements OnInit {
  dialogRef = inject(MatDialogRef<DetalheDeAnaliseComponent>)
 data: IAmostra  = inject(MAT_DIALOG_DATA)

 public analises: string[] = this.data.ensaios_solicitados?.split(',') || []


 

ngOnInit(): void {
  console.log(this.analises)
}


closeDialog(): void {
  this.dialogRef.close();
}

}
