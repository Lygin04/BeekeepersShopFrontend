import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {UserStorageService} from "../storage/user-storage.service";

const URL = "http://localhost:9090/api/auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private userStorage: UserStorageService) { }

  register(signupRequest: any): Observable<any>{
    console.log(signupRequest);
    return this.http.post<any>(URL + `signup`, signupRequest);
  }

  signin(email: string, password: string): any{
    //const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = {email, password};
    console.log(body);
    return this.http.post<any>(URL + 'signin', body);
  }
}
