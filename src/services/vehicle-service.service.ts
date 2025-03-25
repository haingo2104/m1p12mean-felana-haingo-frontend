import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleServiceService {
  private readonly apiUrl = 'http://localhost:5000/vehicles';
  constructor(private readonly http: HttpClient) {}
  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Créer un nouveau véhicule
  createVehicle(ownerId: string, model: string): Observable<any> {
    const vehicleData = { ownerId, model };
    return this.http.post<any>(this.apiUrl, vehicleData);
  }
}
