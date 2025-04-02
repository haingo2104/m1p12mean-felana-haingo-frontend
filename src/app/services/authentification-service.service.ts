import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { api } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationServiceService {
  private readonly apiUrl = `${api}/auth/login`;;
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  // Méthode de connexion
  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      tap((response: any) => {
        if (response.token && response.user) {
          // Stocker le token et le rôle dans localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.user.role.name);
          localStorage.setItem('userId', response.userId);

          // Rediriger l'utilisateur selon son rôle
          this.router.navigate([response.redirectTo]);
        }
      })
    );
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Récupérer le rôle de l'utilisateur
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
