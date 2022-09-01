import { HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productsS:ProductsService,private router:Router) { }
  ngOnInit(): void {
    sessionStorage.getItem('token') == null? this.router.navigate(['/login']): this.getMyProducts();
    // this.getImage();
  }

  myProducts:any = [];
  modalIsShow:boolean = false;
  
  getMyProducts(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.productsS.getMyProducts(headers, sessionStorage.getItem('id')).subscribe(res => {
      this.myProducts = Object.values(res);
      console.log(this.myProducts);
    })
  }

  showModal(id:any){
    sessionStorage.setItem('article_id', id);
    this.modalIsShow = true;
  }

  deleteProduct(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.productsS.deleteProduct(headers, sessionStorage.getItem('article_id')).subscribe(res => {
      console.log(res);
      this.modalIsShow = false;
      this.getMyProducts();
    }, error => console.log(error));
  }

  // getImage(){
  //   this.productsS.getImage().subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     error => console.log(error)
  //   )
  // }
}
