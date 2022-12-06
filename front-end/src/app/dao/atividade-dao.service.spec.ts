import { TestBed } from '@angular/core/testing';

import { AtividadeDaoService } from './atividade-dao.service';

describe('AtividadeDaoService', () => {
  let service: AtividadeDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtividadeDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
