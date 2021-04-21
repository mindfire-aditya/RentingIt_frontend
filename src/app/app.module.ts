import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { CategoryItemComponent } from './product-categories/category-item/category-item.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RentComponent } from './rent/rent.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/interceptor/token-interceptor/token-interceptor.service';
import { AuthGuard } from './services/AuthGuard/auth.guard';
import { NavbarLoggedInComponent } from './navbar-logged-in/navbar-logged-in.component';

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
    NavbarLoggedInComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
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
