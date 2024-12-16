import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
@Component({
    selector: 'app-delet-modal',
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    templateUrl: './delete-modal.component.html',
    styleUrl: './delete-modal.component.scss'
})
export class DeletModalComponent {
  readonly dialogRef = inject(MatDialogRef<DeletModalComponent>);

  constructor(
    public MatDialogRef: MatDialogRef<DeletModalComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  
  
  public apagar(): void {
    this.dialogRef.close(true);
  }


}
