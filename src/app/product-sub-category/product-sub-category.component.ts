import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-sub-category',
  templateUrl: './product-sub-category.component.html',
  styleUrls: ['./product-sub-category.component.css'],
})
export class ProductSubCategoryComponent implements OnInit {
  subCategoryId: number;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
