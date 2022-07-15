import { TestBed } from '@angular/core/testing';

import { CidadeDaoService } from './cidade-dao.service';

describe('CidadeDaoService', () => {
  let service: CidadeDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CidadeDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
