import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RelatorioDeAnaliseComponent } from '../../relatorio-de-analise/relatorio-de-analise.component';
import { MatButton } from '@angular/material/button';
import { OrdemDeServicoService } from '../../../core/services/ordem-de-servico/ordem-de-servico.service';
import { IOrdemDeServico, IOrdemDeServicoResponse } from '../../../shared/interfaces/IOrdemDeservico.interface';
import { EStatus } from '../../../shared/Enum/status.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-revisao-de-os',
  standalone: true,
  imports: [MatCardModule,MatIcon,RelatorioDeAnaliseComponent,MatButton],
  templateUrl: './revisao-de-os.component.html',
  styleUrl: './revisao-de-os.component.scss'
})
export class RevisaoDeOsComponent {
dialogRef = inject(MatDialogRef<RevisaoDeOsComponent>);
element: IOrdemDeServico = inject(MAT_DIALOG_DATA)
#toast= inject(ToastrService)
#ordemDeServicoService = inject(OrdemDeServicoService)
closeDialog(){
 this.dialogRef.close(true);
}
revisar(){
  const ordemDeServico = this.element
  if(ordemDeServico){
    ordemDeServico.status=EStatus.Finalizada
try { 
  this.#ordemDeServicoService.httpEditarOrdemDeServico(ordemDeServico).subscribe(res=>{
      this.#toast.success("Ordem de servico 'Finalizada' ")
      this.closeDialog()
  })
} catch (error) {
  console.error(error)
}
  }
}
}
