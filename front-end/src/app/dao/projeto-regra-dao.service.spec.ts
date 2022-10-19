import { TestBed } from '@angular/core/testing';

import { ProjetoRegraDaoService } from './projeto-regra-dao.service';

describe('ProjetoRegraDaoService', () => {
  let service: ProjetoRegraDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoRegraDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
