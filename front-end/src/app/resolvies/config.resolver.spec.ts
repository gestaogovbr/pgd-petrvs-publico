import { TestBed } from '@angular/core/testing';

import { ConfigResolver } from './config.resolver';

describe('ModalResolver', () => {
  let resolver: ConfigResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ConfigResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
