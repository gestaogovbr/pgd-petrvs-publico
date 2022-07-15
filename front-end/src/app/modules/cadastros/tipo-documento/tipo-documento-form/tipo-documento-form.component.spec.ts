import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocumentoFormComponent } from './tipo-documento-form.component';

describe('TipoDocumentoFormComponent', () => {
  let component: TipoDocumentoFormComponent;
  let fixture: ComponentFixture<TipoDocumentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoDocumentoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDocumentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
