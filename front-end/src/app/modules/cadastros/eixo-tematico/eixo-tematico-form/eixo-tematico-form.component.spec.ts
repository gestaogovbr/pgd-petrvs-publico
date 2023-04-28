import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixoTematicoFormComponent } from './eixo-tematico-form.component';

describe('EixoTematicoFormComponent', () => {
  let component: EixoTematicoFormComponent;
  let fixture: ComponentFixture<EixoTematicoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EixoTematicoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EixoTematicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
