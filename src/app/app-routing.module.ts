import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowProductComponent } from './components/show-product/show-product.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'products', component:ProductsComponent
  },
  {
    path:'new-product', component:NewProductComponent
  },
  {
    path:'edit-product/:id', component:EditProductComponent
  },
  {
    path:'my-profile', component:UserComponent
  },
  {
    path:'show-product/:id', component:ShowProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
