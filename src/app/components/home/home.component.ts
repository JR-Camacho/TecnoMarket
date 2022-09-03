import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private productsS:ProductsService) { }
 
  ngOnInit(): void {
    this.getProducts();
  }

  products:any;

    getProducts(){
    this.productsS.getProducts().subscribe(res => {
      this.products = Object.values(res);
      console.log(this.products);
    })
  }


}
