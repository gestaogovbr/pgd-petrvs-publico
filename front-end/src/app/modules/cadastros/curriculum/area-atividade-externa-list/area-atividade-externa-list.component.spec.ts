import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAtividadeExternaListComponent } from './area-atividade-externa-list.component';

describe('AreaAtividadeExternaListComponent', () => {
  let component: AreaAtividadeExternaListComponent;
  let fixture: ComponentFixture<AreaAtividadeExternaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaAtividadeExternaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaAtividadeExternaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
