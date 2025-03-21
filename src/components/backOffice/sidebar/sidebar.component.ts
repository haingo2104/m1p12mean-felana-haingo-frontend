import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isCollapsed = false; // Suivi de l'état ouvert/fermé

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Inverser l'état
  }
}
