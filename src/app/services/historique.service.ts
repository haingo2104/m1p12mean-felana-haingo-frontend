import { Injectable } from '@angular/core';
import { api } from '../../constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private readonly apiUrl = `${api}/appointments`;

  constructor(private readonly http: HttpClient) { }
  getHistoriques(clientId: string): Observable<any> {
    const params = new HttpParams().set('clientId', clientId);
    return this.http.get<any[]>(`${this.apiUrl}/historiques`, { params });
  }
}
