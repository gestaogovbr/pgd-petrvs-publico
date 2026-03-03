import { TestBed } from '@angular/core/testing';
import { PanelGuard } from './panel.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PanelGuard', () => {
  let guard: PanelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [PanelGuard]
    });
    guard = TestBed.inject(PanelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
