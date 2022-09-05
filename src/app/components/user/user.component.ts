import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  sanitizer: any;
  
  constructor(private userS: UserService, private router: Router) {}

  ngOnInit(): void {
    sessionStorage.getItem('token') == null
      ? this.router.navigate(['/login'])
      : this.getMyProfile();
    this.userForUpdate = new User();
  }

  user: any;
  userIsEdit = false;
  photoForUpdate:any;
  photoForPreview:any;
  modalIsShow:boolean = false;
  errors: any;
  isError: boolean = false;
  isSending:boolean = false;

  userForUpdate: User;

  getMyProfile() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    this.userS.getUser(headers).subscribe(
      (res) => {
        console.log(res);
        this.user = res;
        this.userForUpdate.id = this.user.id;
        this.userForUpdate.name = this.user.name;
        this.userForUpdate.surnames = this.user.surnames;
        this.userForUpdate.description = this.user.description;
        this.userForUpdate.date_birth = this.user.date_birth;
        this.userForUpdate.profile_url = this.user.profile_url;
        this.userForUpdate.password = sessionStorage.getItem('password');
        console.log(this.userForUpdate.id);
      },
      (err) => console.log(err)
    );
  }

  showForm() {
    this.userIsEdit ? (this.userIsEdit = false) : (this.userIsEdit = true);
    this.getMyProfile();
  }

  file(event: any) {
    this.photoForUpdate = event.target.files[0];
    console.log(this.photoForUpdate);
    this.getBase64(this.photoForUpdate);
  }

  getBase64(image:any){
    try {
      let imagen = image;
      console.log(imagen);
      let reader = new FileReader();
      reader.readAsDataURL(imagen);
      reader.onloadend = () => {
        console.log(reader.result);
        this.photoForPreview = reader.result;
      } 
    } catch (error) {
      console.log(error);
    }
  }

  updateUser() {
    this.isSending = true;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    try {
      const data = new FormData();
      data.append('id', this.userForUpdate.id);
      data.append('name', this.userForUpdate.name);
      if(this.userForUpdate.surnames != null) data.append('surnames', this.userForUpdate.surnames);
      if(this.userForUpdate.description != null) data.append('description', this.userForUpdate.description);
      if(this.userForUpdate.date_birth) data.append('date_birth', this.userForUpdate.date_birth);
      data.append('password', this.userForUpdate.password);
      if(this.photoForUpdate) data.append('profile_url', this.photoForUpdate);

      this.userS.updateUser(headers, data).subscribe(
        (res) => {
          console.log(res);
          this.getMyProfile();
          this.isSending = false;
          this.showForm();
        },error => {
          console.log(error)
          this.isSending = false;
          this.errors = error.error.errors;
          this.isError = true;
          console.log(this.errors)
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  deleteUser() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    this.userS.deleteUser(headers, this.user.id).subscribe(
      (res) => {
        console.log(res);
        sessionStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      (error) => console.log(error)
    );
  }
}
