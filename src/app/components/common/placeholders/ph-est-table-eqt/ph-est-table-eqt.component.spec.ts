import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhEstTableEqtComponent } from './ph-est-table-eqt.component';

describe('PhEstTableEqtComponent', () => {
  let component: PhEstTableEqtComponent;
  let fixture: ComponentFixture<PhEstTableEqtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhEstTableEqtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhEstTableEqtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
