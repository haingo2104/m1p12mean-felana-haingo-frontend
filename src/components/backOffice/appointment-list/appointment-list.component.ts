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

  constructor(
    private readonly appointmentService: AppointmentServiceService
  ) {}
  ngOnInit() {
    this.appointmentService.getAllAppointments().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }
  selectAppointment(appointmentId: string): void {
    if (!appointmentId) {
      console.error('Invalid book ID');
      return;
    }
    
    if (this.selectedAppointmentId === appointmentId) {
      this.selectedAppointmentId = ''; 
    } else {
      this.selectedAppointmentId = appointmentId; 
    }
  
    console.log("Selected book ID:", this.selectedAppointmentId);
  }
}
