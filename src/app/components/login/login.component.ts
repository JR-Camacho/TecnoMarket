import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.user = new User();
    console.log(this.userLoged)
  }

  user:User;
  userLoged:any;
  loggedIn = false;

  isLogged(){
    this.auth.isLogged();
    this.loggedIn = this.auth.loggedIn;
  }

  login(){
    this.auth.login(this.user).subscribe(res => {
      console.log(res)
      this.userLoged = Object.values(res);
      console.log(this.userLoged);
      sessionStorage.setItem('password', this.user.password);
      sessionStorage.setItem('token', this.userLoged[1])
      sessionStorage.setItem('id', this.userLoged[3].id);
      this.isLogged();
      this.router.navigate(['/products']);
    },error => console.log(error));
  }
}
