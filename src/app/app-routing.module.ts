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
import { TestComponent } from './test/test.component';

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
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'categories',
    children: [
      {
        path: 'appliances',
        component: ProductListComponent,
        children: [{ path: ':subcategory', component: ProductListComponent }],
      },
      {
        path: 'bikes',
        component: ProductListComponent,
        children: [
          { path: ':subcategory', component: ProductSubCategoryComponent },
        ],
      },
      {
        path: 'cars',
        component: ProductListComponent,
        children: [
          { path: ':subcategory', component: ProductSubCategoryComponent },
        ],
      },
      {
        path: 'electronics',
        component: ProductListComponent,
        children: [
          { path: ':subcategory', component: ProductSubCategoryComponent },
        ],
      },
      {
        path: 'furnitures',
        component: ProductListComponent,
        children: [
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
