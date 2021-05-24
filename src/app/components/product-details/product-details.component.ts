import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/products/product.service';
import { UserDetailService } from '../../services/userDetail/user-detail.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product_item: Product;
  pickup_address: any;
  ownerId: any;
  userId: number = Number(localStorage.getItem('id'));
  imageBaseUrl =
    'http://localhost:8080/rentingIt/product/resources/download-image/';

  private subscription1: Subscription = new Subscription();
  private subscription2: Subscription = new Subscription();
  public image: any;

  /**
   *
   * @param activatedRoute
   * @param productService
   * @param userDetailService
   * @param router
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userDetailService: UserDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.subscription1 = this.productService
        .getProductById(parseInt(id))
        .subscribe(
          (data) => {
            this.product_item = data;
            this.ownerId = this.product_item.ownerId;
            this.getOwnerInfo(this.ownerId);
            this.product_item.imageUrl =
              this.imageBaseUrl + this.product_item.imageUrl;
          },
          (error) => console.log(error)
        );
    } else {
      console.log('Id: ', id);
    }
  }

  /**
   *
   * @param ownerId
   */
  getOwnerInfo(ownerId: number) {
    if (ownerId) {
      this.subscription2 = this.userDetailService
        .getOwnerDetail(this.ownerId)
        .subscribe(
          (data) => {
            this.pickup_address = data;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  /**
   *
   */
  onClickGoToPlaceOrder() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.router.navigate(['user/place-order/', id]);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
