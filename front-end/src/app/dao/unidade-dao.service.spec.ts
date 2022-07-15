import { TestBed } from '@angular/core/testing';

import { UnidadeDaoService } from './unidade-dao.service';

describe('UnidadeDaoService', () => {
  let service: UnidadeDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadeDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
