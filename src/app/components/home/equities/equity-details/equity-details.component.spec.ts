import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityDetailsComponent } from './equity-details.component';

describe('EquityDetailsComponent', () => {
  let component: EquityDetailsComponent;
  let fixture: ComponentFixture<EquityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
