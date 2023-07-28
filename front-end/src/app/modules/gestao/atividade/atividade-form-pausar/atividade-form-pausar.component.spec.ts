import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeFormPausarComponent } from './atividade-form-pausar.component';

describe('AtividadeFormPausarComponent', () => {
  let component: AtividadeFormPausarComponent;
  let fixture: ComponentFixture<AtividadeFormPausarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeFormPausarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeFormPausarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
