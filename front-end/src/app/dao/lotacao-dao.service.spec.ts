import { TestBed } from '@angular/core/testing';

import { LotacaoDaoService } from './lotacao-dao.service';

describe('LotacaoDaoService', () => {
  let service: LotacaoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotacaoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
