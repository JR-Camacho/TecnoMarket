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

  product:Product;
  headers:any = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  });

  setNewProduct(){
    this.productS.setProduct(this.headers, this.product).subscribe(res => {
      console.log(res);
      this.router.navigate(['/products']);
    },error  => console.log(error)
    )
  }

}
