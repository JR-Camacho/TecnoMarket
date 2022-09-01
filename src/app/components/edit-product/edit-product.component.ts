import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsComponent } from '../products/products.component';

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
  }

  id:any;
  product:any;

  getProduct(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.productsS.getProduct(headers, this.id).subscribe(res => {
      console.log(res)
      this.product = res;
    },
    error => console.log(error)
    )
  }

  updateProduct(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.productsS.updateProduct(headers, this.product).subscribe(res => {
      console.log(res)
      this.router.navigate(['/products']);
    },error => console.log(error))
  }

}
