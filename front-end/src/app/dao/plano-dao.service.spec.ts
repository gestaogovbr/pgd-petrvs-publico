import { TestBed } from '@angular/core/testing';

import { PlanoDaoService } from './plano-dao.service';

describe('PlanoDaoService', () => {
  let service: PlanoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
