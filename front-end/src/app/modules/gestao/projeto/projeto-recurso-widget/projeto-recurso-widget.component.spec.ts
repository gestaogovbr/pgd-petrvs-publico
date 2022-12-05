import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoRecursoWidgetComponent } from './projeto-recurso-widget.component';

describe('ProjetoRecursoWidgetComponent', () => {
  let component: ProjetoRecursoWidgetComponent;
  let fixture: ComponentFixture<ProjetoRecursoWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoRecursoWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoRecursoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
