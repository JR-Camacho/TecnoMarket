import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.user = new User();
  }

  user:User;

  register(){
    this.auth.register(this.user).subscribe(res => 
      console.log(res),
      error => console.log(error))
  }
}
