import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl =`${api}/contact/message`;
  constructor(private readonly http:HttpClient) {

  }

  sendData(data:any) : Observable<any> {
      return this.http.post(this.apiUrl, data)
  }
}
