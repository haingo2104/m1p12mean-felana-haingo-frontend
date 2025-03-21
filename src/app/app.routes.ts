import { Routes } from '@angular/router';
import { TestUtilisationComponent } from '../components/test-utilisation/test-utilisation.component';
import { HomeComponent } from '../components/home/home.component';
import { ContactComponent } from '../components/contact/contact.component';
import { LoginComponent } from '../components/login/login.component';
import { SidebarComponent } from '../components/backOffice/sidebar/sidebar.component';
import { MecanicienComponent } from '../components/backOffice/mecanicien/mecanicien.component';
import { DashboardComponent } from '../components/backOffice/dashboard/dashboard.component';

export const routes: Routes = [
    {path : 'testUtilisation' , component : TestUtilisationComponent},
    {path : 'home' , component : HomeComponent},
    {path : 'contact' , component : ContactComponent}, 
    {path : 'login' , component : LoginComponent},
    {path : 'sidebar' , component : SidebarComponent},
    {path : 'mecanicien' , component : MecanicienComponent},
    {path : 'dashboard' , component : DashboardComponent}
];
