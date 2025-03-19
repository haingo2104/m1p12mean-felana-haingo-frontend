import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn:'root',
})

export class AuthentificationService {
    private readonly apiUrl ='http://localhost:5000/auth/login';
    constructor(private readonly http:HttpClient) {

    }

    sendData(data:any) : Observable<any> {
        return this.http.post(this.apiUrl, data)
    }
}