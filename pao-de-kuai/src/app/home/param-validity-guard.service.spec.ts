import { TestBed } from '@angular/core/testing';

import { ParamValidityGuardService } from './param-validity-guard.service';

describe('ParamValidityGuardService', () => {
  let service: ParamValidityGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamValidityGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
