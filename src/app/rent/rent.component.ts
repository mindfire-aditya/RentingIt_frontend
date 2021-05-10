/**
 * @author Aditya Sahu
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDetailsService } from '../services/productDetails/product-details.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  productDetails = {
    productName: '',
    actualName: '',
    maintainanceTime: '1',
    assetStatus: '',
    assetDescription: '',
    imageUrl: 'null',
    units: 1,
    pricePerHour: 0,
    pricePerDay: 0,
    pricePerWeek: 0,
    pricePerMonth: 0,
    pincode: 0,
    categoryId: 8, // static will be updated late dynamically
    ownerId: localStorage.getItem("id"),
  };

  private subscription1: Subscription = new Subscription();

  constructor(private registerProductsService: ProductDetailsService) {}
  ngOnInit(): void {}

  //function for registering preoducts
  registerProducts() {
    //console.log("Form is submited!!");
    if (
      this.productDetails.productName != '' &&
      this.productDetails.actualName != '' &&
      this.productDetails.assetStatus != ''
    ) {
      //we have to submit the form

      console.log('Here form will be submited');
      this.subscription1 = this.registerProductsService
        .addProducts(this.productDetails)
        .subscribe(
          (response: any) => {
            //success
            console.log(response);
            window.location.href = '/user/my-products';
          },
          (error: any) => {
            //error
            alert('Product Registration Unsuccessful');
          }
        );
    } else {
      console.log('Fields are empty !!');
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
