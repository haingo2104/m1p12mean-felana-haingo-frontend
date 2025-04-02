import { Component, OnInit } from '@angular/core';
import { AppointmentServiceService } from '../../../services/appointment-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planning',
  imports: [CommonModule],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent implements OnInit{
  unavailableDate:any[] = []
  constructor(private readonly appointmentService: AppointmentServiceService){}
  ngOnInit() {
    this.appointmentService.getUnavailableDate().subscribe((response: any) => {
      if (response && response.unavailableDates) {
        this.unavailableDate = response.unavailableDates.map((date: string) => new Date(date));
      }
    });
  }
}
