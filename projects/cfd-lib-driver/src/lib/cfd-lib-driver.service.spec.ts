import { TestBed } from '@angular/core/testing';

import { CfdLibDriverService } from './cfd-lib-driver.service';

describe('CfdLibDriverService', () => {
  let service: CfdLibDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfdLibDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
