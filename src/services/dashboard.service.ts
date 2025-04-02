import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${api}`;
  constructor(private http: HttpClient) { }

  // 📊 Récupérer la répartition des rendez-vous par statut
  getAppointmentsSummary(startDate: string, endDate: string) {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any[]>(`${this.apiUrl}/appointments`, { params });
  }


  // 📌 Récupérer le nombre de rendez-vous en attente
  getPendingAppointmentsCount(): Observable<{ pendingAppointmentsCount: number }> {
    return this.http.get<{ pendingAppointmentsCount: number }>(`${this.apiUrl}/appointments/recent`);
  }

  // 🔧 Récupérer le nombre total de réparations terminées
  getTotalRepairs(startDate: string, endDate: string) {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<{ totalRepairs: number }>(`${this.apiUrl}/repairs/totalRepairs`, { params });
  }

  getRepairsSummary(startDate: string, endDate: string) {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<{aFaire: number, enCours: number, termine: number }>(`${this.apiUrl}/repairs/summary`, { params });
  }
  getMechanicsWithCompletedRepairs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/repairs/mechanic-repair-performance`);
  }
  
}
