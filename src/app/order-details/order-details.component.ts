import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyOrder } from '../models/my-order';
import { Product } from '../models/product';
import { DataTransferService } from '../services/DataTransfer/data-transfer.service';
import { MyOrdersService } from '../services/my-orders/my-orders.service';
import { PlaceOrderService } from '../services/placeOrder/place-order.service';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  name12!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private myOrdersService: MyOrdersService
  ) {}

  order_item: MyOrder;
  orderedProduct: Product;

  imageBaseUrl =
    'http://localhost:8080/rentingIt/product/resources/download-image/';

  public product_item: Product;

  private subscription1: Subscription;
  private subscription2: Subscription;

  ngOnInit(): void {
    this.subscription1 = new Subscription();
    this.subscription2 = new Subscription();

    let orderId = Number(this.activatedRoute.snapshot.paramMap.get('orderId'));

    this.myOrdersService.getOrderById(orderId).subscribe((data) => {
      this.order_item = data;

      this.productService.getProductById(data.productId).subscribe((data) => {
        this.orderedProduct = data;
        this.orderedProduct.imageUrl =
          this.imageBaseUrl + this.orderedProduct.imageUrl;
      });
    });
  }

  ngDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
