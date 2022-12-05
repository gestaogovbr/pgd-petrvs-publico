import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EixoTematicoListComponent } from './eixo-tematico-list.component';

describe('EixoTematicoListComponent', () => {
  let component: EixoTematicoListComponent;
  let fixture: ComponentFixture<EixoTematicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EixoTematicoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EixoTematicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
