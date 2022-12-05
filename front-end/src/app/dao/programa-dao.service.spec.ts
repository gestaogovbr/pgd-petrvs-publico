import { TestBed } from '@angular/core/testing';

import { ProgramaDaoService } from './programa-dao.service';

describe('ProgramaDaoService', () => {
  let service: ProgramaDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramaDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
