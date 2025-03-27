import { Component } from '@angular/core';
import { SidebarClientComponent } from '../sidebar-client/sidebar-client.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard-client',
  imports: [SidebarClientComponent,NavbarComponent,RouterModule],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css'
})
export class DashboardClientComponent {

}
