import { TestBed } from '@angular/core/testing';

import { ProjetoRecursoDaoService } from './projeto-recurso-dao.service';

describe('ProjetoRecursoDaoService', () => {
  let service: ProjetoRecursoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoRecursoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
