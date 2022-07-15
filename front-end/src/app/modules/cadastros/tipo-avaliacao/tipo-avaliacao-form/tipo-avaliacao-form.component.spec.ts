import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAvaliacaoFormComponent } from './tipo-avaliacao-form.component';

describe('TipoAvaliacaoFormComponent', () => {
  let component: TipoAvaliacaoFormComponent;
  let fixture: ComponentFixture<TipoAvaliacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAvaliacaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAvaliacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
