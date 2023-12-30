import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaConhecimentoListComponent } from './area-conhecimento-list.component';

describe('AreaConhecimentoListComponent', () => {
  let component: AreaConhecimentoListComponent;
  let fixture: ComponentFixture<AreaConhecimentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaConhecimentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaConhecimentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
