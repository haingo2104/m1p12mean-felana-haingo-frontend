import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MecanicienService {
  private readonly apiUrlRegister = 'http://localhost:5000/users/register';
  private readonly apiUrlGetMecaniciens =
    'http://localhost:5000/users';

  constructor(private readonly http: HttpClient) {}

  registerData(data: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, data);
  }

  getMecaniciens(roleName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlGetMecaniciens}/${roleName}`);
  }
}
