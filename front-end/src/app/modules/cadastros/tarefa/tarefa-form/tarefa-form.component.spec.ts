import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaFormComponent } from './tarefa-form.component';

describe('TarefaFormComponent', () => {
  let component: TarefaFormComponent;
  let fixture: ComponentFixture<TarefaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarefaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
