import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacoesTemplateComponent } from './notificacoes-template.component';

describe('TemplatesComponent', () => {
  let component: NotificacoesTemplateComponent;
  let fixture: ComponentFixture<NotificacoesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacoesTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacoesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
