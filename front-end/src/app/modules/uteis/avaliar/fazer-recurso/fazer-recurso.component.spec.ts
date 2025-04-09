import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerRecursoComponent } from './fazer-recurso.component';

describe('FazerRecursoComponent', () => {
  let component: FazerRecursoComponent;
  let fixture: ComponentFixture<FazerRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazerRecursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FazerRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
