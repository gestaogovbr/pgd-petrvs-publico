import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaConhecimentoFormComponent } from './area-conhecimento-form.component';

describe('AreaConhecimentoFormComponent', () => {
  let component: AreaConhecimentoFormComponent;
  let fixture: ComponentFixture<AreaConhecimentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaConhecimentoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaConhecimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
