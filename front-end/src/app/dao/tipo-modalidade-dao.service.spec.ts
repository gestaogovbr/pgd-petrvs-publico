import { TestBed } from '@angular/core/testing';

import { TipoModalidadeDaoService } from './tipo-modalidade-dao.service';

describe('TipoModalidadeDaoService', () => {
  let service: TipoModalidadeDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoModalidadeDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
