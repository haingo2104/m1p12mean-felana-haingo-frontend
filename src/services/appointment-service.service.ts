import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentServiceService {
  private readonly apiUrl = 'http://localhost:5000/appointments';
  constructor(private readonly http: HttpClient) {}
  createAppointment(clientId: string, vehicleId: string, date: string): Observable<any> {
    const appointmentData = { clientId, vehicleId, date };
    return this.http.post<any>(this.apiUrl, appointmentData);
  }
}
