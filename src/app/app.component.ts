import { HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  constructor(private auth:AuthService, private userS:UserService, private productsS:ProductsService, private router:Router){}

  ngOnInit(): void {
    console.log(this.loggedIn);
    this.isLogged();
    if(this.loggedIn) this.getUser();
  }
  
  ngDoCheck(): void {
    this.isLogged();
    this.location = window.location.href;
  }

  user:any;
  loggedIn = false;
  seeUserCard = false;
  query:string = '';
  location:any;
  products:any;

  isLogged(){
    this.auth.isLogged();
    this.loggedIn = this.auth.loggedIn;
  }
  
  logOut(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.auth.logout(headers).subscribe(res => {
      console.log(res);
      sessionStorage.removeItem('token'); 
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('password');
      this.isLogged();
      this.router.navigate(['/']);
    },error => console.log(error));
  }

  getUser(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.userS.getUser(headers).subscribe(res => {
      this.user = res;
    }, err => console.log(err)
    )
  }

  getProducts(){
    this.productsS.getProducts(this.query).subscribe(res => {
      console.log(res);
      this.products = res;
    });
  }
  
}