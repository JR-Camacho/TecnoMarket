import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }


  getProducts(query:string = ''){
    return this.http.get('http://127.0.0.1:8000/api/products', {params: {buscar:query}});
  }

  getMyProducts(headers:any, id:any){
    return this.http.get(`http://127.0.0.1:8000/api/myproducts/${id}`, {headers:headers});
  }

  getProduct(headers:any, id:any){
    return this.http.get(`http://127.0.0.1:8000/api/edit/${id}`, {headers:headers});
  }

  setProduct(headers:any, product:FormData){
    return this.http.post(`http://127.0.0.1:8000/api/create`, product, {headers:headers})
  }

  updateProduct(headers:any, product:FormData){
    return this.http.post(`http://127.0.0.1:8000/api/update`, product, {headers:headers})
  }

  deleteProduct(headers:any, id:any){
    return this.http.delete(`http://127.0.0.1:8000/api/delete/${id}`, {headers:headers});
  }

  showProduct(headers:any, id:any){
    return this.http.get(`http://127.0.0.1:8000/api/show-product/${id}`, {headers:headers});
  }
}
