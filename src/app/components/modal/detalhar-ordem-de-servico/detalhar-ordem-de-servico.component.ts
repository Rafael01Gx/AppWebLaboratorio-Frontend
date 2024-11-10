import { IAmostrasCollection } from './../../../shared/interfaces/IAmostra.interface';
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { IOrdemDeServico } from '../../../shared/interfaces/IOrdemDeservico.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgxMaskPipe } from 'ngx-mask';
import { MatButton } from '@angular/material/button';
import { PrintPdfService } from '../../../core/services/impressao/print-pdf.service';
import { AutorizarOsComponent } from '../gerenciar-os/autorizar-os/autorizar-os.component';


@Component({
  selector: 'app-detalhar-ordem-de-servico',
  standalone: true,
  imports: [MatCardModule,MatIcon,NgxMaskPipe,MatButton],
  templateUrl: './detalhar-ordem-de-servico.component.html',
  styleUrl: './detalhar-ordem-de-servico.component.scss'
})
export class DetalharOrdemDeServicoComponent implements OnInit {
  
#print = inject(PrintPdfService) //Aguardando implementação


dialogRef = inject(MatDialogRef<DetalharOrdemDeServicoComponent>)
data: IOrdemDeServico  = inject(MAT_DIALOG_DATA)

public exibir = signal(false);

expand() :void{
  this.exibir.set(!this.exibir())
}

ngOnInit(): void {
 
}

getAmostrasValues(amostras:IAmostrasCollection) {
  return Object.values(amostras);
}

closeDialog(): void {
 this.dialogRef.close();
}

dialog = inject(MatDialog);

openDialog(): void {
  this.data.data_recepcao = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
 const auth_os_dialog =  this.dialog.open(AutorizarOsComponent, {
    width: '400px',
    data:this.data,
  });
  auth_os_dialog.afterClosed().subscribe(result => {
    if (result) {
      this.closeDialog();
    }
  });

  
}




}
