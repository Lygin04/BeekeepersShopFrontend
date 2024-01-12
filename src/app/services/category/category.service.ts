import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserStorageService} from "../storage/user-storage.service";

const URL = "http://localhost:9090/api/category/";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  create(category: any): Observable<any>{
    return this.http.post(URL + 'create', category, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAll(): Observable<any>{
    return this.http.get(URL + 'all', {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
