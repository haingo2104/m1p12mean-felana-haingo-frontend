import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationServiceService } from '../services/authentification-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthentificationServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // L'utilisateur est authentifié, il peut accéder à la route
    } else {
      this.router.navigate(['/login']); // Redirige vers la page de connexion
      return false;
    }
  }
}
