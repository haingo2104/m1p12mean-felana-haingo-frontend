import { Component, OnInit } from '@angular/core';
import { AppointmentServiceService } from '../../../services/appointment-service.service';
import { CommonModule } from '@angular/common';
import { AppointmentDetailComponent } from '../appointment-detail/appointment-detail.component';

@Component({
  selector: 'app-appointment-list',
  imports: [CommonModule , AppointmentDetailComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  selectedAppointmentId: string | null = null;
  acceptedAppointments: string[] = [];
  isLoading: boolean = true; 


  constructor(
    private readonly appointmentService: AppointmentServiceService
  ) {}
  ngOnInit() {
    this.appointmentService.getAllAppointments().subscribe((appointments) => {
      this.appointments = appointments;
      this.isLoading = false;  
    },
    (error) => {
      this.isLoading = false; 
    });
  }
  toggleDetails(appointmentId: string) {
    this.selectedAppointmentId =
      this.selectedAppointmentId === appointmentId ? null : appointmentId;
  }


  acceptAppointment(appointmentId: string): void {
    console.log('component',appointmentId);
    if (!appointmentId) {
      console.error('appointment et user non recupéré');
      return;
    }
    
    this.appointmentService.acceptAppointment(appointmentId).subscribe({
      next: (response) => {
        this.acceptedAppointments.push(appointmentId);
        this.ngOnInit();
        console.log("Réponse de l'API:", response);
      },
      error: (error) =>{
        console.error('Erreur', error);
      }
    })
  }


}
