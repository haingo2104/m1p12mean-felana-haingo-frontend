import { Component, input, OnInit, SimpleChanges } from '@angular/core';
import { AppointmentServiceService } from '../../../services/appointment-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-detail',
  imports: [CommonModule],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.css'
})
export class AppointmentDetailComponent implements OnInit{
  appointmentId = input<string>('');     
  appointmentDetails: any | null = null;   
  constructor(private readonly appointService: AppointmentServiceService) {}
  ngOnInit(): void {
    if (this.appointmentId) {
      this.fetchAppointmentDetail(this.appointmentId());
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appointmentId'] && changes['appointmentId'].currentValue) {
      this.fetchAppointmentDetail(changes['appointmentId'].currentValue);
    }
  }
  fetchAppointmentDetail(appointmentId: string): void {
    this.appointService.fetchAppointmentDetail(appointmentId).subscribe(details => {
      this.appointmentDetails = details;
    });
  }
}
