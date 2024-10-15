import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent {
@Input() title: string ="";
@Input() primaryBtnText: string ="";
@Input() secondaryBtnText: string ="";
@Input() disablePrimaryBtn: boolean = true;



@Output("submit") onSubmit = new EventEmitter();
@Output("navigate") onNavigate = new EventEmitter();

submit(){
  this.onSubmit.emit()}

navigate(){
  this.onNavigate.emit()}

}
