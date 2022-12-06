import { TestBed } from '@angular/core/testing';

import { ProjetoDaoService } from './projeto-dao.service';

describe('ProjetoDaoService', () => {
  let service: ProjetoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
