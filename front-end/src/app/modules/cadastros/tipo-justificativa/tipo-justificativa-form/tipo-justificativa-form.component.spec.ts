import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoJustificativaFormComponent } from './tipo-justificativa-form.component';

describe('TipoJustificativaFormComponent', () => {
  let component: TipoJustificativaFormComponent;
  let fixture: ComponentFixture<TipoJustificativaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoJustificativaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoJustificativaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
