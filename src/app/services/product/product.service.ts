import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserStorageService} from "../storage/user-storage.service";

const URL = "http://localhost:9090/api/product/";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product: any): Observable<any>{
    console.log(product);
    return this.http.post(URL + 'create', product, {
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
