import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserService } from '../../../core/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { IUserData } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-delet-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeletModalComponent {
  readonly dialogRef = inject(MatDialogRef<DeletModalComponent>);
  #userService= inject(UserService)
  #toastr= inject(ToastrService)

  constructor(
    public MatDialogRef: MatDialogRef<DeletModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  
  
  public httpDeleteUser(id:string) {
    this.#userService.httpDeletUserAdm(id).subscribe({
      next: () => {
        this.#toastr.success("Usuário deletado!");
        this.dialogRef.close(true); 
      },
      error: (err) => {      
            this.#toastr.error(err.error.message);                         
        }
    });}

}
