import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  verifyToken(token: string): Promise<boolean> {
    return this.http.post<{ valid: boolean }>(`${environment.api_url}/api/verify-token`, { token })
      .toPromise()
      .then(response => response?.valid || false) // Verifica se response existe e é válido
      .catch(() => false);
  }
}
