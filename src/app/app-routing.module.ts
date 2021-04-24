import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterComponent } from './register/register.component';
import { RentComponent } from './rent/rent.component';
import { AuthGuard } from './services/AuthGuard/auth.guard';
import { AllCategoriesResolver } from './services/resolver/categoriesResolver/all-categories.resolver';
import { ProductsResolver } from './services/resolver/productsResolver/products.resolver';

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
        resolve: { allCategories: AllCategoriesResolver },
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
  {
    path: 'user',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'my-products',
        resolve: { products: ProductsResolver },
        children: [
          {
            path: '',
            component: MyProductsComponent,
          },
          {
            path: 'product-details',
            component: ProductDetailsComponent,
          },
          {
            path: 'edit',
            component: ProductDetailsComponent,
          },
          {
            path: 'remove',
            component: ProductDetailsComponent,
          },
        ],
      },
      {
        path: 'my-orders',
        children: [
          {
            path: '',
            component: MyOrdersComponent,
          },
          {
            path: 'order/order-details',
            component: OrderDetailsComponent,
          },
        ],
      },
      {
        path: 'my-profile',
        children: [
          {
            path: '',
            component: ProfilePageComponent,
          },
          {
            path: 'edit',
            component: EditProfileComponent,
          },
        ],
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'add-product',
        component: AddEditProductComponent,
      },
      {
        path: 'edit-product',
        component: AddEditProductComponent,
      },
      {
        path: 'rent',
        component: RentComponent,
      },
      {
        path: 'logout',
        redirectTo: '/home',
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
