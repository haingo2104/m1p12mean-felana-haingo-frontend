import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-home',
  imports: [SignupComponent,MenuComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
