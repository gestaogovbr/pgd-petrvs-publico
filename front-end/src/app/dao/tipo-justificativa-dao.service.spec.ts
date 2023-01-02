import { TestBed } from '@angular/core/testing';

import { TipoJustificativaDaoService } from './tipo-justificativa-dao.service';

describe('TipoJustificativaDaoService', () => {
  let service: TipoJustificativaDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoJustificativaDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
