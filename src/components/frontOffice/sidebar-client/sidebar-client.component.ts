import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-client',
  imports: [CommonModule],
  templateUrl: './sidebar-client.component.html',
  styleUrl: './sidebar-client.component.css'
})
export class SidebarClientComponent {
  isCollapsed = false; // Suivi de l'état ouvert/fermé

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Inverser l'état
  }
}
