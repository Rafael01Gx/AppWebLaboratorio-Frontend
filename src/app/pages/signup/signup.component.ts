import { Component, inject, Output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

//Components
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';

//Validators
import { emailValidator } from '../../shared/validators/email.validator';
import { passwordValidator } from '../../shared/validators/password.validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [LoginService, ToastrService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {


  #router = inject(Router);
  #loginService = inject(LoginService);
  #toastr = inject(ToastrService);

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, emailValidator()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordValidator(),
    ]),
    confirmpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordValidator(),
    ]),
  });

  submit() {
    if (this.signupForm.valid) {
      let name = this.signupForm.value.name!;
      let email = this.signupForm.value.email!;
      let password = this.signupForm.value.password!;
      let confirmpassword = this.signupForm.value.confirmpassword!;
      this.#loginService
        .signup(name, email, password, confirmpassword)
        .subscribe({
          next: () => {
            this.#toastr.success('Conta criada com sucesso!');
            this.#router.navigate(['login']);
          },
          error: (err) => this.#toastr.error(err.error.message),
        });
    }
  }
  navigate() {
    this.#router.navigate(['criarconta']);
  }
}
