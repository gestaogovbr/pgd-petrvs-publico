import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaFormAvaliarComponent } from './demanda-form-avaliar.component';

describe('DemandaFormAvaliarComponent', () => {
  let component: DemandaFormAvaliarComponent;
  let fixture: ComponentFixture<DemandaFormAvaliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandaFormAvaliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaFormAvaliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
