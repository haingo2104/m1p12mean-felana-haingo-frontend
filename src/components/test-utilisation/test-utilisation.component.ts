import { Component } from '@angular/core';
import { TestComponent } from "../test/test.component";
import { AppointmentComponent } from "../appointment/appointment.component";

@Component({
  selector: 'app-test-utilisation',
  imports: [TestComponent, AppointmentComponent],
  templateUrl: './test-utilisation.component.html',
  styleUrl: './test-utilisation.component.css'
})
export class TestUtilisationComponent {

}
