import { Routes } from '@angular/router';
import { TestUtilisationComponent } from '../components/test-utilisation/test-utilisation.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    {path : 'testUtilisation' , component : TestUtilisationComponent},
    {path : 'home' , component : HomeComponent}
];
