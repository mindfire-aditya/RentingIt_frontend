import { Component, OnInit } from '@angular/core';
import { AddEditProduct } from '../models/add-edit-product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  addEditProduct = new AddEditProduct(
    '',
    '',
    1,
    1,
    1,
    1,
    1,
    '',
    '',
    '',
    '',
    '',
    1
  );

  addProduct() {}

  constructor() {}

  ngOnInit(): void {}
}
