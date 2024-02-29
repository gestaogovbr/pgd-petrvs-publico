import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesdobramentoComponent } from './desdobramento.component';

describe('DesdobramentoComponent', () => {
  let component: DesdobramentoComponent;
  let fixture: ComponentFixture<DesdobramentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesdobramentoComponent]
    });
    fixture = TestBed.createComponent(DesdobramentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
