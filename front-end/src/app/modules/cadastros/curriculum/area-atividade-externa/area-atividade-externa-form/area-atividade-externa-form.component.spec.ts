import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAtividadeExternaFormComponent } from './area-atividade-externa-form.component';

describe('AreaAtividadeExternaFormComponent', () => {
  let component: AreaAtividadeExternaFormComponent;
  let fixture: ComponentFixture<AreaAtividadeExternaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaAtividadeExternaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaAtividadeExternaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
