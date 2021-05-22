import { TestBed } from '@angular/core/testing';

import { AllCategoriesResolver } from './all-categories.resolver';

describe('AllCategoriesResolver', () => {
  let resolver: AllCategoriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllCategoriesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
