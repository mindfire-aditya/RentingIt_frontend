import { TestBed } from '@angular/core/testing';

import { UserInfoStoreService } from './user-info-store.service';

describe('UserInfoStoreService', () => {
  let service: UserInfoStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
