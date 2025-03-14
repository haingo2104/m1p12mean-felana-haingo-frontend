import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn:'root',
})

export class SendUserService {
    private readonly apiUrl ='http://localhost:5000/users/register';
    constructor(private readonly http:HttpClient) {

    }

    sendData(data:any) : Observable<any> {
        return this.http.post(this.apiUrl, data)
    }
}