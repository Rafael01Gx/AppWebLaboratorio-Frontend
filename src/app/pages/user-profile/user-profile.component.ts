import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { MainComponent } from '../../layouts/main/main.component';
import { MatCard } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { emailValidator } from '../../shared/validators/email.validator';
import { passwordValidator } from '../../shared/validators/password.validator';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { UserService } from '../../core/services/user/user.service';
import { IUserData } from '../../shared/interfaces/IUser.interface';
import { ToastrService } from 'ngx-toastr';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,MainComponent,MatCard,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,NgxMaskDirective, NgxMaskPipe,RouterLink,MatButton,MatCheckbox],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  pageIco = 'person'; //Materials icons name
  pageTitle = 'Perfil';

  #userService = inject(UserService);
  #toastr = inject(ToastrService);

  showPasswordFields = false

  #user= signal<IUserData>({})


  public profileForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, emailValidator()]),
    phone: new FormControl(""),
    password: new FormControl("", [
      Validators.minLength(6),
      passwordValidator(),
    ]),
    confirmpassword: new FormControl('', [
      Validators.minLength(6),
      passwordValidator(),
    ]),
    alterarSenha: new FormControl(false),
  });

  ngOnInit(): void {
    this.#userService.httpCheckUser().subscribe(response => {
      this.#user.set(response);

      this.profileForm.patchValue({
        id: response._id,
        name: response.name,
        email: response.email,
        phone: response.phone,
        password: "",
        confirmpassword: "",
      });
    });
  }


  public  atualizar() {
    this.#userService.httpUpdateUserById(this.profileForm.value.id!,this.profileForm.value.name!,this.profileForm.value.email!,this.profileForm.value.phone!,this.profileForm.value.password!,this.profileForm.value.confirmpassword!).subscribe({
      next: () => {
        this.#toastr.success("Usuário atualizado!");
      },
      error: (err) => this.#toastr.error(err.error.message),
    });
  }
}