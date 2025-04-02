import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthentificationServiceService } from '../../../services/authentification-service.service';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule , RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isCollapsed = false; // Par défaut, le menu est caché
  userRole: string | null = null;
  constructor(
    private router: Router,
    private authService: AuthentificationServiceService
  ) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Inverse l'état du menu
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.userRole = this.authService.getRole(); // Récupère le rôle au chargement
  }
}
