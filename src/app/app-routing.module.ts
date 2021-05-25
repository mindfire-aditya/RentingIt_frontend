import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyProductsOnRentComponent } from './my-products-on-rent/my-products-on-rent.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductSubCategoryComponent } from './product-sub-category/product-sub-category.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterComponent } from './register/register.component';
import { RentComponent } from './rent/rent.component';
import { AuthGuard } from './services/AuthGuard/auth.guard';
import { AllCategoriesResolver } from './services/resolver/categoriesResolver/all-categories.resolver';
import { OrderDetailsResolver } from './services/resolver/orderDetailsResolver/order-details.resolver';
import { OrderResolverResolver } from './services/resolver/orderResolver/order-resolver.resolver';
import { ProductsResolver } from './services/resolver/productsResolver/products.resolver';
import { UserDetailResolver } from './services/resolver/userDetailResolver/user-detail.resolver';

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
        children: [
          { path: '', component: ProductListComponent },
          { path: ':subcategory', component: ProductSubCategoryComponent },
        ],
      },
      {
        path: 'bikes',

        children: [
          { path: '', component: ProductListComponent },
          { path: ':subcategory', component: ProductSubCategoryComponent },
        ],
      },
      {
        path: 'cars',

        children: [
          { path: '', component: ProductListComponent },
          { path: ':subcategory', component: ProductSubCategoryComponent },
        ],
      },
      {
        path: 'electronics',

        children: [
          { path: '', component: ProductListComponent },
          { path: ':subcategory', component: ProductSubCategoryComponent },
        ],
      },
      {
        path: 'furnitures',

        children: [
          { path: '', component: ProductListComponent },
          { path: ':subcategory', component: ProductSubCategoryComponent },
        ],
      },
      {
        path: 'machines',
        component: ProductListComponent,
        children: [
          { path: ':subcategory', component: ProductSubCategoryComponent },
        ],
      },
      {
        path: 'others',
        component: ProductListComponent,
        children: [{ path: ':subcategory', component: ProductListComponent }],
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
    children: [
      {
        path: 'my-products',
        children: [
          {
            path: '',
            component: MyProductsComponent,
            resolve: { products: ProductsResolver },
          },
          {
            path: 'product-details/:id',
            component: ProductDetailsComponent,
          },
          {
            path: 'edit/:productId',
            component: RentComponent,
          },
          {
            path: 'remove',
            component: ProductDetailsComponent,
          },
          {
            path: 'rent-history/:productId',
            component: MyProductsOnRentComponent,
          },
        ],
      },
      {
        path: 'my-orders',
        children: [
          {
            path: '',
            component: MyOrdersComponent,
            resolve: { orders: OrderResolverResolver },
          },
          {
            path: 'order-details/:orderId',
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
            resolve: { userDetail: UserDetailResolver },
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
        path: 'rent',
        component: RentComponent,
      },
      {
        path: 'place-order/:productId',
        component: PlaceOrderComponent,
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
