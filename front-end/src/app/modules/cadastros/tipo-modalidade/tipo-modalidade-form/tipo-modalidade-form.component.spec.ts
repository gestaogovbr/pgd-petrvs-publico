import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoModalidadeFormComponent } from './tipo-modalidade-form.component';

describe('TipoModalidadeFormComponent', () => {
  let component: TipoModalidadeFormComponent;
  let fixture: ComponentFixture<TipoModalidadeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoModalidadeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoModalidadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
