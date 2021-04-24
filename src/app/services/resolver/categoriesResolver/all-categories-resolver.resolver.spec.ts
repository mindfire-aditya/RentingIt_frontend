import { TestBed } from '@angular/core/testing';

import { AllCategoriesResolverResolver } from './all-categories-resolver.resolver';

describe('AllCategoriesResolverResolver', () => {
  let resolver: AllCategoriesResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllCategoriesResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
