import { TestBed } from '@angular/core/testing';

import { TipoCapacidadeDaoService } from './tipo-capacidade-dao.service';

describe('TipoCapacidadeDaoService', () => {
  let service: TipoCapacidadeDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCapacidadeDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
