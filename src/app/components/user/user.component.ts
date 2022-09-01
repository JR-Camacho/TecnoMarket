import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private userS: UserService, private router: Router) {}

  ngOnInit(): void {
    sessionStorage.getItem('token') == null
      ? this.router.navigate(['/login'])
      : this.getMyProfile();
    this.userForUpdate = new User();
  }

  user: any;
  userIsEdit = false;
  photoForUpdate: any;

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
  }

  updateUser() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    try {
      const data = new FormData();
      data.append('id', this.userForUpdate.id);
      data.append('name', this.userForUpdate.name);
      data.append('surnames', this.userForUpdate.surnames);
      data.append('description', this.userForUpdate.description);
      data.append('date_birth', this.userForUpdate.date_birth);
      data.append('password', this.userForUpdate.password);
      data.append('profile_url', this.photoForUpdate);
      this.userS.updateUser(headers, data).subscribe(
        (res) => {
          console.log(res);
          this.getMyProfile();
          this.showForm();
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

  // show() {
  //   const data = new FormData();
  //   data.append('id', '1');
  //   console.log('id' + this.user.id);
  //   data.append('name', this.userForUpdate.name);
  //   console.log(this.userForUpdate.name);
  //   data.append('surnames', this.userForUpdate.surnames);
  //   data.append('description', this.userForUpdate.description);
  //   data.append('date_birth', this.userForUpdate.date_birth);
  //   data.append('password', this.userForUpdate.password);
  //   data.append('profile_url', this.photoForUpdate);
  //   console.log(this.photoForUpdate);
  //   console.log(data);
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //   });
  //   this.userS.updateUser(headers, data).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.getMyProfile();
  //       this.showForm();
  //     },
  //     (error) => console.log(error)
  //   );
  // }
}
