import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityDashboardComponent } from './commodity-dashboard.component';

describe('CommodityDashboardComponent', () => {
  let component: CommodityDashboardComponent;
  let fixture: ComponentFixture<CommodityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
