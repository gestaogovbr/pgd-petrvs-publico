import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProcessoFormComponent } from './tipo-processo-form.component';

describe('TipoProcessoFormComponent', () => {
  let component: TipoProcessoFormComponent;
  let fixture: ComponentFixture<TipoProcessoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoProcessoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProcessoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
