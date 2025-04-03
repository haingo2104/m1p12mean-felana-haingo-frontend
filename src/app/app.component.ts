import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/backOffice/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/backOffice/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , SidebarComponent , CommonModule , HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'm1p12mean-felana-haingo-frontend';
  showSidebar: boolean = true;

  hiddenRoutes: string[] = ['/', '/login','/#serviceOffer','/#contact','/login/mecanicien','/login/manager']; 
  constructor(private readonly router: Router) {
    this.router.events.subscribe(() => {
      this.showSidebar = !this.hiddenRoutes.includes(this.router.url);
    });
  }
}
