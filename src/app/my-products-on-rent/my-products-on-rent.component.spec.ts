import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductsOnRentComponent } from './my-products-on-rent.component';

describe('MyProductsOnRentComponent', () => {
  let component: MyProductsOnRentComponent;
  let fixture: ComponentFixture<MyProductsOnRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProductsOnRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductsOnRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
