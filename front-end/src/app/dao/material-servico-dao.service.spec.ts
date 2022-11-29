import { TestBed } from '@angular/core/testing';

import { MaterialServicoDaoService } from './material-servico-dao.service';

describe('MaterialServicoDaoService', () => {
  let service: MaterialServicoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialServicoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
