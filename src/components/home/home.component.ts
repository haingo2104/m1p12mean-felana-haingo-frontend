import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { SignupComponent } from '../signup/signup.component';
import { ServiceOfferComponent } from '../service-offer/service-offer.component';
import { ContactComponent } from '../contact/contact.component';
@Component({
  selector: 'app-home',
  imports: [SignupComponent,MenuComponent,FooterComponent,ServiceOfferComponent,ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
