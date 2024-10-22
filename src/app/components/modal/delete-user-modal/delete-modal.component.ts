import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { IModalDelete } from '../../../shared/interfaces/IModal.interface';

@Component({
  selector: 'app-delet-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeletModalComponent {
  readonly dialogRef = inject(MatDialogRef<DeletModalComponent>);



  constructor(
    public MatDialogRef: MatDialogRef<DeletModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalDelete
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  
  
  public apagar(): void {
    this.dialogRef.close(this.data._id);
  }


}
