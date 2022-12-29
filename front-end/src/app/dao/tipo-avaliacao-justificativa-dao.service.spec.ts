import { TestBed } from '@angular/core/testing';

import { TipoAvaliacaoJustificativaDaoService } from './tipo-avaliacao-justificativa-dao.service';

describe('TipoAvaliacaoJustificativaDaoService', () => {
  let service: TipoAvaliacaoJustificativaDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAvaliacaoJustificativaDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
