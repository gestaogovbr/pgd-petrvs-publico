import { TestBed } from '@angular/core/testing';

import { ProjetoAlocacaoDaoService } from './projeto-alocacao-dao.service';

describe('ProjetoAlocacaoDaoService', () => {
  let service: ProjetoAlocacaoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoAlocacaoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
