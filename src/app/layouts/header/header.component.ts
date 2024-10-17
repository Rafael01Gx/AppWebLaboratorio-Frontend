import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  #router = inject(Router);

  @Input() pageIco: string = '';
  @Input() pageTitle: string = '';

  logout() {
    sessionStorage.removeItem('auth-token');
    
    this.#router.navigate(['/login']);
  }
}
