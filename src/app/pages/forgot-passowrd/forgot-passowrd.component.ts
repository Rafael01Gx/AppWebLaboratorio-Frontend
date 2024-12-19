import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { emailValidator } from '../../shared/validators/email.validator';
import { UserService } from '../../core/services/user/user.service';

@Component({
    selector: 'app-forgot-passowrd',
    imports: [LoginLayoutComponent,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './forgot-passowrd.component.html',
    styleUrl: './forgot-passowrd.component.scss'
})
export class ForgotPassowrdComponent {
  #router = inject(Router);
  #toastr = inject(ToastrService);
  #userService = inject(UserService)

  matError = signal('');


  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator()]),
  });

  public erros() {
    if (!this.forgotPasswordForm.get('email')?.value) {
      this.matError.set('Por favor digite o e-mail da conta!');
      setTimeout(() => {
        this.matError.set('');
      }, 3000);
    }
}
navigate() {
  this.#router.navigate(['login']);
}

submit() {
  if (this.forgotPasswordForm.valid) {
    let email = this.forgotPasswordForm.value.email!;
    this.#userService.httpUserForgotPassword(email).subscribe({
      next: () => {
        this.#toastr.success("Solicitação de redefinição de senha enviada com sucesso. Verifique seu e-mail para redefinir sua senha.");
        this.#router.navigate(['']);
      },
      error: (err) => {
        this.#toastr.error(err);

      },
    });
  }
}
}