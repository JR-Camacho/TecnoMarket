import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(user:User){
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }

  login(user:User){
    return this.http.post('http://127.0.0.1:8000/api/login', user);
  }

  logout(header:any){
    return this.http.get('http://127.0.0.1:8000/api/logout', {headers:header});
  }

  loggedIn:boolean;

  isLogged(){
    sessionStorage.getItem('token') == null? this.loggedIn = false : this.loggedIn = true; 
  }
}
