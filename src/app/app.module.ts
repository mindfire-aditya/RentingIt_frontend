import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { CategoryItemComponent } from './product-categories/category-item/category-item.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RentComponent } from './components/rent/rent.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/interceptor/token-interceptor/token-interceptor.service';
import { AuthGuard } from './services/AuthGuard/auth.guard';
import { NavbarLoggedinComponent } from './components/navbar-loggedin/navbar-loggedin.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductSubCategoryComponent } from './components/product-sub-category/product-sub-category.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MyProductsOnRentComponent } from './components/my-products-on-rent/my-products-on-rent.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductDetailsComponent,
    SearchBarComponent,
    ProductCategoriesComponent,
    CategoryItemComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ProfilePageComponent,
    MyOrdersComponent,
    MyProductsComponent,
    AddEditProductComponent,
    EditProfileComponent,
    ErrorPageComponent,
    RentComponent,
    OrderItemComponent,
    OrderDetailsComponent,
    NavbarLoggedinComponent,
    PlaceOrderComponent,
    ProductSubCategoryComponent,
    LoadingSpinnerComponent,
    MyProductsOnRentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
