import { TestBed } from '@angular/core/testing';

import { TipoMotivoAfastamentoDaoService } from './tipo-motivo-afastamento-dao.service';

describe('TipoMotivoAfastamentoDaoService', () => {
  let service: TipoMotivoAfastamentoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMotivoAfastamentoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
