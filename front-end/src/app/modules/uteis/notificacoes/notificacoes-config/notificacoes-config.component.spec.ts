import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacoesConfigComponent } from './notificacoes-config.component';

describe('TemplatesComponent', () => {
  let component: NotificacoesConfigComponent;
  let fixture: ComponentFixture<NotificacoesConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacoesConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacoesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
