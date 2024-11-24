import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { IAmostra, IResultadoCollection } from '../../../shared/interfaces/IAmostra.interface';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-deletar-resultado-amostra',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,MatButton],
  templateUrl: './deletar-resultado-amostra.component.html',
  styleUrl: './deletar-resultado-amostra.component.scss'
})
export class DeletarResultadoAmostraComponent {
dialogRef = inject(MatDialogRef<DeletarResultadoAmostraComponent>);

remove(){
  this.dialogRef.close(true);
}
close(){
  this.dialogRef.close(false);
}
}
