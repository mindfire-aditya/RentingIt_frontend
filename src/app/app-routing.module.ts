import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'categories',
    children: [
      {
        path: 'appliances',
        component: ProductListComponent,
      },
      {
        path: 'bikes',
        component: ProductListComponent,
      },
      {
        path: 'cars',
        component: ProductListComponent,
      },
      {
        path: 'electronics',
        component: ProductListComponent,
      },
      {
        path: 'furnitures',
        component: ProductListComponent,
      },
      {
        path: 'machines',
        component: ProductListComponent,
      },
      {
        path: 'all',
        component: ProductCategoriesComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'product',
    children: [
      {
        path: 'product-details',
        component: ProductDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
