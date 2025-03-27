import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  private readonly apiUrl ='http://localhost:5000/users/register';
  constructor(private readonly http:HttpClient) {

  }

  sendData(data:any) : Observable<any> {
      return this.http.post(this.apiUrl, data)
  }
}
