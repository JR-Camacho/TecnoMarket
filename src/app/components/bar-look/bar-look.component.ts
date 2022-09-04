import { HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bar-look',
  templateUrl: './bar-look.component.html',
  styleUrls: ['./bar-look.component.css']
})
export class BarLookComponent implements OnInit, DoCheck {

    constructor(private auth:AuthService, private userS:UserService, private productsS:ProductsService, private router:Router){}
  
    ngOnInit(): void {
      console.log(this.loggedIn);
      this.isLogged();
      if(this.loggedIn) this.getUser();
    }
    
    ngDoCheck(): void {
      this.isLogged();
    }

    @Output() data = new EventEmitter<string>();
  
    user:any;
    loggedIn = false;
    seeUserCard = false;
    query:string = '';

    sendMessage(){
      this.data.emit(this.query)
    }
  
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
  }

