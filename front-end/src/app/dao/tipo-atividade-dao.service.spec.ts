import { TestBed } from '@angular/core/testing';

import { TipoAtividadeDaoService } from './tipo-atividade-dao.service';

describe('TipoAtividadeDaoService', () => {
  let service: TipoAtividadeDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAtividadeDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
