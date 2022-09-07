import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(headers:any){
    return this.http.get(`https://apitecnostore.herokuapp.com/api/user`, {headers:headers});
  }

  updateUser(headers:any, user:FormData){
    return this.http.post(`https://apitecnostore.herokuapp.com/api/update-user`, user, {headers:headers});
  }

  deleteUser(headers:any, id:number){
    return this.http.delete(`https://apitecnostore.herokuapp.com/api/delete-user/${id}`, {headers:headers});
  }

  showUser(headers:any, id:any){
    return this.http.get(`https://apitecnostore.herokuapp.com/api/show-user/${id}`, {headers:headers});
  }
}
