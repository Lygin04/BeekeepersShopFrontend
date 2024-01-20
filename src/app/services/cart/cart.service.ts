import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserStorageService} from "../storage/user-storage.service";

const URL = "http://localhost:9090/api/cart/";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(id: any): Observable<any>{
    const cartDto={
      productId: id,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(URL + 'addProduct', cartDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCartByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(URL + `getByUserId/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  applyCoupon(code:any): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(URL + `coupon/${userId}/${code}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
