import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeFormAvaliarComponent } from './avaliar.component';

describe('AtividadeFormAvaliarComponent', () => {
  let component: AtividadeFormAvaliarComponent;
  let fixture: ComponentFixture<AtividadeFormAvaliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeFormAvaliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeFormAvaliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
