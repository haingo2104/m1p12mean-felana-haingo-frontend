import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentServiceService } from '../../services/appointment-service.service';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-appointment',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent {
  selected: Date | null = null;
  selectedTime: Date = new Date();
  selectedVehicleId: string | null = null;
  vehicles: any[] = [];
  newVehicleModel: string = '';
  clientId = localStorage.getItem('userId');
  description: string = '';


  confirmedDate: Date | null = null;
  confirmedTime: Date | null = null;

  constructor(
    private readonly appointmentService: AppointmentServiceService,
    private readonly vehicleService: VehicleServiceService
  ) {}

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  onSubmit() {
    const clientId = this.clientId;
    const date = this.selected;
    const time = this.selectedTime;
    let vehicleId = this.selectedVehicleId;
    let description = this.description

    if (!clientId || !date || !time || !vehicleId) {
      console.error('Tous les champs doivent être remplis');
      return;
    }

    // Si un nouveau véhicule est sélectionné
    if (vehicleId === 'new' && this.newVehicleModel) {
      this.vehicleService
        .createVehicle(clientId, this.newVehicleModel)
        .subscribe({
          next: (response) => {
            console.log('Véhicule créé:', response);
            const newVehicle = response.vehicle;
            vehicleId = newVehicle._id;
            this.createAppointment(clientId, vehicleId as string, date, time , description);
          },
          error: (error) => {
            console.error('Erreur lors de la création du véhicule', error);
          },
        });
    } else if (vehicleId) {
      // Si un véhicule existant est sélectionné
      this.createAppointment(clientId, vehicleId, date, time , description);
    } else {
      console.error(
        'Veuillez sélectionner un véhicule ou ajouter un nouveau véhicule.'
      );
    }
  }

  // Créer un rendez-vous
  createAppointment(
    clientId: string,
    vehicleId: string,
    date: Date,
    time: Date,
    description : string
  ) {
    const appointmentDate = new Date(date);
    appointmentDate.setHours(
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

    const formattedDate = appointmentDate.toISOString();

    this.appointmentService
      .createAppointment(clientId, vehicleId, formattedDate , description)
      .subscribe({
        next: (response: any) => {
          console.log('Rendez-vous créé avec succès', response);
          this.confirmedDate = appointmentDate;
          this.showToast(true);
        },
        error: (error: any) => {
          console.error('Erreur lors de la création du rendez-vous', error);
          this.showToast(false);
        },
      });
  }
  showToast(isSuccess: boolean) {
    const toastId = isSuccess ? 'liveToastSuccess' : 'liveToastError';
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }
  
}
