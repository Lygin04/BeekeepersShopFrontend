import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, user);
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }

  static getUserRole(): any{
    return localStorage.getItem(USER);
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken() === null){
      return false;
    }
    const role = this.getUserRole();
    return role == 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean{
    if(this.getToken() === null){
      return false;
    }
    const role = this.getUserRole();
    return role == 'SELLER' || role == 'BUYER';
  }

  static signout(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
