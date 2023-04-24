import { TestBed } from '@angular/core/testing';

import { ListenerAllPagesService } from './listener-all-pages.service';

describe('ListenerAllPagesService', () => {
  let service: ListenerAllPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListenerAllPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
