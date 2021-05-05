import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private userDetailService: UserDetailService,
    private router: Router
  ) {}

  product_item: any;
  pickup_address: any;
  ownerId: any;

  private subscription1: Subscription = new Subscription();
  private subscription2: Subscription = new Subscription();

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
          },
          (error) => console.log(error)
        );
    } else {
      console.log('Id: ', id);
    }
  }

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

  onClickGoToPlaceOrder(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.router.navigate(['user/place-order/', id]);
    //this.router.navigateByUrl('user/place-order/'+(id));

  }

  // onClick() {
  //   let id = this.activatedRoute.snapshot.paramMap.get('id');

  //   //this.router.navigate(['user/place-order/', id]);
  //   this.router.navigateByUrl('user/place-order/'+(id));
  // }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
