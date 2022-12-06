import { TestBed } from '@angular/core/testing';

import { EntidadeDaoService } from './entidade-dao.service';

describe('EntidadeDaoService', () => {
  let service: EntidadeDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadeDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
