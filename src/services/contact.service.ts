import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl ='http://localhost:5000/contact/message';
  constructor(private readonly http:HttpClient) {

  }

  sendData(data:any) : Observable<any> {
      return this.http.post(this.apiUrl, data)
  }
}
