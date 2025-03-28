import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:5000/notifications/'; // Remplacez par votre API

  constructor(private http: HttpClient) {}

  getNotifications(userId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${userId}`);
  }

}
