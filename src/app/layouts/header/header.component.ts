import { Component, inject, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  hidden = false;

  #router = inject(Router);

  @Input() pageIco: string = '';
  @Input() pageTitle: string = '';

  name = sessionStorage.getItem('user-name')

  logout() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('user-name');  
    sessionStorage.removeItem('user-level'); 
    
    this.#router.navigate(['/login']);
  }
}
