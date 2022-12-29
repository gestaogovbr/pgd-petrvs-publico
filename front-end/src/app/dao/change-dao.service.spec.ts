import { TestBed } from '@angular/core/testing';

import { ChangeDaoService } from './change-dao.service';

describe('ChangeDaoService', () => {
  let service: ChangeDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
