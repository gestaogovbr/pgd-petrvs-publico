import { TestBed } from '@angular/core/testing';

import { TipoProcessoDaoService } from './tipo-processo-dao.service';

describe('TipoProcessoDaoService', () => {
  let service: TipoProcessoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProcessoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
