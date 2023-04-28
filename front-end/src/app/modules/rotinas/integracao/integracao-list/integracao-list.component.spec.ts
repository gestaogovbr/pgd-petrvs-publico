import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracaoListComponent } from './integracao-list.component';

describe('IntegracaoListComponent', () => {
  let component: IntegracaoListComponent;
  let fixture: ComponentFixture<IntegracaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegracaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegracaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
