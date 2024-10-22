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
import { ILogin } from '../../shared/interfaces/lILogin.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [LoginService, ToastrService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  #router = inject(Router);
  #loginService = inject(LoginService);
  #toastr = inject(ToastrService);

  matError = signal('');
  matError2 = signal('');
  errorMessage = signal('');

  loginForm: FormGroup<ILogin> = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordValidator(),
    ]),
  });

  public erros() {
    if (!this.loginForm.get('email')?.value) {
      this.matError.set('Por favor digite seu e-mail!');
      setTimeout(() => {
        this.matError.set('');
      }, 3000);
    }
    if (!this.loginForm.get('password')?.value) {
      this.matError2.set('Por favor digite sua senha!');
      setTimeout(() => {
        this.matError.set('');
      }, 3000);
    }
    return;
  }

  submit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email!;
      let password = this.loginForm.value.password!;
      this.#loginService.login(email, password).subscribe({
        next: () => {
          this.#toastr.success('Login efetuado com sucesso!');
          this.#router.navigate(['']);
        },
        error: (err) => {
          const err1 = 'O e-mail é obrigatório!';
          const err2 = 'O senha é obrigatória!';
          const err3 = 'Usuario não cadastrado!';
          const err4 = 'Senha inválida!';
          const err5 = 'Aguardando autorização!';

          let erro = err.error.message;

          switch (erro) {
            case err1:
              this.errorMessage.set(err1);
              setTimeout(() => {
                this.errorMessage.set('');
              }, 3000);
              break;
            case err2:
              this.errorMessage.set(err2);
              setTimeout(() => {
                this.errorMessage.set('');
              }, 3000);
              break;
            case err3:
              this.errorMessage.set(err3);
              setTimeout(() => {
                this.errorMessage.set('');
              }, 3000);
              break;
            case err4:
              this.errorMessage.set(err4);
              setTimeout(() => {
                this.errorMessage.set('');
              }, 3000);
              break;
            case err5:
              this.#toastr.info(err.error.message);
              break;
            default:
              this.#toastr.error(err.error.message);
              break;
          }
        },
      });
    }
  }
  navigate() {
    this.#router.navigate(['criarconta']);
  }
}
