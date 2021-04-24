import { TestBed } from '@angular/core/testing';

import { ResponseDataResolver } from './response-data.resolver';

describe('ResponseDataResolver', () => {
  let resolver: ResponseDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResponseDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
