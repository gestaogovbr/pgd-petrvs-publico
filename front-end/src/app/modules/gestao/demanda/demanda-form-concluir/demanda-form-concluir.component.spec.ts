import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaFormConcluirComponent } from './demanda-form-concluir.component';

describe('DemandaFormConcluirComponent', () => {
  let component: DemandaFormConcluirComponent;
  let fixture: ComponentFixture<DemandaFormConcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaFormConcluirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaFormConcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
