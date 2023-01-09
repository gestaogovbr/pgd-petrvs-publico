import { TestBed } from '@angular/core/testing';

import { CapacidadeDaoService } from './capacidade-dao.service';

describe('CapacidadeDaoService', () => {
  let service: CapacidadeDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacidadeDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
