import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialServicoFormComponent } from './material-servico-form.component';

describe('MaterialServicoFormComponent', () => {
  let component: MaterialServicoFormComponent;
  let fixture: ComponentFixture<MaterialServicoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialServicoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialServicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
