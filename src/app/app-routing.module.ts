import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { MyProductsOnRentComponent } from './components/my-products-on-rent/my-products-on-rent.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSubCategoryComponent } from './components/product-sub-category/product-sub-category.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegisterComponent } from './components/register/register.component';
import { RentComponent } from './components/rent/rent.component';
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
        path: 'add-product',
        component: AddEditProductComponent,
      },
      {
        path: 'edit-product',
        component: AddEditProductComponent,
      },
      {
        path: 'place-order/:productId',
        component: PlaceOrderComponent,
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
