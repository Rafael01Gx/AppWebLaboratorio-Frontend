import { Component, inject, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IUserData } from '../../../shared/interfaces/IUser.interface';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { UserService } from '../../../core/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { EUserLevels } from '../../../shared/Enum/userLevels.enum';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatDialogModule,
    FormsModule, MatSelectModule, MatButtonModule, MatCheckbox
  ],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
  #userService = inject(UserService);
  #toastr = inject(ToastrService);

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  public httpUpdateUserAdm(id: string, authorization: boolean, level: string) {
    this.#userService.httpUpdateUserAdm(id, authorization, level).subscribe({
      next: () => {
        this.#toastr.success("Usuário atualizado!");
        this.dialogRef.close(true);
      },
      error: (err) => this.#toastr.error(err.error.message),
    });
  }

  options : string[] = Object.values(EUserLevels)
}
