import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentServiceService {
  private readonly apiUrl = 'http://localhost:5000/appointments';
  constructor(private readonly http: HttpClient) {}
  createAppointment(
    clientId: string,
    vehicleId: string,
    date: string
  ): Observable<any> {
    const appointmentData = { clientId, vehicleId, date };
    return this.http.post<any>(this.apiUrl, appointmentData);
  }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allAppointments`);
  }
  fetchAppointmentDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  acceptAppointment(appointmentId: string): Observable<any> {
    console.log('service',appointmentId)
    const appointmentData = { appointmentId };
    return this.http.post<any>(`${this.apiUrl}/accept`, appointmentData);
  } 

  assignMechanic(appointmentId: string, idMecanien : string, repairCost : string): Observable<any> {
    const data = { appointmentId, idMecanien ,repairCost};
    console.log(data)
    return this.http.post<any>(`${this.apiUrl}/assignMechanic`, data);
  } 
  getUnavailableDate(): Observable<{ unavailableDates: string[] }> {
    return this.http.get<{ unavailableDates: string[] }>(`${this.apiUrl}/unavailableDate`);
  }
  
}
