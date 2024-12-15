import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { DeletModalComponent } from '../delete-user-modal/delete-modal.component';

@Component({
  selector: 'app-gerar-etiqueta',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './gerar-etiqueta.component.html',
  styleUrl: './gerar-etiqueta.component.scss'
})
export class GerarEtiquetaComponent {
readonly dialogRef = inject(MatDialogRef<DeletModalComponent>);

  constructor(
    public MatDialogRef: MatDialogRef<DeletModalComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  
  
  public gerarAgora(): void {
    this.dialogRef.close(true);
  }
}
