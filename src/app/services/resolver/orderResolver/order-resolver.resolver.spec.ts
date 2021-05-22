import { TestBed } from '@angular/core/testing';

import { OrderResolverResolver } from './order-resolver.resolver';

describe('OrderResolverResolver', () => {
  let resolver: OrderResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
