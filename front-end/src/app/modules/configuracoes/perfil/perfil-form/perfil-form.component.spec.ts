import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFormComponent } from './perfil-form.component';

describe('PerfilFormComponent', () => {
  let component: PerfilFormComponent;
  let fixture: ComponentFixture<PerfilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
