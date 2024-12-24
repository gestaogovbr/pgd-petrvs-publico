import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAuditComponent } from './panel-audit.component';

describe('PanelAuditComponent', () => {
  let component: PanelAuditComponent;
  let fixture: ComponentFixture<PanelAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelAuditComponent]
    });
    fixture = TestBed.createComponent(PanelAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
