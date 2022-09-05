import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(private productS:ProductsService, private router:Router) { }

  ngOnInit(): void {
    this.product = new Product();
    sessionStorage.getItem('token') == null? this.router.navigate(['/login']):  this.product.user_id = sessionStorage.getItem('id');
  }

  photo:any;
  errors: any;
  isError: boolean;
  isSending:boolean = false;

  file(event: any) {
    this.photo = event.target.files[0];
    console.log(this.photo);
  }

  product:Product;

  setNewProduct(){
    this.isSending = true;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });

    try {
      const data = new FormData();
      data.append('name', this.product.name);
      data.append('description', this.product.description);
      data.append('price', this.product.price);
      if(this.product.category != null) data.append('category', this.product.category);
      data.append('user_id', this.product.user_id);
      if(this.photo) data.append('front_url', this.photo);
      
      this.productS.setProduct(headers, data).subscribe(res => {
        this.isSending = false;
        console.log(res);
        this.router.navigate(['/products']);
      },error => {
        this.isSending = false;
        console.log(error)
        this.errors = error.error.errors;
        this.isError = true;
        console.log(this.errors);
      })
    } catch (error){

    }
  }

}
