import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliarNotaBadgeComponent } from './avaliar-nota-badge.component';

describe('AvaliarNotaBadgeComponent', () => {
  let component: AvaliarNotaBadgeComponent;
  let fixture: ComponentFixture<AvaliarNotaBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvaliarNotaBadgeComponent]
    });
    fixture = TestBed.createComponent(AvaliarNotaBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
