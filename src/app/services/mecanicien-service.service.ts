import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class MecanicienServiceService {
  private readonly apiUrlRegister = `${api}/users/register`;;
  private readonly apiUrlGetMecaniciens =
    `${api}/users`;

  constructor(private readonly http: HttpClient) {}

  registerData(data: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, data);
  }

  getMecaniciens(roleName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlGetMecaniciens}/${roleName}`);
  }

  // Méthode pour mettre à jour le statut d'un mécanicien
  updateMecanicienStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrlGetMecaniciens}/${id}/status`, { status });
  }
}
