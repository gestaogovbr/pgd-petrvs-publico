import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoFormEnvolvidosComponent } from './projeto-form-envolvidos.component';

describe('ProjetoFormEnvolvidosComponent', () => {
  let component: ProjetoFormEnvolvidosComponent;
  let fixture: ComponentFixture<ProjetoFormEnvolvidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoFormEnvolvidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoFormEnvolvidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
