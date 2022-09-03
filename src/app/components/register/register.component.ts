import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  errors:any;
  user:User;
  isError:boolean = false;

  register(){
    this.auth.register(this.user).subscribe(res => {
      console.log(res);
      this.router.navigate(['/login']);
    },error => {
      console.log(error)
      this.errors = error.error.errors;
      this.isError = true;
      console.log(this.errors);
    })
  }
}
