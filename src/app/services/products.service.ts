import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }


  getProducts(query:string = ''){
    return this.http.get('https://apitecnostore.herokuapp.com/api/products', {params: {buscar:query}});
  }

  getMyProducts(headers:any, id:any){
    return this.http.get(`https://apitecnostore.herokuapp.com/api/myproducts/${id}`, {headers:headers});
  }

  getProduct(headers:any, id:any){
    return this.http.get(`https://apitecnostore.herokuapp.com/api/edit/${id}`, {headers:headers});
  }

  setProduct(headers:any, product:FormData){
    return this.http.post(`https://apitecnostore.herokuapp.com/api/create`, product, {headers:headers})
  }

  updateProduct(headers:any, product:FormData){
    return this.http.post(`https://apitecnostore.herokuapp.com/api/update`, product, {headers:headers})
  }

  deleteProduct(headers:any, id:any){
    return this.http.delete(`https://apitecnostore.herokuapp.com/api/delete/${id}`, {headers:headers});
  }

  showProduct(headers:any, id:any){
    return this.http.get(`https://apitecnostore.herokuapp.com/api/show-product/${id}`, {headers:headers});
  }
}
