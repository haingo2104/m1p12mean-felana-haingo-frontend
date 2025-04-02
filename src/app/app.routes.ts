import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/backOffice/sidebar/sidebar.component';
import { MecanicienComponent } from './components/backOffice/mecanicien/mecanicien.component';
import { DashboardComponent } from './components/backOffice/dashboard/dashboard.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentListComponent } from './components/backOffice/appointment-list/appointment-list.component';
import { ServiceConfigComponent } from './components/backOffice/service-config/service-config.component';
import { AddServiceComponent } from './components/backOffice/add-service/add-service.component';
import { PlanningComponent } from './components/backOffice/planning/planning.component';
import { MechanicComponent } from './components/mechanic/mechanic.component';
import { ServiceOfferComponent } from './components/service-offer/service-offer.component';
import { HistoriquesComponent } from './components/historiques/historiques.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path : '' , component : HomeComponent},
    {path : 'contact' , component : ContactComponent}, 
    {path : 'login' , component : LoginComponent},
    {path : 'sidebar' , component : SidebarComponent, canActivate: [AuthGuard]},
    {path : 'mecanicien' , component : MecanicienComponent, canActivate: [AuthGuard]},
    {path : 'dashboard' , component : DashboardComponent, canActivate: [AuthGuard]},
    {path : 'appointment' , component : AppointmentComponent, canActivate: [AuthGuard]},
    {path : 'list-appointment' , component : AppointmentListComponent, canActivate: [AuthGuard]},
    {path : 'services' , component : ServiceConfigComponent, canActivate: [AuthGuard]},
    {path : 'add-service' , component : AddServiceComponent, canActivate: [AuthGuard]},
    {path : 'planning' , component : PlanningComponent, canActivate: [AuthGuard]},
    {path : 'repairs' , component : MechanicComponent, canActivate: [AuthGuard]},
    {path : 'serviceOffer' , component : ServiceOfferComponent},
    {path : 'historiques' , component : HistoriquesComponent, canActivate: [AuthGuard]},
];
