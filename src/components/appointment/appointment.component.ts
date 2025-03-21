import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-appointment',
  imports: [CommonModule,FormsModule,MatCardModule, MatDatepickerModule ,MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule ,],
  providers: [provideNativeDateAdapter()],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent {
  selected: Date | null = null;
  selectedTime: Date = new Date();

  onSubmit() {
    console.log('Date sélectionnée:', this.selected);
    console.log('Heure sélectionnée:', this.selectedTime);
  }
}
