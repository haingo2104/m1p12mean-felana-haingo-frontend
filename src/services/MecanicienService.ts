import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn:'root',
})

export class MecanicienService {
    private readonly apiUrlRegister ='http://localhost:5000/users/register';
    private readonly apiUrlGetMecanicien ='http://localhost:5000/users/register';
    constructor(private readonly http:HttpClient) {

    }

    registerData(data:any) : Observable<any> {
        return this.http.post(this.apiUrlRegister, data)
    }
    getMecanicienData(data:any) : Observable<any> {
        return this.http.get(this.apiUrlGetMecanicien, data)
    }
}