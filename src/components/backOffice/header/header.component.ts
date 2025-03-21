import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  // Méthode de déconnexion
  logout() {
    // Suppression du token (ou d'autres données de session)
    localStorage.removeItem('token');
    
    // Redirection vers la page de connexion
    this.router.navigate(['/login']);
  }
}
