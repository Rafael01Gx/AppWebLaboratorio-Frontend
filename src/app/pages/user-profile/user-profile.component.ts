import { NgxMaskDirective } from 'ngx-mask';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { MainComponent } from '../../layouts/main/main.component';
import { MatCard } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { emailValidator } from '../../shared/validators/email.validator';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { UserService } from '../../core/services/user/user.service';
import { IUserData } from '../../shared/interfaces/IUser.interface';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,MainComponent,MatCard,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,NgxMaskDirective,RouterLink,MatButton ],
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
    phone: new FormControl("",[Validators.required,Validators.minLength(11)]), 
    area: new FormControl("",[ Validators.required,Validators.minLength(3)]),
    funcao: new FormControl("",[Validators.required,Validators.minLength(3)]),
  });

  ngOnInit(): void {
    this.#userService.httpCheckUser().subscribe(response => {
      this.#user.set(response);

      this.profileForm.patchValue({
        id: response._id,
        name: response.name,
        email: response.email,
        phone: response.phone,
        area: response.area,
        funcao: response.funcao,
      });
    });
  }


  public  atualizar() {
   const  id = this.profileForm.value.id ;
    const user : IUserData = {
      name: this.profileForm.value.name!,
      email: this.profileForm.value.email!,
      phone: this.profileForm.value.phone!,
      area: this.profileForm.value.area?.toUpperCase(),
      funcao: this.profileForm.value.funcao!,
    }
if(this.profileForm.valid){
  this.#userService.httpUpdateUserById(id!,user).subscribe({
    next: () => {
      this.#toastr.success("Usuário atualizado!");
    },
    error: (err) => this.#toastr.error(err.error.message),
  });
}
}
}