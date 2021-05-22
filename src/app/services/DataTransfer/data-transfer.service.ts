import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }
  orderSub :Subject<any> = new Subject();
  orderItem = this.orderSub.asObservable();

  
}
