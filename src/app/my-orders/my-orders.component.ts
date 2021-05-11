/**
 * @author Aditya Sahu
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ProductDetailsService } from '../services/productDetails/product-details.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductDetailsService
  ) {}

  orderedProducts: any;
  productList: Array<Object> = [];

  private subscription1: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription1 = this.subscription1 = this.activatedRoute.data.subscribe(
      (data) => {
        this.orderedProducts = data.orders;
        console.log(data.orders);
      },
      (error) => {
        alert('Error fetching orders');
      }
    );

    this.getProductsFromIds(this.orderedProducts);

  }
  

  getProductsFromIds(orders: []){
    const productIds = orders.map(({ productId }) => productId);
    console.log(productIds);
    
    for(let id in productIds){
      console.log(productIds[id]);

      this.productService.getProductDetailById(Number(productIds[id])).subscribe(data=>{
        this.productList.push(data);
      })
    }

    console.log(this.productList);
    

  }

  sendDetails(item: any) {
    this.router.navigate(['user/my-orders/order-details', item.productId]);
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }
}
