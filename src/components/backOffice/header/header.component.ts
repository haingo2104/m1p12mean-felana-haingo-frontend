import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  notifications: any[] = [];
  userId = localStorage.getItem('userId');
  notificationCount: number = 0;

  constructor(
    private router: Router,
    private readonly notificationService: NotificationService
  ) {}
  
  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications(this.userId).subscribe({
      next: (data: any) => {
        this.notifications = data;
        this.notificationCount = this.notifications.length;
      },
      error: (error: any) => {
        console.error('Erreur de récupération des notifications', error);
      },
    });
    
  }

  // Méthode de déconnexion
  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
