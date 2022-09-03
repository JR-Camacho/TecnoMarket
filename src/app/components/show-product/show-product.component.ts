import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  constructor(private productsS:ProductsService, private userS:UserService, private routeActive:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.routeActive.snapshot.params['id'];
    this.getProduct();
  }

  id:any;
  product:any;
  user:any;

  getProduct(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.productsS.showProduct(headers, this.id).subscribe(res => {
      console.log(res);
      this.product = res;
      this.getUser(this.product.user_id);
    }, err => console.log(err));
  }

  getUser(id:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.userS.showUser(headers, id).subscribe(res => {
      console.log(res);
      this.user = res;
    })
  }

}
