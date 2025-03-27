import { Routes } from '@angular/router';
import { TestUtilisationComponent } from '../components/test-utilisation/test-utilisation.component';
import { HomeComponent } from '../components/home/home.component';
import { ContactComponent } from '../components/contact/contact.component';
import { LoginComponent } from '../components/login/login.component';
import { SidebarComponent } from '../components/backOffice/sidebar/sidebar.component';
import { MecanicienComponent } from '../components/backOffice/mecanicien/mecanicien.component';
import { DashboardComponent } from '../components/backOffice/dashboard/dashboard.component';
import { AppointmentComponent } from '../components/appointment/appointment.component';
import { AppointmentListComponent } from '../components/backOffice/appointment-list/appointment-list.component';
import { NavbarComponent } from '../components/frontOffice/navbar/navbar.component';
import { SidebarClientComponent } from '../components/frontOffice/sidebar-client/sidebar-client.component';
import { DashboardClientComponent } from '../components/frontOffice/dashboard-client/dashboard-client.component';

export const routes: Routes = [
    {path : 'testUtilisation' , component : TestUtilisationComponent},
    {path : '' , component : HomeComponent},
    {path : 'contact' , component : ContactComponent}, 
    {path : 'login' , component : LoginComponent},
    {path : 'sidebar' , component : SidebarComponent},
    {path : 'mecanicien' , component : MecanicienComponent},
    {path : 'dashboard' , component : DashboardComponent},
    {path : 'appointment' , component : AppointmentComponent},
    {path : 'list-appointment' , component : AppointmentListComponent},
    {path : 'navbar' , component : NavbarComponent},
    {path : 'sidebar-client' , component : SidebarClientComponent},
    {path : 'dashboard-client' , component : DashboardClientComponent}
];
