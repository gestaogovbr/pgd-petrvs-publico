import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosWidgetComponent } from './comentarios-widget.component';

describe('ComentariosWidgetComponent', () => {
  let component: ComentariosWidgetComponent;
  let fixture: ComponentFixture<ComentariosWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
