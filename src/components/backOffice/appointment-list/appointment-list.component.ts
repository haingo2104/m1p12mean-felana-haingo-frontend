import { Component, OnInit } from '@angular/core';
import { AppointmentServiceService } from '../../../services/appointment-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  imports: [CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  constructor(
    private readonly appointmentService: AppointmentServiceService
  ) {}
  ngOnInit() {
    this.appointmentService.getAllAppointments().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }
}
