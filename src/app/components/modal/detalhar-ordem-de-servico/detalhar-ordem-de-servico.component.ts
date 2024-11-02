import { IAmostrasCollection } from './../../../shared/interfaces/IAmostra.interface';
import { Component, inject, OnInit } from '@angular/core';
import { IOrdemDeServico } from '../../../shared/interfaces/IOrdemDeservico.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-detalhar-ordem-de-servico',
  standalone: true,
  imports: [MatCardModule,MatIcon,NgxMaskPipe],
  templateUrl: './detalhar-ordem-de-servico.component.html',
  styleUrl: './detalhar-ordem-de-servico.component.scss'
})
export class DetalharOrdemDeServicoComponent implements OnInit {
dialogRef = inject(MatDialogRef<DetalharOrdemDeServicoComponent>)
data: IOrdemDeServico  = inject(MAT_DIALOG_DATA)


ngOnInit(): void {
 
}

getAmostrasValues(amostras:IAmostrasCollection) {
  return Object.values(amostras);
}

closeDialog(): void {
 this.dialogRef.close();
}

}
