import { TestBed } from '@angular/core/testing';

import { FeriadoDaoService } from './feriado-dao.service';

describe('FeriadoDaoService', () => {
  let service: FeriadoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeriadoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
