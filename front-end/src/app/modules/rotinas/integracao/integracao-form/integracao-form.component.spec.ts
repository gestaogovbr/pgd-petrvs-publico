import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracaoFormComponent } from './integracao-form.component';

describe('IntegracaoFormComponent', () => {
  let component: IntegracaoFormComponent;
  let fixture: ComponentFixture<IntegracaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegracaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegracaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
