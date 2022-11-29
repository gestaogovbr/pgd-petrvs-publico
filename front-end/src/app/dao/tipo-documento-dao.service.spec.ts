import { TestBed } from '@angular/core/testing';

import { TipoDocumentoDaoService } from './tipo-documento-dao.service';

describe('TipoDocumentoDaoService', () => {
  let service: TipoDocumentoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDocumentoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
