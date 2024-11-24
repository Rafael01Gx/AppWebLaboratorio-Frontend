import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordValidator } from '../../shared/validators/password.validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IUserRecoveryPassword } from '../../shared/interfaces/IUser.interface';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [MatButtonModule,RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,NgClass,NgIf],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent implements OnInit {

  token: string | null = null;
  email: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });

  }

  #router = inject(Router);
  #userService = inject(UserService);
  #toastr = inject(ToastrService);

  public resetPasswordForm = new FormGroup({
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
    
    if (this.resetPasswordForm.valid) {
    const  user_recovery : IUserRecoveryPassword = {
      token: this.token!,
      email: this.email!,
      password: this.resetPasswordForm.value.password!,
      confirmpassword: this.resetPasswordForm.value.confirmpassword!
    }
      this.#userService
        .httpUserRecoveryPassword(user_recovery)
        .subscribe({
          next: () => {
            this.#toastr.success('Senha alterada com sucesso!');
            this.#router.navigate(['']);
          },
          error: (err) => this.#toastr.error(`erro: ${err.error.message}`),
        });
    }
        
  }
  navigate() {
    this.#router.navigate(['login']);
  }
  hasUpperCase(value: string): boolean { return /[A-Z]/.test(value); }
  hasLower(value: string): boolean { return /[a-z]/.test(value); }
  hasNumber(value: string): boolean { return /[0-9]/.test(value); }
}