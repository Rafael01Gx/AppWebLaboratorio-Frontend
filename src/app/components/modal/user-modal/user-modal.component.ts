import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IUserData } from '../../../shared/interfaces/user';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule,FormsModule,MatSelectModule,MatButtonModule,MatCheckbox],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  options=[
    'Usuário','Operador','Administrador'
  ]
}
