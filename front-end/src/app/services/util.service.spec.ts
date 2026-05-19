import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';
import { provideNgxMask } from 'ngx-mask';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        UtilService,
        provideNgxMask()
      ]
    });
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
