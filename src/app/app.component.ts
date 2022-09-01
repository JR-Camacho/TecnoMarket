import { HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  constructor(private auth:AuthService, private userS:UserService,private router:Router){}

  ngOnInit(): void {
    console.log(this.loggedIn);
    this.isLogged();
  }
  
  ngDoCheck(): void {
    this.isLogged();
  }

  loggedIn = false;
  seeUserCard = false;
  
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
  
}