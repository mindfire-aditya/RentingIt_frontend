import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataTransferService } from '../services/DataTransfer/data-transfer.service';
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
    private productService:ProductService,
  ) {}

  
    order_item:any;
    pro_id:any;
   
    public product_item = {
          actualName :"",
          assetDescription : "",
          assetStatus:"",
          categoryId:0,
          id :0,
          imageUrl:"",
          maintainanceTime: "",
          ownerId: 0,
          pinCode: 123313,
          pricePerDay: 2000,
          pricePerHour: 50,
          pricePerMonth: 10000,
          pricePerWeek: 5000,
          productName: "",
          units: 2
        };
    

    private subscription1: Subscription = new Subscription();
    private subscription2: Subscription = new Subscription();

    ngOnInit(): void {

      let orderId = this.activatedRoute.snapshot.paramMap.get("orderId");
     
    
  }
  getDetails(id:number){
    this.productService.getProductById(id).subscribe(
      (d_data)=>{

        this.product_item.actualName = d_data.actualName;
        this.name12 = d_data.actualName;
        this.product_item.assetDescription = d_data.assetDescription;
        console.log(this.product_item.actualName);
        console.log(this.product_item.assetDescription);
      },
      (error)=>{console.log(error);}
    );
  }

    // ngDestroy(){
    //   this.subscription1.unsubscribe();
    //   this.subscription2.unsubscribe();
    // }
      

  }
