import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser'; 
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
  private sanitizer!: DomSanitizer; 
  public image : any; 
  private readonly imageType : string = 'data:image/PNG;base64,'; 


  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    
    if (id !== null) {
      this.subscription1 = this.productService
        .getProductById(parseInt(id))
        .subscribe(
          (data) => {
            this.product_item = data;
            console.log(this.product_item);
            this.ownerId = this.product_item.ownerId;
            this.getOwnerInfo(this.ownerId);
            this.getImage();
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

   
  
  getImage(){ 
         this.productService.getImage(this.product_item.actualName+".jpg") 
             .subscribe((data :any ) => { 
              this.image = data;
              this.image = 'data:image/png;base64,' + this.image.content;

              //console.log("image",this.image);
              //this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content); 
  })} 
  
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
