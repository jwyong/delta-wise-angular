import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityDashboardComponent } from './equity-dashboard.component';

describe('EquityDashboardComponent', () => {
  let component: EquityDashboardComponent;
  let fixture: ComponentFixture<EquityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquityDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
