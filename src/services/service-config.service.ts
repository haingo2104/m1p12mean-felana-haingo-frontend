import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceConfigService {
  private apiUrl = 'http://localhost:5000/services';
  constructor(private http: HttpClient) { }
  createService(serviceData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, serviceData);
  }
  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
