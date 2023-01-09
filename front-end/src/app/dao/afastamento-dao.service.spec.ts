import { TestBed } from '@angular/core/testing';

import { AfastamentoDaoService } from './afastamento-dao.service';

describe('AfastamentoDaoService', () => {
  let service: AfastamentoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfastamentoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
