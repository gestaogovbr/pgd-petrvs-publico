import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialServicoListComponent } from './material-servico-list.component';

describe('MaterialServicoListComponent', () => {
  let component: MaterialServicoListComponent;
  let fixture: ComponentFixture<MaterialServicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialServicoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialServicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
