import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  private readonly apiUrl = 'http://localhost:5000/repairs';

  constructor(private readonly http: HttpClient) { }
  getMechanicRepairs(mecanicienId: string): Observable<any> {
    const params = new HttpParams().set('mecanicienId', mecanicienId);
    return this.http.get<any[]>(`${this.apiUrl}/mechanicRepairs`, { params });
  }
  updateRepairStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status });
  }
}
