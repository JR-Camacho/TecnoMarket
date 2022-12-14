import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private productsS:ProductsService, private activeRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    sessionStorage.getItem('token') == null? this.router.navigate(['/login']): this.getProduct();
    this.productForUpdate = new Product();
  }

  id:any;
  product:any;
  photoForUpdate:any;
  productForUpdate:Product;
  errors: any;
  isError: boolean;
  isNull:boolean = false;
  isSending:boolean = false;

  getProduct(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.productsS.getProduct(headers, this.id).subscribe(res => {
      console.log(res)
      this.product = res;
      this.productForUpdate.name = this.product.name;
      this.productForUpdate.description = this.product.description;
      this.productForUpdate.price = this.product.price;
      this.productForUpdate.category = this.product.category;

      if(this.productForUpdate.category == null || this.productForUpdate.category == 'null') this.isNull = true;
    },
    error => console.log(error)
    )
  }

  file(event: any) {
    this.photoForUpdate = event.target.files[0];
    console.log(this.photoForUpdate);
  }

  updateProduct(){
    this.isSending = true;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
      try {
        const data = new FormData();
        data.append('id', this.id);
        data.append('name', this.productForUpdate.name);
        data.append('description', this.productForUpdate.description);
        data.append('price', this.productForUpdate.price);
        if(this.product.category != null) data.append('category', this.product.category);
        if(this.photoForUpdate){
          data.append('front_url', this.photoForUpdate);
        } 
        this.productsS.updateProduct(headers, data).subscribe(res => {
          this.isSending = false;
          console.log(res)
          this.router.navigate(['/products']);
        },error => {
          this.isSending = false;
          console.log(error)
          this.errors = error.error.errors;
          this.isError = true;
          console.log(this.errors);
        })
      } catch (error) {
        console.log(error)
      }
  }

}
