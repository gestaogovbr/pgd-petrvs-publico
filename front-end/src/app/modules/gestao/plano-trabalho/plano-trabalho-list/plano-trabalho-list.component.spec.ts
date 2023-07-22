import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTrabalhoListComponent } from './plano-trabalho-list.component';

describe('PlanoTrabalhoListComponent', () => {
  let component: PlanoTrabalhoListComponent;
  let fixture: ComponentFixture<PlanoTrabalhoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoTrabalhoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoTrabalhoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
