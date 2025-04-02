import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class ServiceConfigService {
  private apiUrl = `${api}/services`;
  constructor(private http: HttpClient) { }
  createService(serviceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, serviceData);
  }
  updateService(id: string, serviceData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, serviceData);
  }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteService(serviceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${serviceId}`);
  }
}
