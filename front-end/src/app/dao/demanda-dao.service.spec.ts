import { TestBed } from '@angular/core/testing';

import { DemandaDaoService } from './demanda-dao.service';

describe('DemandaDaoService', () => {
  let service: DemandaDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandaDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
