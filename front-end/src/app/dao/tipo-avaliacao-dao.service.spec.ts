import { TestBed } from '@angular/core/testing';

import { TipoAvaliacaoDaoService } from './tipo-avaliacao-dao.service';

describe('TipoAvaliacaoDaoService', () => {
  let service: TipoAvaliacaoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAvaliacaoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
