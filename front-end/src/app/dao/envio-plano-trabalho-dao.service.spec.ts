import { TestBed } from '@angular/core/testing';

import { EnvioPlanoTrabalhoDaoService } from './envio-plano-trabalho-dao.service';

describe('EnvioPlanoTrabalhoDaoService', () => {
  let service: EnvioPlanoTrabalhoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvioPlanoTrabalhoDaoService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('usa a collection EnvioPlanoTrabalho', () => {
    expect(service.collection).toBe('EnvioPlanoTrabalho');
  });
});
