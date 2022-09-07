import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(user:User){
    return this.http.post('https://apitecnostore.herokuapp.com/api/register', user);
  }

  login(user:User){
    return this.http.post('https://apitecnostore.herokuapp.com/api/login', user);
  }

  logout(header:any){
    return this.http.get('https://apitecnostore.herokuapp.com/api/logout', {headers:header});
  }

  loggedIn:boolean;

  isLogged(){
    sessionStorage.getItem('token') == null? this.loggedIn = false : this.loggedIn = true; 
  }
}
