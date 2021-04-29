import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/products/product.service';
import { UserDetailService } from '../services/userDetail/user-detail.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userDetailService: UserDetailService
  ) {}

  product_item: any;
  pickup_address: any;
  ownerId: any;

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.productService.getProductById(parseInt(id)).subscribe(
        (data) => {
          this.product_item = data;
          this.ownerId = this.product_item.ownerId;
          this.getOwnerInfo(this.ownerId);
        },
        (error) => console.log(error)
      );
    } else {
      console.log('Id: ', id);
    }
  }

  getOwnerInfo(ownerId: number) {
    if (ownerId) {
      this.userDetailService.getOwnerDetail(this.ownerId).subscribe(
        (data) => {
          this.pickup_address = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnDestroy() {}
}
