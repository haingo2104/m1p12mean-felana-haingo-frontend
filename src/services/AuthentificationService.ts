import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private readonly apiUrl = 'http://localhost:5000/auth/login';
  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  // Méthode de connexion
  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      tap((response:any) => {
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
