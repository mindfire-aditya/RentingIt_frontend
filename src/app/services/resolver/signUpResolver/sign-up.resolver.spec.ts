import { TestBed } from '@angular/core/testing';

import { SignUpResolver } from './sign-up.resolver';

describe('SignUpResolver', () => {
  let resolver: SignUpResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SignUpResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
