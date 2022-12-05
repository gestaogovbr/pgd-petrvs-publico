import { TestBed } from '@angular/core/testing';

import { ProjetoTarefaDaoService } from './projeto-tarefa-dao.service';

describe('ProjetoTarefaDaoService', () => {
  let service: ProjetoTarefaDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoTarefaDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
