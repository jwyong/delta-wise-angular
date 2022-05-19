import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquitiesComponent } from './equities.component';

describe('DashboardComponent', () => {
  let component: EquitiesComponent;
  let fixture: ComponentFixture<EquitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
