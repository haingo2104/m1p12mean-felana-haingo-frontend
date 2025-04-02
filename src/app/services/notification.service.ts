import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${api}/notifications`; // Remplacez par votre API

  constructor(private http: HttpClient) {}

  getNotifications(userId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

}
