import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelListLogsComponent } from './panel-list-logs.component';

describe('PanelListLogsComponent', () => {
  let component: PanelListLogsComponent;
  let fixture: ComponentFixture<PanelListLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelListLogsComponent]
    });
    fixture = TestBed.createComponent(PanelListLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
