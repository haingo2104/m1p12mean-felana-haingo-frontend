import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule , RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isCollapsed = false; // Par défaut, le menu est caché
  constructor(
    private router: Router
  ) {}
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Inverse l'état du menu
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
